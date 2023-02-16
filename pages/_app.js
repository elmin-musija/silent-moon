import Link from "next/link";
import { useState } from "react";
import { Source_Sans_Pro } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import { NotificationContextProvider } from "@/context/context";
import Head from "next/head";
import Notification from "../components/notification/notification";
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
	const [isRotated, setIsRotated] = useState(false);

	const rotateHandler = () => {
		setIsRotated((prevState) => !prevState);
	};

	return (
		<SessionProvider session={session} refetchInterval={60 * 60 * 24}>
			<NotificationContextProvider>
				<div className={styles.smartphoneContainer}>
					<div
						className={
							isRotated
								? `${styles.smartphone} ${styles.smartphoneRotated} ${sourceSansPro.className}`
								: `${styles.smartphone}  ${sourceSansPro.className}`
						}
					>
						<div className={styles.content}>
							<Head>
								<title>Silent Moon</title>
								<meta
									name="description"
									content="Silent Moon is meditation and yoga app to calm you down"
								/>
								<meta
									name="viewport"
									content="width=device-width, initial-scale=1"
								/>
								<link rel="icon" href="/img/favicon.png" />
							</Head>
							<Notification />
							<Component {...pageProps} rotateHandler={rotateHandler} />
							<Footer />
						</div>
					</div>
					<div className={styles.loudspeaker}></div>
					<Link href="/" className={styles.homeBtn}></Link>
				</div>
			</NotificationContextProvider>
		</SessionProvider>
	);
}
