import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./error.module.css";
import { AnimatePresence, motion } from "framer-motion";

export default function Custom404() {
	const router = useRouter();
	useEffect(() => {
		const timer = setTimeout(() => {
			router.push("/home");
		}, 6000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.7 }}
				className={styles.errorPage}
				id="top"
			>
				<main>
					<Image
						src={"/img/error-bg.jpg"}
						width="414"
						height="468"
						alt="man doing handstand in nature"
						priority
					/>
					<div className={styles.content}>
						<h1>silent moon</h1>
						<h2>Error 404</h2>
						<p>This page does not exist.</p>
						<p>Relax.</p>
						<p>You will be redirected to Home in a few seconds.</p>
					</div>
				</main>
			</motion.div>
		</AnimatePresence>
	);
}
