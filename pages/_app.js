import Link from "next/link";
import { Source_Sans_Pro } from "@next/font/google";
import "@/styles/globals.css";
import styles from "./app.module.css";

const sourceSansPro = Source_Sans_Pro({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }) {
	return (
		<div className={`${styles.smartphone} ${sourceSansPro.className}`}>
			<div className={styles.content}>
				<Component {...pageProps} />
			</div>
			<Link href="/" className={styles.homeBtn}></Link>
		</div>
	);
}
