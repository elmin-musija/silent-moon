import Link from "next/link";
import { Source_Sans_Pro } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import { NotificationContextProvider } from "@/context/context";
import Head from "next/head";
import Notification from "../components/notification/notification";
import "@/styles/globals.css";
import Footer from "@/components/footer/footer";
import Smartphone from "@/components/smartphone/smartphone";
import styles from "./app.module.css";

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
			<NotificationContextProvider>
				<Smartphone>
					<div className={`${styles.smartphone} ${sourceSansPro.className}`}>
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
							<Component {...pageProps} />
							<Footer />
						</div>
					</div>
					<div className={styles.loudspeaker}></div>
					<Link href="/" className={styles.homeBtn}></Link>
				</Smartphone>
			</NotificationContextProvider>
		</SessionProvider>
	);
}
