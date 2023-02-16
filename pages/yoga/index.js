import Title from "@/components/title/title";
import React, { useEffect, useRef, useState } from "react";
import { uid } from "uid";
import Image from "next/image";
import Link from "next/link";
import { YogaService } from "@/src/services/use-cases/index";
import MiniPlayer from "@/components/mini-player/miniPlayer";
import styles from "./yoga.module.css";
import { useSession } from "next-auth/react";

const YogaPage = ({ yogaPrograms, yogaCategories }) => {
	const { data: session, status } = useSession();

	const inputFieldSearchRef = useRef(null);
	const [filteredYogaPrograms, setFilteredYogaPrograms] =
		useState(yogaPrograms);
	const [inputSearchString, setInputSearchString] = useState("");

	const [categoryFilter, setCategoryFilter] = useState("");

	const onInputSearchYogaHandler = (event) => {
		event.preventDefault();
		setInputSearchString(inputFieldSearchRef.current.value);
	};

	useEffect(() => {
		const filteredYogaPrograms = yogaPrograms.filter((element) =>
			element.title.toLowerCase().includes(inputSearchString.toLowerCase())
		);
		setFilteredYogaPrograms(filteredYogaPrograms);
	}, [inputSearchString]);

	useEffect(() => {
		const filteredYogaPrograms = yogaPrograms.filter((element) => {
			if (categoryFilter !== "all") {
				return element.category
					.toLowerCase()
					.includes(categoryFilter.toLowerCase());
			} else {
				return yogaPrograms;
			}
		});
		setFilteredYogaPrograms(filteredYogaPrograms);
	}, [categoryFilter]);

	return (
		<div className={styles.yogaPage}>
			<Title />
			<h2>Yoga</h2>
			<p>Find your innter zen from anywhere</p>

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
			<div className={styles.searchbar}>
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
		</div>
	);
};

export default YogaPage;

export async function getStaticProps() {
	const yogaPrograms = await YogaService.listAllYogaExercises();
	const yogaCategories = await YogaService.listAllYogaCategories();
	return { props: { yogaPrograms, yogaCategories }, revalidate: 60 * 60 * 24 };
}
