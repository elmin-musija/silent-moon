import { react, useContext } from "react";
import NotificationContext from "@/context/context";
import styles from "./smartphone.module.css";

const Smartphone = ({ children }) => {
	const { getStatusRotation } = useContext(NotificationContext);

	return (
		<div
			className={
				getStatusRotation()
					? `${styles.smartphoneContainer} ${styles.smartphoneContainerRotated} `
					: `${styles.smartphoneContainer}  `
			}
		>
			<>{children}</>
		</div>
	);
};

export default Smartphone;
