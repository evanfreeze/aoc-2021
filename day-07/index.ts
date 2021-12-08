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

export function getMinFuelToAlignHigherCost(input: string): number {
    const numbers = input.split(",").map(Number);
    const max = Math.max(...numbers);
    const min = Math.min(...numbers);
    let cursor = min;
    let lowestFuel = Infinity;

    // this feels gross but it's fairly cheap to calculate this, so why not just brute force it
    while (cursor <= max) {
        const fuelAtCursor = numbers.reduce((fuel, n) => getFuelForMove(n, cursor) + fuel, 0);
        lowestFuel = Math.min(lowestFuel, fuelAtCursor);
        cursor += 1;
    }

    return lowestFuel;
}

export function getFuelForMove(start: number, end: number): number {
    let distance = Math.abs(start - end);
    let total = 0;
    while (distance > 0) {
        total += distance;
        distance -= 1;
    }
    return total;
}

function part1() {
    return getMinFuelToAlign(fileLines[0]);
}

function part2() {
    return getMinFuelToAlignHigherCost(fileLines[0]);
}
