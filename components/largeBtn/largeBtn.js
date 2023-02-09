import Link from "next/link";
import styles from "./largeBtn.module.css";

const LargeBtn = (props) => {
	return (
		<Link href={props.url} className={styles.btn}>
			{props.children}
		</Link>
	);
};

export default LargeBtn;
