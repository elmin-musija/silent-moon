import LargeBtn from "@/components/largeBtn/largeBtn";
import React, { useState, useContext, useRef } from "react";
import Link from "next/link";
import Title from "@/components/title/title";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import NotificationContext from "@/context/context";

import styles from "./reminders.module.css";

const RemindersPage = () => {
	const { displayNotification } = useContext(NotificationContext);
	const router = useRouter();
	const weekdays = ["SU", "MO", "TU", "W", "TH", "F", "SA"];
	const [selectedWeekdays, setSelectedWeekdays] = useState([]);
	const inputHoursRef = useRef(null);
	const inputMinutesRef = useRef(null);

	const onWeekdayClickHandler = (weekday) => {
		const weekdayIsSelected = selectedWeekdays.filter(
			(element) => element === weekday
		);
		if (weekdayIsSelected.length === 0) {
			setSelectedWeekdays((prevState) => [...prevState, weekday]);
		} else {
			const selectedWeekdaysUpdate = selectedWeekdays.filter(
				(element) => element !== weekday
			);
			setSelectedWeekdays(selectedWeekdaysUpdate);
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.7 }}
				className={styles.reminders}
				id="top"
			>
				<header>
					<Title />
				</header>
				<main>
					<h2>What time would you like to meditate?</h2>
					<p className={styles.text}>
						You can meditate at any time, but we recommend to do in the morning.
					</p>
					<form className={styles.timeContainer}>
						<input
							type="number"
							name="input-time-hours"
							id="input-time-hours"
							placeholder="hh"
							ref={inputHoursRef}
							onChange={() => {
								if (
									Number(inputHoursRef.current.value > 23) ||
									inputHoursRef.current.value.length > 2
								) {
									inputHoursRef.current.value = "";
								}
							}}
							required
						/>
						<p className={styles.space}>:</p>
						<input
							type="number"
							name="input-time-minutes"
							id="input-time-minutes"
							ref={inputMinutesRef}
							placeholder="mm"
							onChange={() => {
								if (
									Number(inputMinutesRef.current.value) > 59 ||
									inputMinutesRef.current.value.length > 2
								) {
									inputMinutesRef.current.value = "";
								}
							}}
							required
						/>
					</form>

					<h2>On which days would you like to meditate?</h2>
					<p className={styles.text}>
						Everyday is best, but we recommend picking at least five days.
					</p>
					<div className={styles.dayContainer}>
						{weekdays.map((element, index) => (
							<div
								className={
									selectedWeekdays.indexOf(element) !== -1
										? `${styles.day} ${styles.daySelected}`
										: `${styles.day}`
								}
								key={index}
								onClick={() => {
									onWeekdayClickHandler(weekdays[index]);
								}}
							>
								{element}
							</div>
						))}
					</div>

					<div
						className={styles.btn}
						onClick={() => {
							if (
								Number(inputHoursRef.current.value) >= 0 &&
								Number(inputHoursRef.current.value) <= 23 &&
								Number(inputMinutesRef.current.value) >= 0 &&
								Number(inputMinutesRef.current.value) <= 59 &&
								inputHoursRef.current.value.length !== 0 &&
								inputMinutesRef.current.value.length !== 0 &&
								selectedWeekdays.length !== 0
							) {
								displayNotification({
									type: "success",
									message: "Reminder successfully set",
								});
								const timer = setTimeout(() => {
									router.push("/home");
								}, 3000);
								return () => {
									clearInterval(timer);
								};
							} else {
								displayNotification({
									type: "warning",
									message: "Please select time and days",
								});
							}
						}}
					>
						<p>save</p>
					</div>
					<Link href="/home" className={styles.noThanks}>
						NO THANKS
					</Link>
				</main>
			</motion.div>
		</AnimatePresence>
	);
};

export default RemindersPage;
