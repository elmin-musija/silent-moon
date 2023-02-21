import React from "react";
import Link from "next/link";
import Image from "next/image";
import { uid } from "uid";
import styles from "./miniPlayer.module.css";

const MiniPlayer = () => {
	const date = new Date();
	const monthNames = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC",
	];

	const day = date.getDate();
	const month = monthNames[date.getMonth()];

	return (
		<div className={styles.miniPlayer}>
			<div key={uid()}>
				<p key={uid()} className={styles.title}>
					Daily Calm
				</p>
				<p key={uid()} className={styles.subtitle}>
					{month} {day} &#8226; PAUSE PRACTISE
				</p>
			</div>
			<Link
				key={uid()}
				href="/music-player/q?type=playlist&offset=0&id=3pDOlfaY0lXRAW0iwNl7c7"
				className={styles.playBtnContainer}
			>
				<Image
					src="./img/mini-player-play-triangle.svg"
					alt="play"
					width="12"
					height="12"
				/>
			</Link>
		</div>
	);
};

export default MiniPlayer;
