import React, { useRef, useContext } from "react";
import Link from "next/link";
import CircularSection from "@/components/circular-section/circular-section";
import Image from "next/image";
import styles from "./signup.module.css";
import NotificationContext from "@/context/context";
import { signIn } from "next-auth/react";

const SignupPage = () => {
	const { displayNotification } = useContext(NotificationContext);
	const inputRefFirstname = useRef(null);
	const inputRefLastname = useRef(null);
	const inputRefEmail = useRef(null);
	const inputRefPassword = useRef(null);

	const clearInputFields = () => {
		inputRefFirstname.current.value = "";
		inputRefLastname.current.value = "";
		inputRefEmail.current.value = "";
		inputRefPassword.current.value = "";
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstname: inputRefFirstname.current.value,
				lastname: inputRefLastname.current.value,
				email: inputRefEmail.current.value,
				password: inputRefPassword.current.value,
			}),
		};
		const result = await fetch("/api/auth/signup", options);
		const response = await result.json();
		if (response.status === "success") {
			if (response.data.isRegistered) {
				displayNotification({
					type: "success",
					message: "Successfully signed up",
				});
				clearInputFields();
				setTimeout(() => {
					signIn();
				}, 3000);
			} else {
				displayNotification({
					type: "error",
					message: "User already exists",
				});
			}
		}
	};

	return (
		<div className={styles.signupPage} id="top">
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
				<h1 className={styles.header}>Create your account</h1>
				<form className={styles.form} onSubmit={onSubmitHandler}>
					<input
						className={styles.input}
						type="text"
						name="input-firstname"
						id="input-firstname"
						placeholder="FIRSTNAME"
						ref={inputRefFirstname}
						required
					/>
					<input
						className={styles.input}
						type="text"
						name="input-lastname"
						id="input-lastname"
						placeholder="LASTNAME"
						ref={inputRefLastname}
						required
					/>
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
					<input className={styles.submit} type="submit" value="REGISTER" />
				</form>
			</div>
		</div>
	);
};

export default SignupPage;
