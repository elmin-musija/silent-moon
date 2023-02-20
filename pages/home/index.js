import Title from "@/components/title/title";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { uid } from "uid";
import { YogaService } from "@/src/services/use-cases/index";
import { MeditationService } from "@/src/services/use-cases/index";
import { useSession } from "next-auth/react";
import { getFirstnameLastname } from "@/src/services/utils/name/name";
import { convertDurationTimeFormat } from "@/src/services/utils/convert/convert";
import { getRandomItemFromArray } from "@/src/services/utils/random/random";
import styles from "./home.module.css";

const HomePage = ({ allYogaPrograms, allMeditationCourses }) => {
	let userFirstname = " ";

	const { data: session, status } = useSession();
	const inputFieldSearchRef = useRef(null);

	const [filteredYogaPrograms, setFilteredYogaPrograms] =
		useState(allYogaPrograms);
	const [filteredMeditationCourses, setFilteredMeditationCourses] =
		useState(allMeditationCourses);
	const [inputSearchString, setInputSearchString] = useState("");
	const [inputSearchUsed, setInputSearchUsed] = useState(false);

	const [randomYoga, setRandomYoga] = useState();
	const [randomMeditationCourse, setRandomMeditationCourse] = useState();

	const onInputSearchYogaHandler = (event) => {
		event.preventDefault();
		setInputSearchString(inputFieldSearchRef.current.value.trim());
		if (inputSearchString === "") {
			setInputSearchUsed(false);
		}
	};

	useEffect(() => {
		setInputSearchUsed(true);
		const filteredYogaPrograms = allYogaPrograms.filter((element) =>
			element.title.toLowerCase().includes(inputSearchString.toLowerCase())
		);
		setFilteredYogaPrograms(filteredYogaPrograms);
		const filteredMeditationCourses = allMeditationCourses.filter((element) =>
			element.title.toLowerCase().includes(inputSearchString.toLowerCase())
		);
		setFilteredMeditationCourses(filteredMeditationCourses);
		if (inputSearchString === "") {
			setInputSearchUsed(false);
		}
	}, [inputSearchString]);

	const displayMessageFavoriteYoga = () => {
		if (inputSearchUsed === true && filteredYogaPrograms.length === 0) {
			return (
				<p className={styles.noResultText}>
					No search result in yoga sessions found.
				</p>
			);
		}
	};

	const displayMessageFavoriteMeditationCourses = () => {
		if (inputSearchUsed === true && filteredMeditationCourses.length === 0) {
			return (
				<p className={styles.noResultText}>
					No search result in meditations courses found.
				</p>
			);
		}
	};

	const focusHandler = () => {
		inputFieldSearchRef.current.focus();
	};

	useEffect(() => {
		setRandomYoga(getRandomItemFromArray(allYogaPrograms));
		setRandomMeditationCourse(getRandomItemFromArray(allMeditationCourses));
	}, []);

	if (session) {
		const { firstname, lastname } = getFirstnameLastname(session.user.name);
		userFirstname = firstname;
	}

	return (
		<div className={styles.homePage}>
			<header>
				<Title />
			</header>
			<main className={styles.homePage}>
				{userFirstname && <h2>Good afternoon {userFirstname}</h2>}
				<p className={styles.subheading}>We hope you have a good day</p>

				{/** random yoga and meditation */}
				<h2>Get inspired</h2>
				<div className={styles.randomsContainer}>
					{randomYoga && (
						<div>
							<Link
								key={uid()}
								href={`/yoga/${randomYoga._id}`}
								prefetch={false}
							>
								<div className={styles.imgageContainer} key={uid()}>
									<Image
										src={randomYoga.imageUrl}
										width={174.5}
										height={174.5}
										alt={randomYoga.title}
										key={randomYoga._id}
										priority
									></Image>
								</div>
								<div key={uid()} className={styles.itemInfo}>
									<h3>{randomYoga.title}</h3>
									<div className={styles.itemSubInfo}>
										<p key={uid()}>{randomYoga.level}</p>
										<p key={uid()}>
											{convertDurationTimeFormat(
												(Number(randomYoga.duration.minutes) * 60 +
													Number(randomYoga.duration.seconds)) *
													1000
											)}
										</p>
									</div>
								</div>
							</Link>
						</div>
					)}
					{randomMeditationCourse && (
						<div>
							<Link
								key={uid()}
								href={`/meditation/${randomMeditationCourse._id}`}
								prefetch={false}
							>
								<div className={styles.imgageContainer} key={uid()}>
									<Image
										src={randomMeditationCourse.imageUrl}
										width={174.5}
										height={174.5}
										alt={randomMeditationCourse.title}
										key={randomMeditationCourse._id}
										priority
									></Image>
								</div>
								<div key={uid()} className={styles.itemInfo}>
									<h3>{randomMeditationCourse.title}</h3>
									<div className={styles.itemSubInfo}>
										<p key={uid()}>{randomMeditationCourse.category}</p>
									</div>
								</div>
							</Link>
						</div>
					)}
				</div>

				{/** search bar */}
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

				{/** all yoga categories */}
				<h2>Yoga sessions for you</h2>
				<div className={styles.slider}>
					{filteredYogaPrograms?.map((element) => (
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
				<h2>Meditation courses for you</h2>
				<div className={styles.slider}>
					{filteredMeditationCourses?.map((element) => (
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
		</div>
	);
};

export default HomePage;

export async function getStaticProps() {
	const allYogaPrograms = await YogaService.listAllYogaExercises();
	const allMeditationCourses =
		await MeditationService.listAllMeditationCourses();
	return {
		props: { allYogaPrograms, allMeditationCourses },
		revalidate: 60 * 60 * 24,
	};
}
