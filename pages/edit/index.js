import React, { useRef } from "react";
import styles from "./edit.module.css";

const EditPage = () => {
	const inputTitleRef = useRef(null);
	const inputLevelRef = useRef(null);
	const inputDescriptionRef = useRef(null);
	const inputTypeCategoryRef = useRef(null);
	const inputLengthCategoryRef = useRef(null);
	const inputLengthValueMinRef = useRef(null);
	const inputLengthValueSecRef = useRef(null);
	const inputUrlRef = useRef(null);
	const inputImageRef = useRef(null);

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: inputTitleRef.current.value,
				level: inputLevelRef.current.value,
				description: inputDescriptionRef.current.value,
				typeCategory: inputTypeCategoryRef.current.value,
				lengthCategory: inputLengthCategoryRef.current.value,
				lengthValue: {
					minutes: inputLengthValueMinRef.current.value,
					seconds: inputLengthValueSecRef.current.value,
				},
				videoUrl: inputUrlRef.current.value,
				imageUrl: inputImageRef.current.value,
			}),
		};
		const result = await fetch("/api/yoga/exercise", options);
		const response = await result.json();

		if (response.status === "success") {
			inputTitleRef.current.value = "";
			inputLevelRef.current.value = "";
			inputDescriptionRef.current.value = "";
			inputTypeCategoryRef.current.value = "";
			inputLengthCategoryRef.current.value = "";
			inputLengthValueMinRef.current.value = "";
			inputLengthValueSecRef.current.value = "";
			inputUrlRef.current.value = "";
			inputImageRef.current.value = "";
		}
	};

	return (
		<div className={styles.editPage}>
			<h1 className={styles.headline}> Edit Page </h1>
			<form className={styles.form} onSubmit={onSubmitHandler}>
				<input
					type="text"
					name="input-title"
					id="input-title"
					required
					ref={inputTitleRef}
					placeholder="Title"
				/>

				<input
					type="text"
					name="input-description"
					id="input-description"
					required
					ref={inputDescriptionRef}
					placeholder="Description"
				/>

				<input
					type="number"
					name="input-length-value-min"
					id="input-length-value-min"
					ref={inputLengthValueMinRef}
					placeholder="Video length minutes"
					required
				/>
				<input
					type="number"
					name="input-length-value-sec"
					id="input-length-value-sec"
					ref={inputLengthValueSecRef}
					placeholder="Video length seconds"
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
				<input
					type="text"
					name="input-image-url"
					id="input-image-url"
					ref={inputImageRef}
					placeholder="Image url"
					required
				/>
				<select
					className={styles.select}
					name="input-level-select"
					id="input-level-select"
					ref={inputLevelRef}
					required
				>
					<option value="" disabled selected>
						Choose your Level
					</option>
					<option value="BEGINNER">Beginner</option>
					<option value="MEDIUM">Medium</option>
					<option value="INTERMEDIATE">Intermediate</option>
					<option value="ADVANCED">Advanced</option>
				</select>
				<select
					className={styles.select}
					name="input-type-category-select"
					id="input-type-category-select"
					ref={inputTypeCategoryRef}
					required
				>
					<option value="ANXIOUS">Anxious</option>
					<option value="" disabled selected>
						Choose Category
					</option>
					<option value="SLEEP">Sleep</option>
					<option value="KIDS">Kids</option>
					<option value="RECOVERY">Recovery</option>
					<option value="FITNESS">Fitness</option>
				</select>
				<select
					className={styles.select}
					name="input-length-category-select"
					id="input-length-category-select"
					ref={inputLengthCategoryRef}
					required
				>
					<option value="" disabled selected>
						Choose Video Length
					</option>
					<option value="SHORT">Short</option>
					<option value="MEDIUM">Medium</option>
					<option value="LONG">Long</option>
				</select>
				<input className={styles.submit} type="submit" value="CREATE" />
			</form>
		</div>
	);
};

export default EditPage;
