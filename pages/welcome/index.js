import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]";
import Title from "@/components/title/title";
import styles from "./welcome.module.css";

const WelcomePage = ({ name, image, email }) => {
	const firstName = name.split(" ")[0];
	return (
		<Link href="/reminders">
			<div className={styles.welcome}>
				<Title />
				<h2>Welcome {firstName}, namastè.</h2>
				<Image
					src={"/img/welcome.jpg"}
					width="414"
					height="810"
					alt="woman does yoga"
				/>
				<p className={styles.continue}>Tap to continue</p>
			</div>
		</Link>
	);
};

export default WelcomePage;

export async function getServerSideProps(context) {
	const session = await getServerSession(
		context.req,
		context.res,
		NextAuthOptions
	);

	if (!session) {
		return { redirect: { destination: "/", permanent: false } };
	}

	const { name, image = "", email } = session.user;

	return { props: { name, image, email } };
}
