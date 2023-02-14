import Title from "@/components/title/title";
import React, { useEffect, useRef, useState } from "react";
import { uid } from "uid";
import Image from "next/image";
import Link from "next/link";
import { YogaService } from "@/src/services/use-cases/index";

const YogaPage = ({ yogaPrograms, yogaCategories }) => {
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
			if (categoryFilter !== "ALL") {
				return element.typeCategory
					.toLowerCase()
					.includes(categoryFilter.toLowerCase());
			} else {
				return yogaPrograms;
			}
		});
		setFilteredYogaPrograms(filteredYogaPrograms);
	}, [categoryFilter]);

	return (
		<div>
			<Title />
			<h2>Yoga</h2>
			<p>Find your innter zen from anywhere</p>

			{/** Categories*/}
			{yogaCategories.map((element) => (
				<button key={uid()} onClick={() => setCategoryFilter(element._id)}>
					{element._id}
				</button>
			))}

			{/** Search bar */}
			<form onChange={onInputSearchYogaHandler}>
				<input
					type="text"
					name="input-yoga-search"
					id="input-yoga-search"
					ref={inputFieldSearchRef}
					placeholder="Search for yoga session"
				/>
			</form>

			{/** Music player */}

			{/** Yoga */}
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
	);
};

export default YogaPage;

export async function getStaticProps() {
	const yogaPrograms = await YogaService.listAllYogaExercises();
	const yogaCategories = await YogaService.listAllYogaCategories();
	return { props: { yogaPrograms, yogaCategories }, revalidate: 60 * 60 * 24 };
}
