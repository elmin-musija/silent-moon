import React from "react";
import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
	const [showNotification, setShowNotification] = useState(false);
	const [type, setType] = useState();
	const [message, setMessage] = useState();
	const [isRotated, setIsRotated] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowNotification(false);
		}, 2000);
		return () => {
			clearTimeout(timeout);
		};
	});

	const getShowNotification = () => {
		return showNotification;
	};
	const getNotificationType = () => {
		return type;
	};
	const getMessage = () => {
		return message;
	};
	const getStatusRotation = () => {
		return isRotated;
	};
	const setRotation = () => {
		setIsRotated((prevState) => !prevState);
	};

	const displayNotification = ({ type, message }) => {
		setType(type);
		setMessage(message);
		setShowNotification(true);
	};
	const hideNotification = () => {
		setType(null);
		setMessage(null);
		setShowNotification(false);
	};

	return (
		<NotificationContext.Provider
			value={{
				displayNotification,
				hideNotification,
				getShowNotification,
				getNotificationType,
				getMessage,
				getStatusRotation,
				setRotation,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationContext;
