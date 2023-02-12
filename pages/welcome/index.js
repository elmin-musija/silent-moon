import React from "react";
import Image from "next/image";
import LargeBtn from "@/components/largeBtn/largeBtn";
import styles from "./welcome.module.css";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]";
import Title from "@/components/title/title";

const WelcomePage = ({ name, image, email }) => {
	const firstName = name.split(" ")[0];
	return (
		<div className={styles.welcome}>
			<Title />
			<h2>Hi {firstName}, welcome to Silent Moon</h2>
			<Image
				src={"/img/welcome.png"}
				width="415"
				height="699"
				alt="woman does yoga"
			/>
			<div>
				<LargeBtn url="/reminders">Get Started</LargeBtn>
			</div>
		</div>
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
