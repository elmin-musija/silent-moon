import React, { useRef } from "react";
import styles from "./edit.module.css";

const EditPage = () => {
	const inputTitleRef = useRef(null);
	const inputDescriptionRef = useRef(null);
	const inputImageRef = useRef(null);
	const inputCategoryRef = useRef(null);
	const inputLevelRef = useRef(null);
	const inputLengthDurationMinRef = useRef(null);
	const inputLengthDurationSecRef = useRef(null);
	const inputUrlRef = useRef(null);

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: inputTitleRef.current.value,
				description: inputDescriptionRef.current.value,
				imageUrl: inputImageRef.current.value,
				category: inputCategoryRef.current.value,
				level: inputLevelRef.current.value,
				duration: {
					minutes: inputLengthDurationMinRef.current.value,
					seconds: inputLengthDurationSecRef.current.value,
				},
				videoUrl: inputUrlRef.current.value,
			}),
		};
		const result = await fetch("/api/yoga/exercise", options);
		const response = await result.json();

		if (response.status === "success") {
			inputTitleRef.current.value = "";
			inputDescriptionRef.current.value = "";
			inputImageRef.current.value = "";
			inputCategoryRef.current.value = "";
			inputLevelRef.current.value = "";
			inputLengthDurationMinRef.current.value = "";
			inputLengthDurationSecRef.current.value = "";
			inputUrlRef.current.value = "";
		}
	};

	return (
		<div>
			<h1>Edit Page</h1>
			<form className={styles.form} onSubmit={onSubmitHandler}>
				<input
					type="text"
					name="input-title"
					id="input-title"
					required
					ref={inputTitleRef}
					placeholder="title"
				/>
				<input
					type="text"
					name="input-description"
					id="input-description"
					required
					ref={inputDescriptionRef}
					placeholder="description"
				/>
				<select
					name="input-type-category-select"
					id="input-type-category-select"
					ref={inputCategoryRef}
					required
				>
					<option value="anxious">Anxious</option>
					<option value="sleep">Sleep</option>
					<option value="kids">Kids</option>
					<option value="recovery">Recovery</option>
					<option value="fitness">Fitness</option>
				</select>
				<select
					name="input-level-select"
					id="input-level-select"
					ref={inputLevelRef}
					required
				>
					<option value="beginner">Beginner</option>
					<option value="medium">Medium</option>
					<option value="intermediate">Intermediate</option>
					<option value="advanced">Advanced</option>
				</select>
				<input
					type="number"
					name="input-length-value-min"
					id="input-length-value-min"
					ref={inputLengthDurationMinRef}
					placeholder="Video length minutes"
					required
				/>
				<input
					type="number"
					name="input-length-value-sec"
					id="input-length-value-sec"
					ref={inputLengthDurationSecRef}
					placeholder="Video length seconds"
					required
				/>
				<input
					type="text"
					name="input-image-url"
					id="input-image-url"
					ref={inputImageRef}
					placeholder="Image url"
					required
				/>
				<input
					type="text"
					name="input-video-url"
					id="input-video-url"
					ref={inputUrlRef}
					placeholder="Video url"
					required
				/>
				<input type="submit" value="Create" />
			</form>
		</div>
	);
};

export default EditPage;
