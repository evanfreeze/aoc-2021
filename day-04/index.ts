import { splitFileByLines } from "../utils/file";
import { printOutput } from "../utils/output";

const inputPath = "day-04/input.txt";

const winPatterns = [
    "0,0|0,1|0,2|0,3|0,4",
    "1,0|1,1|1,2|1,3|1,4",
    "2,0|2,1|2,2|2,3|2,4",
    "3,0|3,1|3,2|3,3|3,4",
    "4,0|4,1|4,2|4,3|4,4",
    "0,0|1,0|2,0|3,0|4,0",
    "0,1|1,1|2,1|3,1|4,1",
    "0,2|1,2|2,2|3,2|4,2",
    "0,3|1,3|2,3|3,3|4,3",
    "0,4|1,4|2,4|3,4|4,4",
];

export function extractBoards(input: string): string[][][] {
    let boards = input.split("\n\n").filter(Boolean);
    let boardsWithRows = boards.map((board) => board.split("\n"));
    let boardsWithCells = boardsWithRows.map((board) => board.map((row) => row.split(" ").filter(Boolean)));
    let finalResult = boardsWithCells.map((board) => board.map((row) => row.map(String)));
    return finalResult;
}

export function checkIfBingo(calledNumbers: string[], board: string[][]): boolean {
    return winPatterns.some((pattern) => {
        return pattern.split("|").every((cell) => {
            const [row, col] = cell.split(",").map(Number);
            const result = calledNumbers.includes(board[row][col]);
            return result;
        });
    });
}

function part1() {
    const lines = splitFileByLines(inputPath);
    const instructions = lines.shift();
    const boardsToTest = extractBoards(lines.join("\n").trim());

    const singleInstructions = instructions.split(",");
    let numbersCalled = 0;
    let winningBoard;

    while (!winningBoard) {
        const numbersCalledSoFar = singleInstructions.slice(0, numbersCalled);
        winningBoard = boardsToTest.find((board) => checkIfBingo(numbersCalledSoFar, board));
        if (winningBoard) {
            break;
        }
        numbersCalled += 1;
    }

    const unmarked = winningBoard
        .flatMap((n) => n)
        .filter((n) => !singleInstructions.slice(0, numbersCalled).includes(n));
    const unmarkedSum = unmarked.reduce((sum, val) => sum + Number(val), 0);
    const lastNumberCalled = singleInstructions[numbersCalled - 1];

    return unmarkedSum * Number(lastNumberCalled);
}

function part2() {
    const lines = splitFileByLines(inputPath);
    const instructions = lines.shift();
    const boardsToTest = extractBoards(lines.join("\n").trim());

    const singleInstructions = instructions.split(",");
    let numbersCalled = 1;
    let possibleBoards = [...boardsToTest];

    while (possibleBoards.length > 1) {
        console.log(`called ${numbersCalled} numbers`, `remaining unsolved boards: ${possibleBoards.length}`);
        const numbersCalledSoFar = singleInstructions.slice(0, numbersCalled);
        possibleBoards = boardsToTest.filter((board) => !checkIfBingo(numbersCalledSoFar, board));
        if (possibleBoards.length === 1) {
            break;
        }
        numbersCalled += 1;
    }

    const lastBoardToWin = possibleBoards[0];

    numbersCalled = 0;
    while (!checkIfBingo(singleInstructions.slice(0, numbersCalled), lastBoardToWin)) {
        numbersCalled += 1;
    }

    const unmarked = lastBoardToWin
        .flatMap((n) => n)
        .filter((n) => !singleInstructions.slice(0, numbersCalled).includes(n));
    const unmarkedSum = unmarked.reduce((sum, val) => sum + Number(val), 0);
    const lastNumberCalled = singleInstructions[numbersCalled - 1];

    return unmarkedSum * Number(lastNumberCalled);
}

printOutput(part1, part2);
