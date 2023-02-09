import Link from "next/link";
import { Roboto } from "@next/font/google";
import "@/styles/globals.css";
import styles from "./app.module.css";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }) {
	return (
		<div className={`${styles.smartphone} ${roboto.className}`}>
			<div className={styles.content}>
				<Component {...pageProps} />
			</div>
			<Link href={"/"} className={styles.homeBtn}></Link>
		</div>
	);
}
