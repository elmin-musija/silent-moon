import React, { useEffect, useRef, useState } from "react";
import Title from "@/components/title/title";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]";
import { UserService } from "@/src/services/use-cases/index";
import { uid } from "uid";
import Link from "next/link";
import Image from "next/image";
import styles from "./profile.module.css";

const ProfilePage = ({ allYogaFavorites }) => {
	const inputFieldSearchRef = useRef(null);
	const [filteredYogaFavorites, setFilteredYogaFavorites] =
		useState(allYogaFavorites);
	const [inputSearchString, setInputSearchString] = useState("");
	const [inputSearchUsed, setInputSearchUsed] = useState(false);

	const onInputSearchYogaHandler = (event) => {
		event.preventDefault();
		setInputSearchString(inputFieldSearchRef.current.value);
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
		if (inputSearchString.trim() === "") {
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
							here.
						</Link>{" "}
					</p>
				</div>
			);
		} else {
			if (inputSearchUsed === true && filteredYogaFavorites.length === 0) {
				return <p>No search results found {inputSearchUsed}</p>;
			}
		}
	};

	return (
		<div className={styles.profilePage}>
			<Title />

			{/** Search bar */}
			<div className={styles.searchbar}>
				<form onChange={onInputSearchYogaHandler}>
					<input
						type="text"
						name="input-yoga-search"
						id="input-yoga-search"
						ref={inputFieldSearchRef}
						placeholder="Search for your favorites sessions or meditations"
					/>
				</form>
				<div className={styles.searchIconContainer}>
					<Image src="/img/search.svg" width="15" height="15" alt="search" />
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
								width={150}
								height={150}
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
									{element.duration.minutes}:{element.duration.seconds} min
								</p>
							</div>
						</div>
					</Link>
				))}
				{displayMessageFavoriteYoga()}
			</div>
			<h2>Favourite Meditations</h2>
			{/* <div className={styles.slider}>
				{allMeditationFavorites?.map((element) => (
					<Link
						key={element._id}
						href={`/yoga/${element._id}`}
						className={styles.sliderItem}
					>
						<div className={styles.imgageContainer} key={uid()}>
							<Image
								src={element.imageUrl}
								width={150}
								height={150}
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
									{element.duration.minutes}:{element.duration.seconds} min
								</p>
							</div>
						</div>
					</Link>
				))}
			</div> */}
		</div>
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

	const allYogaFavorites = await UserService.listAllFavoriteYogaExercises({
		email: session.user.email,
	});

	return { props: { allYogaFavorites } };
}
