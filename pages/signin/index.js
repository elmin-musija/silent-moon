import React, { useRef } from "react";
import Link from "next/link";
import CircularSection from "@/components/circular-section/circular-section";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./signin.module.css";

const SigninPage = () => {
	const inputRefEmail = useRef(null);
	const inputRefPassword = useRef(null);

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		/**
		 * signin with nextauth
		 */
		signIn("credentials", {
			email: inputRefEmail.current.value,
			password: inputRefPassword.current.value,
			callbackUrl: "/welcome",
		});
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
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.7 }}
				className={styles.signinPage}
				id="top"
			>
				<CircularSection />

				<Link href="/start" className={styles.backBtn}>
					<Image
						src="/img/arrow-back.svg"
						width="18"
						height="18"
						alt="back"
					></Image>
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
							ref={inputRefEmail}
							required
						/>
						<input
							className={styles.input}
							type="password"
							name="input-password"
							id="input-password"
							placeholder="PASSWORD"
							ref={inputRefPassword}
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
								alt="google logo"
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
								alt="spotify logo"
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
								alt="github logo"
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
								alt="discord logo"
							></Image>
							<p className={styles.providerText} onClick={discordSigninHandler}>
								Discord
							</p>
						</div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default SigninPage;
