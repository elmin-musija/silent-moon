import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./title.module.css";

const Title = () => {
	const router = useRouter();
	const { data: session } = useSession();

	let image = "/img/user.svg";

	if (session) {
		const { user } = session;
		if (user.picture) {
			image = user.picture;
		}
	}

	return (
		<div className={styles.title}>
			<h1>silent moon</h1>
			{router.pathname !== "/profile" && (
				<Link href="/profile">
					<Image src={image} width="40" height="40" alt="profile" />
				</Link>
			)}
		</div>
	);
};

export default Title;
