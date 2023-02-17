import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import LargeBtn from "@/components/largeBtn/largeBtn";

export default function Home() {
	return (
		<div className={styles.splashscreenPage}>
			<main>
				<Image
					src={"/img/login.png"}
					width="414"
					height="468"
					alt="man doing handstand in nature"
					priority
				/>
				<h1>silent moon</h1>
				<div className={styles.content}>
					<div className={styles.introTextBox}>
						<h2>We are what we do</h2>
						<p>
							Thousand of people are using silent moon for meditation and yoga
							classes.
						</p>
					</div>
					<LargeBtn url="/signup">Sign Up</LargeBtn>
					<p className={styles.logInText}>
						Already have an account? <Link href="/signin">Log in</Link>
					</p>
				</div>
			</main>
		</div>
	);
}
