import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]";
import styles from "./welcome.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { getFirstnameLastname } from "@/src/services/utils/name/name";

const WelcomePage = ({ name }) => {
	const router = useRouter();
	useEffect(() => {
		const timer = setTimeout(() => {
			router.push("/reminders");
		}, 9000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	const { firstname, lastname } = getFirstnameLastname(name);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.7 }}
				className={styles.welcome}
				id="top"
			>
				<p className={styles.hiName}>Hi {firstname}!</p>
				<p className={styles.welcome}>Welcome to</p>
				<p className={styles.silentMoon}>Silent Moon</p>
				<Image
					src={"/img/welcome.jpg"}
					width="414"
					height="810"
					alt="woman does yoga"
					priority
				/>
			</motion.div>
		</AnimatePresence>
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

	const { name } = session.user;

	return { props: { name } };
}
