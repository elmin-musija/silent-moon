import { react, useContext } from "react";
import NotificationContext from "@/context/context";
import styles from "./smartphone.module.css";

const Smartphone = ({ children }) => {
	const { getPhoneRotated } = useContext(NotificationContext);

	return (
		<div
			className={
				getPhoneRotated()
					? `${styles.smartphoneContainer} ${styles.smartphoneContainerRotated} `
					: `${styles.smartphoneContainer}  `
			}
		>
			<>{children}</>
		</div>
	);
};

export default Smartphone;
