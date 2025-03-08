import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
	const { board, currAttempt, setDisabledLetters } = useContext(AppContext);
	const letterObj = board[attemptVal][letterPos];
	const letter = letterObj.letter;
	const color = letterObj.color;

	useEffect(() => {
		if (letter !== "" && color === "grey") {
			setDisabledLetters((prev) => [...prev, letter]);
		}
	}, [currAttempt.attempt]);

	return <div className={`letter ${color}`}>{letter}</div>;
}

export default Letter;
