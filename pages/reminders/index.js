import LargeBtn from "@/components/largeBtn/largeBtn";
import React from "react";
import Link from "next/link";
import Title from "@/components/title/title";
import styles from "./reminders.module.css";

const RemindersPage = () => {
	return (
		<div className={styles.reminders}>
			<Title />
			<h2>What time would you like to meditate?</h2>
			<p>
				You can meditate at any time, but we recommend to do in the morning.
			</p>
			<div className={styles.timeContainer}></div>
			<h2>On which days would you like to meditate?</h2>
			<p>Everyday is best, but we recommend picking at least five days.</p>
			<div className={styles.dayContainer}>
				<div className={styles.day}>SU</div>
				<div className={styles.day}>M</div>
				<div className={styles.day}>TU</div>
				<div className={styles.day}>W</div>
				<div className={styles.day}>TH</div>
				<div className={styles.day}>F</div>
				<div className={styles.day}>SA</div>
			</div>
			<LargeBtn url="/home">SAVE</LargeBtn>
			<Link href="/home" className={styles.noThanks}>
				NO THANKS
			</Link>
		</div>
	);
};

export default RemindersPage;
