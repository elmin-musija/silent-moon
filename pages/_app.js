import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { Source_Sans_Pro } from "@next/font/google";
import "@/styles/globals.css";
import styles from "./app.module.css";
import Footer from "@/components/footer/footer";

const sourceSansPro = Source_Sans_Pro({
	subsets: ["latin"],
	weight: ["400", "700", "900"],
});

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session} refetchInterval={60 * 60 * 24}>
			<div className={`${styles.smartphone} ${sourceSansPro.className}`}>
				<div className={styles.content}>
					<Component {...pageProps} />
					<Footer />
				</div>
				<Link href="/" className={styles.homeBtn}></Link>
			</div>
		</SessionProvider>
	);
}
