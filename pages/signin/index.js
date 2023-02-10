import React from "react";
import Link from "next/link";
import BackArrow from "@/components/backArrow/backArrow";
import styles from "./signin.module.css";
import CircularSection from "@/components/circular-section/circular-section";
import { signIn } from "next-auth/react";
import Image from "next/image";

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
				<div className={styles.providerContainer}>
					<div className={styles.providerItem}>
						<Image
							className={styles.providerLogo}
							onClick={googleSigninHandler}
							src="img/google.svg"
							width="50"
							height="50"
						></Image>
						<p className={styles.providerText} onClick={googleSigninHandler}>
							Google
						</p>
					</div>
					<div className={styles.providerItem}>
						<Image
							className={styles.providerLogo}
							onClick={spotifySigninHandler}
							src="img/spotify.svg"
							width="50"
							height="50"
						></Image>
						<p className={styles.providerText} onClick={spotifySigninHandler}>
							Spotify
						</p>
					</div>
					<div className={styles.providerItem}>
						<Image
							className={styles.providerLogo}
							onClick={githubSigninHandler}
							src="img/github.svg"
							width="50"
							height="50"
						></Image>
						<p className={styles.providerText} onClick={githubSigninHandler}>
							Github
						</p>
					</div>
					<div className={styles.providerItem}>
						<Image
							className={styles.providerLogo}
							onClick={discordSigninHandler}
							src="img/discord.svg"
							width="50"
							height="50"
						></Image>
						<p className={styles.providerText} onClick={discordSigninHandler}>
							Discord
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SigninPage;
