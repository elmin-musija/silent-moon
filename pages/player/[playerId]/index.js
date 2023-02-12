import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { getAccessToken } from "@/utils/spotify/spotify";
import dynamic from "next/dynamic";
import styles from "./player.module.css";

const DynamicPlayer = dynamic(() => import("@/components/player/player"), {
	ssr: false,
});

const PlayerPage = ({ type, offset, id, token }) => {
	const [render, setRender] = useState(false);

	useEffect(() => {
		setRender(true);
	}, [token]);

	return (
		<div className={styles.playerPage}>
			<div className={styles.webPlayer}>
				{render && (
					<DynamicPlayer type={type} offset={offset} id={id} token={token} />
				)}
			</div>
		</div>
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

	return { props: { type, offset, id, token: access_token } };
}
