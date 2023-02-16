import { Inter } from "@next/font/google";
import Link from "next/link";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });
import styles from "./index.module.css";
import LargeBtn from "@/components/largeBtn/largeBtn";
import Title from "@/components/title/title";

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
				<Title />
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
