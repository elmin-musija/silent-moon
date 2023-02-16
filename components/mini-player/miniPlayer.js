import React from "react";
import Link from "next/link";
import Image from "next/image";
import { uid } from "uid";
import styles from "./miniPlayer.module.css";

const MiniPlayer = () => {
	return (
		<div className={styles.miniPlayer}>
			<div key={uid()}>
				<p key={uid()} className={styles.title}>
					Daily Calm
				</p>
				<p key={uid()} className={styles.subtitle}>
					APR 30 &#8226; PAUSE PRACTISE
				</p>
			</div>
			<Link
				key={uid()}
				href="/player/q?type=playlist&offset=0&id=3pDOlfaY0lXRAW0iwNl7c7"
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
