import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./footer.module.css";

const Navigation = () => {
	const router = useRouter();

	if (
		router.pathname === "/" ||
		router.pathname === "/signin" ||
		router.pathname === "/signup" ||
		router.pathname === "/welcome" ||
		router.pathname === "/reminders" ||
		router.pathname === "/meditation-player"
	) {
		return;
	}

	const renderYogaBtn = () => {
		if (router.pathname.includes("/yoga")) {
			return (
				<Link href="/yoga">
					<div
						className={`${styles.imgContainer} ${styles.imgContainerActive}`}
					>
						<Image
							src="/img/yoga_active.svg"
							width={24}
							height={24}
							alt="yoga icon"
						/>
					</div>
					<p className={styles.activeText}>Yoga</p>
				</Link>
			);
		} else {
			return (
				<Link href="/yoga">
					<div className={styles.imgContainer}>
						<Image src="/img/yoga.svg" width={24} height={24} alt="yoga icon" />
					</div>
					<p>Yoga</p>
				</Link>
			);
		}
	};

	const renderMeditateBtn = () => {
		if (router.pathname.includes("/meditation")) {
			return (
				<Link href="/meditation">
					<div
						className={`${styles.imgContainer} ${styles.imgContainerActive}`}
					>
						<Image
							src="/img/meditate_active.svg"
							width={24}
							height={24}
							alt="meditate icon"
						/>
					</div>
					<p className={styles.activeText}>Meditate</p>
				</Link>
			);
		} else {
			return (
				<Link href="/meditation">
					<div className={styles.imgContainer}>
						<Image
							src="/img/meditate.svg"
							width={24}
							height={24}
							alt="meditate icon"
						/>
					</div>
					<p>Meditate</p>
				</Link>
			);
		}
	};

	const renderHomeBtn = () => {
		if (router.pathname.includes("/home")) {
			return (
				<Link href="/home">
					<div
						className={`${styles.imgContainer} ${styles.imgContainerActive}`}
					>
						<Image
							src="/img/home_active.svg"
							width={24}
							height={24}
							alt="home icon"
						/>
					</div>
					<p className={styles.activeText}>Home</p>
				</Link>
			);
		} else {
			return (
				<Link href="/home">
					<div className={styles.imgContainer}>
						<Image src="/img/home.svg" width={24} height={24} alt="home icon" />
					</div>
					<p>Home</p>
				</Link>
			);
		}
	};

	const renderMusicBtn = () => {
		if (router.pathname.includes("/music")) {
			return (
				<Link href="/music">
					<div
						className={`${styles.imgContainer} ${styles.imgContainerActive}`}
					>
						<Image
							src="/img/music_active.svg"
							width={24}
							height={24}
							alt="music icon"
						/>
					</div>
					<p className={styles.activeText}>Music</p>
				</Link>
			);
		} else {
			return (
				<Link href="/music">
					<div className={styles.imgContainer}>
						<Image
							src="/img/music.svg"
							width={24}
							height={24}
							alt="music icon"
						/>
					</div>
					<p>Music</p>
				</Link>
			);
		}
	};

	const renderUserBtn = () => {
		if (router.pathname.includes("/profil")) {
			return (
				<Link href="/profile">
					<div
						className={`${styles.imgContainer} ${styles.imgContainerActive}`}
					>
						<Image
							src="/img/user_active.svg"
							width={24}
							height={24}
							alt="user icon"
						/>
					</div>
					<p className={styles.activeText}>Name</p>
				</Link>
			);
		} else {
			return (
				<Link href="/profile">
					<div className={styles.imgContainer}>
						<Image src="/img/user.svg" width={24} height={24} alt="user icon" />
					</div>
					<p>Name</p>
				</Link>
			);
		}
	};

	return (
		<div className={styles.navigation}>
			{renderYogaBtn()}
			{renderMeditateBtn()}
			{renderHomeBtn()}
			{renderMusicBtn()}
			{renderUserBtn()}
		</div>
	);
};

export default Navigation;
