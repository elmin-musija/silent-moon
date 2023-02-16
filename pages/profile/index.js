import Title from "@/components/title/title";
import React from "react";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]";
import { UserService } from "@/src/services/use-cases/index";
import Link from "next/link";
import Image from "next/image";
import styles from "./profile.module.css";

const ProfilePage = ({ allYogaFavorites }) => {
	return (
		<div>
			<Title />
			<h2>Profile</h2>
			<div className={styles.yogaGallery}>
				{allYogaFavorites?.map((element) => (
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
