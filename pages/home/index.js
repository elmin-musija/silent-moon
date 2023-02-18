import Title from "@/components/title/title";
import React from "react";
import styles from "./home.module.css";

const HomePage = () => {
	return (
		<div className={styles.homePage}>
			<header>
				<Title />
			</header>
			<main></main>
		</div>
	);
};

export default HomePage;
