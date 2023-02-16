import Title from "@/components/title/title";
import React from "react";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]";
import { UserService } from "@/src/services/use-cases/index";
import { uid } from "uid";
import Link from "next/link";
import Image from "next/image";
import styles from "./profile.module.css";

const ProfilePage = ({ allYogaFavorites }) => {
	return (
		<div className={styles.profilePage}>
			<Title />
			<h2>Favourite Yoga Session</h2>
			<div className={styles.slider}>
				{allYogaFavorites?.map((element) => (
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
