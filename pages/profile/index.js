import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]";
import { signOut } from "next-auth/react";
import { UserService } from "@/src/services/use-cases/index";
import { uid } from "uid";
import Link from "next/link";
import Image from "next/image";
import Title from "@/components/title/title";
import { convertDurationTimeFormat } from "@/src/services/utils/convert/convert";
import { getFirstnameLastname } from "@/src/services/utils/name/name";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./profile.module.css";

const ProfilePage = ({ allYogaFavorites, allMeditationsCourseFavorites }) => {
	const { data: session } = useSession();
	const router = useRouter();
	let userFirstname = "";
	let userLastname = " ";

	const onLogoutHandler = async () => {
		const redirect = await signOut({ redirect: false, callbackUrl: "/signin" });
		router.push(redirect.url);
	};

	let image = "/img/user.svg";

	if (session) {
		const { user } = session;
		const { firstname, lastname } = getFirstnameLastname(session.user.name);
		userFirstname = firstname;
		userLastname = lastname;

		if (user.picture) {
			image = user.picture;
		}
	}

	const inputFieldSearchRef = useRef(null);
	const [filteredYogaFavorites, setFilteredYogaFavorites] =
		useState(allYogaFavorites);
	const [filteredMeditationFavorites, setFilteredMeditationFavorites] =
		useState(allMeditationsCourseFavorites);
	const [inputSearchString, setInputSearchString] = useState("");
	const [inputSearchUsed, setInputSearchUsed] = useState(false);

	const onInputSearchYogaHandler = (event) => {
		event.preventDefault();
		setInputSearchString(inputFieldSearchRef.current.value.trim());
		if (inputSearchString === "") {
			setInputSearchUsed(false);
		}
	};

	useEffect(() => {
		setInputSearchUsed(true);
		const filteredYogaFavorites = allYogaFavorites.filter((element) =>
			element.title.toLowerCase().includes(inputSearchString.toLowerCase())
		);
		setFilteredYogaFavorites(filteredYogaFavorites);
		const filteredMeditationFavorites = allMeditationsCourseFavorites.filter(
			(element) =>
				element.title.toLowerCase().includes(inputSearchString.toLowerCase())
		);
		setFilteredMeditationFavorites(filteredMeditationFavorites);
		if (inputSearchString === "") {
			setInputSearchUsed(false);
		}
	}, [inputSearchString]);

	const displayMessageFavoriteYoga = () => {
		if (allYogaFavorites.length === 0) {
			return (
				<div>
					<p>You don't have any favorite yoga sessions yet.</p>
					<p>
						Find your next favorite yoga session{" "}
						<Link className={styles.linkYogaPage} href={"/yoga"}>
							here
						</Link>
						.
					</p>
				</div>
			);
		} else {
			if (inputSearchUsed === true && filteredYogaFavorites.length === 0) {
				return (
					<p className={styles.noResultText}>
						No search result in favorite yoga sessions found.
					</p>
				);
			}
		}
	};
	const displayMessageFavoriteMeditationCourses = () => {
		if (allMeditationsCourseFavorites.length === 0) {
			return (
				<div>
					<p>You don't have any favorite meditation courses yet.</p>
					<p>
						Find your next favorite meditation course{" "}
						<Link className={styles.linkYogaPage} href={"/meditation"}>
							here
						</Link>
						.
					</p>
				</div>
			);
		} else {
			if (
				inputSearchUsed === true &&
				filteredMeditationFavorites.length === 0
			) {
				return (
					<p className={styles.noResultText}>
						No search result in favourite meditation courses found.
					</p>
				);
			}
		}
	};

	useEffect(() => {
		const handleRouteChange = () => {
			document.getElementById("top").scrollIntoView();
		};
		router.events.on("routeChangeComplete", handleRouteChange);
	}, []);

	const focusHandler = () => {
		inputFieldSearchRef.current.focus();
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.7 }}
				className={styles.profilePage}
				id="top"
			>
				<header>
					<Title />
				</header>

				<main>
					{/** Profile image, name and logout */}
					<div className={styles.profileInfoContainer}>
						<div className={styles.profilePictureContainer}>
							<Image src={image} width="80" height="80" alt="profile picture" />
						</div>
						<div>
							<p>{userFirstname}</p>
							<button onClick={onLogoutHandler}>Logout</button>
						</div>
					</div>

					{/** Search bar */}
					<div className={styles.searchbar} onClick={focusHandler}>
						<form
							onChange={onInputSearchYogaHandler}
							onSubmit={(event) => event.preventDefault()}
						>
							<input
								type="text"
								name="input-yoga-search"
								id="input-yoga-search"
								ref={inputFieldSearchRef}
								placeholder="Find your favourite sessions"
							/>
						</form>
						<div className={styles.searchIconContainer}>
							<Image
								src="/img/search.svg"
								width="15"
								height="15"
								alt="search"
							/>
						</div>
					</div>

					<h2>Favourite Yoga Session</h2>
					<div className={styles.slider}>
						{filteredYogaFavorites?.map((element) => (
							<Link
								key={element._id}
								href={`/yoga/${element._id}`}
								className={styles.sliderItem}
							>
								<div className={styles.imgageContainer} key={uid()}>
									<Image
										src={element.imageUrl}
										width={155}
										height={155}
										alt={element.title}
										key={element._id}
										priority
									></Image>
								</div>
								<div key={uid()} className={styles.itemInfo}>
									<h3>{element.title}</h3>
									<div className={styles.itemSubInfo}>
										<p key={uid()}>{element.level}</p>
										<p key={uid()}>
											{convertDurationTimeFormat(
												(Number(element.duration.minutes) * 60 +
													Number(element.duration.seconds)) *
													1000
											)}
										</p>
									</div>
								</div>
							</Link>
						))}
						{displayMessageFavoriteYoga()}
					</div>

					<h2>Favourite Meditations</h2>
					<div className={styles.slider}>
						{filteredMeditationFavorites?.map((element) => (
							<Link
								key={element._id}
								href={`/meditation/${element._id}`}
								className={styles.sliderItem}
							>
								<div className={styles.imgageContainer} key={uid()}>
									<Image
										src={element.imageUrl}
										width={155}
										height={155}
										alt={element.title}
										key={element._id}
										priority
									></Image>
								</div>
								<div key={uid()} className={styles.itemInfo}>
									<h3>{element.title}</h3>
									<div className={styles.itemSubInfo}>
										<p key={uid()}>{element.category}</p>
									</div>
								</div>
							</Link>
						))}
						{displayMessageFavoriteMeditationCourses()}
					</div>
				</main>
			</motion.div>
		</AnimatePresence>
	);
};

export default ProfilePage;

export async function getServerSideProps(context) {
	const session = await getServerSession(
		context.req,
		context.res,
		NextAuthOptions
	);

	if (!session) {
		return { redirect: { destination: "/", permanent: false } };
	}

	const allYogaFavorites = await UserService.listAllYogaFavoriteExercises({
		email: session.user.email,
	});

	const allMeditationsCourseFavorites =
		await UserService.listAllMeditationCourseFavorites({
			email: session.user.email,
		});

	return { props: { allYogaFavorites, allMeditationsCourseFavorites } };
}
