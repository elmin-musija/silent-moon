import React from "react";
import Image from "next/image";
import LargeBtn from "@/components/largeBtn/largeBtn";
import styles from "./welcome.module.css";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]";

const WelcomePage = (props) => {
	return (
		<div className={styles.welcome}>
			<h1>Silent Moon</h1>
			<h2>Hi Leon, welcome to Silent Moon</h2>
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

	return { props: { session: session } };
}
