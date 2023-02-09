import React from "react";
import Link from "next/link";
import BackArrow from "@/components/backArrow/backArrow";
import styles from "./signin.module.css";
import CircularSection from "@/components/circular-section/circular-section";

const SigninPage = () => {
	const onSubmitHandler = (event) => {
		event.preventDefault();
		/**
		 * signin with nextauth
		 */
	};

	return (
		<div className={styles.signinPage}>
			<CircularSection />

			<Link href="/" className={styles.backBtn}>
				<BackArrow />
			</Link>
			<div className={styles.content}>
				<h1 className={styles.header}>Welcome Back!</h1>
				<form className={styles.form} onSubmit={onSubmitHandler}>
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
					<input className={styles.submit} type="submit" value="LOGIN" />
				</form>
				<p className={styles.info}>
					Don't have an account yet?{" "}
					<Link className={styles.link} href="/signup">
						sign up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SigninPage;
