import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { uid } from "uid";
import { getAccessToken } from "@/src/services/utils/spotify/spotify";
import dynamic from "next/dynamic";
import Image from "next/image";
import NotificationContext from "@/context/context";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./player.module.css";

const DynamicPlayer = dynamic(() => import("@/components/player/player"), {
	ssr: false,
});

const PlayerPage = ({ type, offset, id, token }) => {
	const { setPhoneRotated } = useContext(NotificationContext);
	const [render, setRender] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setRender(true);
	}, [token]);

	useEffect(() => {
		setPhoneRotated();
	}, []);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.7 }}
				className={styles.playerPage}
				id="top"
			>
				<button onClick={() => router.back()} className={styles.closeBtn}>
					<Image
						src="/img/close_player.svg"
						width="55"
						height="55"
						alt="close player"
					/>
				</button>
				<div key={uid()} className={styles.playerContainer}>
					{render && (
						<DynamicPlayer type={type} offset={offset} id={id} token={token} />
					)}
				</div>
				<Image
					src="/img/player_bg_element_1.svg"
					width="170"
					height="170"
					alt="background element"
					className={styles.bg_element_1}
				/>
				<Image
					src="/img/player_bg_element_2.svg"
					width="240"
					height="600"
					alt="background element"
					className={styles.bg_element_2}
				/>
				<Image
					src="/img/player_bg_element_3.svg"
					width="150"
					height="150"
					alt="background element"
					className={styles.bg_element_3}
				/>
				<Image
					src="/img/player_bg_element_4.svg"
					width="150"
					height="150"
					alt="background element"
					className={styles.bg_element_4}
				/>
				<Image
					src="/img/player_bg_element_5.svg"
					width="300"
					height="380"
					alt="background element"
					className={styles.bg_element_5}
				/>
				<Image
					src="/img/player_bg_element_6.svg"
					width="170"
					height="170"
					alt="background element"
					className={styles.bg_element_6}
				/>
			</motion.div>
		</AnimatePresence>
	);
};

export default PlayerPage;

export async function getServerSideProps(context) {
	const session = await getServerSession(
		context.req,
		context.res,
		NextAuthOptions
	);

	if (!session) {
		return { redirect: { destination: "/", permanent: false } };
	}

	const { type, offset, id } = context.query;
	const { refresh_token } = session.token;
	const { access_token } = await getAccessToken(refresh_token);

	return {
		props: {
			type,
			offset,
			id,
			token: access_token,
		},
	};
}
