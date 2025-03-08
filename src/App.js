import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { createContext, useEffect, useState } from "react";
import { boardDefault, generateWordSet } from "./Words";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
	const [board, setBoard] = useState(boardDefault);
	const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
	const [wordSet, setWordSet] = useState(new Set());
	const [disabledLetters, setDisabledLetters] = useState([]);
	const [correctWord, setCorrectWord] = useState("");
	const [gameOver, setGameOver] = useState({
		gameOver: false,
		guessedWord: false,
	});

	useEffect(() => {
		generateWordSet().then((words) => {
			setWordSet(words.wordSet);
			setCorrectWord(words.todaysWord);
		});
	}, []);

	const onSelectLetter = (keyVal) => {
		if (currAttempt.letterPos > 4) return;
		const newBoard = [...board];
		newBoard[currAttempt.attempt][currAttempt.letterPos] = {
			letter: keyVal,
			color: "",
		};
		setBoard(newBoard);
		setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
	};
	const onDelete = () => {
		if (currAttempt.letterPos === 0) return;
		const newBoard = [...board];
		newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
		setBoard(newBoard);
		setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
	};
	const onEnter = () => {
		if (currAttempt.letterPos !== 5) return;

		let currWord = "";
		for (let i = 0; i < 5; i++) {
			currWord += board[currAttempt.attempt][i].letter;
		}
		currWord = currWord.toLowerCase();

		if (!wordSet.has(currWord)) {
			alert("word not found");
			return;
		}

		const newBoard = [...board];
		const correctWordArray = correctWord.toLowerCase().split("");
		const currWordArray = currWord.split("");

		// First pass: mark correct letters in the correct position as green
		for (let i = 0; i < 5; i++) {
			if (currWordArray[i] === correctWordArray[i]) {
				newBoard[currAttempt.attempt][i] = {
					letter: currWordArray[i].toUpperCase(),
					color: "green",
				};
				correctWordArray[i] = null; // Mark this letter as used
				currWordArray[i] = null; // Mark this letter as used
			}
		}

		// Second pass: mark correct letters in the wrong position as yellow
		for (let i = 0; i < 5; i++) {
			if (currWordArray[i] && correctWordArray.includes(currWordArray[i])) {
				newBoard[currAttempt.attempt][i] = {
					letter: currWordArray[i].toUpperCase(),
					color: "yellow",
				};
				correctWordArray[correctWordArray.indexOf(currWordArray[i])] = null; // Mark this letter as used
			} else if (currWordArray[i]) {
				newBoard[currAttempt.attempt][i] = {
					letter: currWordArray[i].toUpperCase(),
					color: "grey",
				};
			}
		}

		setBoard(newBoard);
		setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });

		if (currWord === correctWord.toLowerCase()) {
			setGameOver({ gameOver: true, guessedWord: true });
		} else if (currAttempt.attempt === 5) {
			setGameOver({ gameOver: true, guessedWord: false });
		}
	};
	return (
		<div className="App">
			<nav>
				<h1>Wordle boiiiz</h1>
			</nav>
			<AppContext.Provider
				value={{
					board,
					setBoard,
					currAttempt,
					setCurrAttempt,
					onSelectLetter,
					onDelete,
					onEnter,
					correctWord,
					disabledLetters,
					setDisabledLetters,
					gameOver,
					setGameOver,
				}}>
				<div className="game">
					<Board />
					{gameOver.gameOver ? <GameOver /> : <Keyboard />}
				</div>
			</AppContext.Provider>
		</div>
	);
}

export default App;
