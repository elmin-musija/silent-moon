import React from "react";
import Link from "next/link";
import CircularSection from "@/components/circular-section/circular-section";
import Image from "next/image";
import styles from "./signup.module.css";

const SignupPage = () => {
	const onSubmitHandler = (event) => {
		event.preventDefault();
	};

	return (
		<div className={styles.signupPage}>
			<CircularSection />
			<Link href="/" className={styles.backBtn}>
				<Image
					src="/img/arrow-back.svg"
					width="18"
					height="18"
					alt="back"
				></Image>
			</Link>
			<div className={styles.content}>
				<h1 className={styles.header}>Create your account</h1>
				<form className={styles.form} onSubmit={onSubmitHandler}>
					<input
						className={styles.input}
						type="text"
						name="input-firstname"
						id="input-firstname"
						placeholder="FIRSTNAME"
						required
					/>
					<input
						className={styles.input}
						type="text"
						name="input-lastname"
						id="input-lastname"
						placeholder="LASTNAME"
						required
					/>
					<input
						className={styles.input}
						type="email"
						name="input-email"
						id="input-email"
						placeholder="EMAIL"
						required
					/>
					<input
						className={styles.input}
						type="password"
						name="input-password"
						id="input-password"
						placeholder="PASSWORD"
						required
					/>
					<input className={styles.submit} type="submit" value="REGISTER" />
				</form>
			</div>
		</div>
	);
};

export default SignupPage;
