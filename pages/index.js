import React, { useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import LargeBtn from "@/components/largeBtn/largeBtn";
import NotificationContext from "@/context/context";

export default function Home() {
	const { resetPhoneRotated } = useContext(NotificationContext);
	useEffect(() => {
		resetPhoneRotated();
	}, []);

	return (
		<div className={styles.splashscreenPage} id="top">
			<main>
				<Image
					src={"/img/login.png"}
					width="414"
					height="468"
					alt="man doing handstand in nature"
					priority
				/>
				<h1>silent moon</h1>
				<div className={styles.content}>
					<div className={styles.introTextBox}>
						<h2>We are what we do</h2>
						<p>
							Thousand of people are using silent moon for meditation and yoga
							classes.
						</p>
					</div>
					<LargeBtn url="/signup">Sign Up</LargeBtn>
					<p className={styles.logInText}>
						Already have an account? <Link href="/signin">Log in</Link>
					</p>
				</div>
			</main>
		</div>
	);
}
