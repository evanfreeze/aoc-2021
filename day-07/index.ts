import { splitFileByLines } from "../utils/file";
import { printOutput } from "../utils/output";

const inputPath = "day-07/input.txt";

const fileLines = splitFileByLines(inputPath);

printOutput(part1, part2);

export function getMinFuelToAlign(input: string): number {
    const sortedNumbers = input
        .split(",")
        .map(Number)
        .sort((a, b) => a - b);
    return sortedNumbers.reduce(
        (totalFuel, num) => Math.abs(sortedNumbers[sortedNumbers.length / 2] - num) + totalFuel,
        0,
    );
}

function part1() {
    return getMinFuelToAlign(fileLines[0]);
}

function part2() {}
