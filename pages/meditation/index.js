import Title from "@/components/title/title";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useRouter } from "next/router";
import NotificationContext from "@/context/context";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { uid } from "uid";
import { MeditationService } from "@/src/services/use-cases/index";
import { YogaService } from "@/src/services/use-cases/index";
import MiniPlayer from "@/components/mini-player/miniPlayer";
import styles from "./meditation.module.css";

const MeditationPage = ({ allMeditationCourses, yogaCategories }) => {
	const { data: session, status } = useSession();
	const { getPhoneRotated, resetPhoneRotated } =
		useContext(NotificationContext);
	const inputFieldSearchRef = useRef(null);
	const [filteredMeditationCourses, setFilteredMeditationCourses] =
		useState(allMeditationCourses);
	const router = useRouter();

	// const [inputSearchUsed, setInputSearchUsed] = useState(false);
	const [favoriteMeditationCourses, setFavoriteMeditationCourses] = useState(
		[]
	);
	const [inputSearchString, setInputSearchString] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");

	if (getPhoneRotated()) {
		resetPhoneRotated();
	}

	const onInputSearchMeditationHandler = (event) => {
		event.preventDefault();
		setInputSearchString(inputFieldSearchRef.current.value.trim());
		setCategoryFilter("all");
	};

	useEffect(() => {
		const filteredMeditationCourses = allMeditationCourses.filter((element) =>
			element.title.toLowerCase().includes(inputSearchString.toLowerCase())
		);
		setFilteredMeditationCourses(filteredMeditationCourses);
	}, [inputSearchString]);

	useEffect(() => {
		if (categoryFilter === "favourites") {
			setFilteredMeditationCourses(favoriteMeditationCourses);
		} else if (categoryFilter !== "all") {
			const filteredMeditationCourses = allMeditationCourses.filter((element) =>
				element.category.toLowerCase().includes(categoryFilter.toLowerCase())
			);
			setFilteredMeditationCourses(filteredMeditationCourses);
		} else {
			setFilteredMeditationCourses(allMeditationCourses);
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
			fetch("/api/meditation/favorite/all/show", options)
				.then((response) => response.json())
				.then((favorites) => {
					console.log(favorites);
					if (favorites.status === "success" && favorites.data.favorites) {
						setFavoriteMeditationCourses(favorites.data.favorites);
					}
				});
		}
	}, [session]);

	const displayMessageSearchResults = () => {
		if (filteredMeditationCourses.length === 0) {
			if (categoryFilter === "favourites") {
				return (
					<p className={styles.noResultText}>
						You don't have any favourite meditation courses.
					</p>
				);
			} else {
				return <p className={styles.noResultText}>No search results found.</p>;
			}
		}
	};

	useEffect(() => {
		const handleRouteChange = () => {
			document.getElementById("top").scrollIntoView();
		};
		router.events.on("routeChangeComplete", handleRouteChange);
	}, []);

	return (
		<div className={styles.meditatePage} id="top">
			<Title />
			<h2>Meditate</h2>
			<p>
				Brilliant things happen in calm minds.
				<br /> Be calm. You're brilliant.
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
				<form onChange={onInputSearchMeditationHandler}>
					<input
						type="text"
						name="input-meditation-search"
						id="input-meditation-search"
						ref={inputFieldSearchRef}
						placeholder="Search for meditation course"
					/>
				</form>
				<div className={styles.searchIconContainer}>
					<Image src="/img/search.svg" width="15" height="15" alt="search" />
				</div>
			</div>

			{/** Music player */}
			{session && session.user.provider === "spotify" && <MiniPlayer />}

			{/** Meditation courses */}
			<div key={uid()} className={styles.gallery}>
				{filteredMeditationCourses?.map((element) => (
					<Link key={uid()} href={`meditation/${element._id}`}>
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
			{/** display message if there are no search results */}
			{displayMessageSearchResults()}
		</div>
	);
};

export default MeditationPage;

export async function getStaticProps() {
	const allMeditationCourses =
		await MeditationService.listAllMeditationCourses();
	const yogaCategories = await YogaService.listAllYogaCategories();
	return {
		props: { allMeditationCourses, yogaCategories },
		revalidate: 60 * 60 * 24,
	};
}
