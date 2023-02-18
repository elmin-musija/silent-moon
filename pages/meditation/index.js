import Title from "@/components/title/title";
import React, { useEffect, useRef, useState } from "react";
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
	const inputFieldSearchRef = useRef(null);
	const [filteredMeditationCourses, setFilteredMeditationCoursesPrograms] =
		useState(allMeditationCourses);
	const [inputSearchString, setInputSearchString] = useState("");
	const [inputSearchUsed, setInputSearchUsed] = useState(false);
	const [categoryFilter, setCategoryFilter] = useState("");

	const onInputSearchMeditationHandler = (event) => {
		event.preventDefault();
		setInputSearchString(inputFieldSearchRef.current.value);
		if (inputSearchString.trim() === "") {
			setInputSearchUsed(false);
		}
	};

	useEffect(() => {
		setInputSearchUsed(true);
		const filteredMeditationCourses = allMeditationCourses.filter((element) =>
			element.title.toLowerCase().includes(inputSearchString.toLowerCase())
		);
		setFilteredMeditationCoursesPrograms(filteredMeditationCourses);
		if (inputSearchString.trim() === "") {
			setInputSearchUsed(false);
		}
	}, [inputSearchString]);

	useEffect(() => {
		const filteredMeditationCourses = allMeditationCourses.filter((element) => {
			if (categoryFilter !== "all") {
				return element.category
					.toLowerCase()
					.includes(categoryFilter.toLowerCase());
			} else {
				return allMeditationCourses;
			}
		});
		setFilteredMeditationCoursesPrograms(filteredMeditationCourses);
	}, [categoryFilter]);

	const displayMessageFavoriteMeditationCourses = () => {
		if (inputSearchUsed === true && filteredMeditationCourses.length === 0) {
			return <p>No search results found</p>;
		}
	};

	const focusHandler = () => {
		inputFieldSearchRef.current.focus();
	};

	return (
		<div className={styles.meditatePage}>
			<Title />
			<h2>Meditate</h2>
			<p>Video guided meditation techniques to help you practice on the go.</p>

			{/** Categories*/}
			<div className={styles.categorySlider}>
				{yogaCategories.map((element) => (
					<button key={uid()} onClick={() => setCategoryFilter(element._id)}>
						<Image
							src={`/img/${element._id.toLowerCase()}.svg`}
							width="65"
							height="65"
							alt={`${element._id} icon`}
						/>
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
			<div className={styles.gallery}>
				{filteredMeditationCourses?.map((element) => (
					<Link href={`meditation/${element._id}`}>
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

				{/** display message if there are no search results */}
				{displayMessageFavoriteMeditationCourses()}
			</div>
		</div>
	);
};

export default MeditationPage;

export async function getStaticProps() {
	const allMeditationCourses =
		await MeditationService.listAllMeditationCourses();
	const yogaCategories = await YogaService.listAllYogaCategories();
	return { props: { allMeditationCourses, yogaCategories } };
}
