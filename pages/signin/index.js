import React from "react";
import Link from "next/link";
import BackArrow from "@/components/backArrow/backArrow";
import styles from "./signin.module.css";
import CircularSection from "@/components/circular-section/circular-section";
import { signIn } from "next-auth/react";

const SigninPage = () => {
	const onSubmitHandler = (event) => {
		event.preventDefault();
		/**
		 * signin with nextauth
		 */
	};

	const googleSigninHandler = async () => {
		await signIn("google", { callbackUrl: "/welcome" });
	};

	const spotifySigninHandler = async () => {
		await signIn("spotify", { callbackUrl: "/welcome" });
	};

	const githubSigninHandler = async () => {
		await signIn("github", { callbackUrl: "/welcome" });
	};

	const discordSigninHandler = async () => {
		await signIn("discord", { callbackUrl: "/welcome" });
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
				<button onClick={googleSigninHandler}>Sign in with Google</button>
				<button onClick={spotifySigninHandler}>Sign in with Spotify</button>
				<button onClick={githubSigninHandler}>Sign in with GitHub</button>
				<button onClick={discordSigninHandler}>Sign in with Discord</button>
			</div>
		</div>
	);
};

export default SigninPage;
