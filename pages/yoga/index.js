import Title from "@/components/title/title";
import React, { useEffect, useRef, useState, useContext } from "react";
import NotificationContext from "@/context/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { uid } from "uid";
import { YogaService } from "@/src/services/use-cases/index";
import MiniPlayer from "@/components/mini-player/miniPlayer";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./yoga.module.css";

const YogaPage = ({ yogaPrograms, yogaCategories }) => {
	const { data: session, status } = useSession();
	const { getPhoneRotated, resetPhoneRotated } =
		useContext(NotificationContext);
	const inputFieldSearchRef = useRef(null);
	const [filteredYogaPrograms, setFilteredYogaPrograms] =
		useState(yogaPrograms);
	const [favoriteYogaPrograms, setFavoriteYogaPrograms] = useState([]);
	const [inputSearchString, setInputSearchString] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const router = useRouter();

	if (getPhoneRotated()) {
		resetPhoneRotated();
	}

	const onInputSearchYogaHandler = (event) => {
		event.preventDefault();
		setInputSearchString(inputFieldSearchRef.current.value.trim());
		setCategoryFilter("all");
	};

	useEffect(() => {
		const filteredYogaPrograms = yogaPrograms.filter((element) =>
			element.title.toLowerCase().includes(inputSearchString.toLowerCase())
		);
		setFilteredYogaPrograms(filteredYogaPrograms);
	}, [inputSearchString]);

	useEffect(() => {
		if (categoryFilter === "favourites") {
			setFilteredYogaPrograms(favoriteYogaPrograms);
		} else if (categoryFilter !== "all") {
			const filteredYogaPrograms = yogaPrograms.filter((element) =>
				element.category.toLowerCase().includes(categoryFilter.toLowerCase())
			);
			setFilteredYogaPrograms(filteredYogaPrograms);
		} else {
			setFilteredYogaPrograms(yogaPrograms);
		}
	}, [categoryFilter]);

	const focusHandler = () => {
		inputFieldSearchRef.current.focus();
	};

	const onCategoryButtonClickHandler = async (buttonId) => {
		inputFieldSearchRef.current.value = "";
		setCategoryFilter(buttonId);
	};

	useEffect(() => {
		if (session) {
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: session.user.email,
				}),
			};
			fetch("/api/yoga/favorite/all/show", options)
				.then((response) => response.json())
				.then((favorites) => {
					if (favorites.status === "success" && favorites.data.favorites) {
						setFavoriteYogaPrograms(favorites.data.favorites);
					}
				});
		}
	}, [session]);

	useEffect(() => {
		const handleRouteChange = () => {
			document.getElementById("top").scrollIntoView();
		};
		router.events.on("routeChangeComplete", handleRouteChange);
	}, []);

	const displayMessageSearchResults = () => {
		if (filteredYogaPrograms.length === 0) {
			if (categoryFilter === "favourites") {
				return (
					<p className={styles.noResultText}>
						You don't have any favourite yoga sessions.
					</p>
				);
			} else {
				return <p className={styles.noResultText}>No search results found.</p>;
			}
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.7 }}
				className={styles.yogaPage}
				id="top"
			>
				<Title />
				<h2>Yoga</h2>
				<p>
					Yoga takes you into the present moment.
					<br /> The only place where life exists.
				</p>

				{/** Categories*/}
				<div className={styles.categorySlider}>
					{yogaCategories?.map((element) => (
						<button
							key={uid()}
							onClick={() => onCategoryButtonClickHandler(element._id)}
						>
							{element._id.toLowerCase() === categoryFilter && (
								<div className={`${styles.categoryContainerActive}`}>
									<Image
										className={styles.categoryButton}
										src={`/img/${element._id.toLowerCase()}.svg`}
										width="65"
										height="65"
										alt={`${element._id} icon`}
									/>
								</div>
							)}
							{element._id.toLowerCase() !== categoryFilter && (
								<div className={`${styles.categoryContainer}`}>
									<Image
										className={styles.categoryButton}
										src={`/img/${element._id.toLowerCase()}.svg`}
										width="65"
										height="65"
										alt={`${element._id} icon`}
									/>
								</div>
							)}
							<p className={styles.categoryName}>{element._id}</p>
						</button>
					))}
				</div>

				{/** Search bar */}
				<div className={styles.searchbar} onClick={focusHandler}>
					<form onChange={onInputSearchYogaHandler}>
						<input
							type="text"
							name="input-yoga-search"
							id="input-yoga-search"
							ref={inputFieldSearchRef}
							placeholder="Search for yoga session"
						/>
					</form>
					<div className={styles.searchIconContainer}>
						<Image src="/img/search.svg" width="15" height="15" alt="search" />
					</div>
				</div>

				{/** Music player */}
				{session && session.user.provider === "spotify" && <MiniPlayer />}

				{/** Yoga */}
				<div className={styles.gallery}>
					{filteredYogaPrograms?.map((element) => (
						<Link key={element._id} href={`/yoga/${element._id}`}>
							<Image
								src={element.imageUrl}
								width={200}
								height={200}
								alt={element.title}
								key={element._id}
								priority
							></Image>
							<h3>{element.title}</h3>
						</Link>
					))}
				</div>
				{displayMessageSearchResults()}
			</motion.div>
		</AnimatePresence>
	);
};

export default YogaPage;

export async function getStaticProps() {
	const yogaPrograms = await YogaService.listAllYogaExercises();
	const yogaCategories = await YogaService.listAllYogaCategories();
	return { props: { yogaPrograms, yogaCategories }, revalidate: 60 * 60 * 24 };
}
