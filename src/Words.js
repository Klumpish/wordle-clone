import wordBank from "./Wordle-bank.txt";
export const boardDefault = [
	[
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
	],
	[
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
	],
	[
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
	],
	[
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
	],
	[
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
	],
	[
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
		{ letter: "", color: "" },
	],
];

export const generateWordSet = async () => {
	let wordSet;
	let todaysWord;
	await fetch(wordBank)
		.then((response) => response.text())
		.then((result) => {
			const wordArr = result.split("\n");
			todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
			wordSet = new Set(wordArr);
		});
	return { wordSet, todaysWord };
};
