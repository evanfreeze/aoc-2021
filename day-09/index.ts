import { splitFileByLines } from "../utils/file";
import { printOutput } from "../utils/output";

const inputPath = "day-09/input.txt";

const fileLines = splitFileByLines(inputPath);

printOutput(part1, part2);

export function getLowPointRiskScore(lines: string[]): number {
    const matrix = lines.filter(Boolean).map((line) => line.split("").map(Number));

    const lowPoints: number[] = [];

    for (var row = 0; row < matrix.length; row += 1) {
        for (var col = 0; col < matrix[row].length; col += 1) {
            const num = matrix[row][col];
            const neighbors = [
                matrix[row - 1]?.[col], // up
                matrix[row + 1]?.[col], // down
                matrix[row][col - 1], // left
                matrix[row][col + 1], // right
            ].filter((neighbor) => typeof neighbor !== "undefined");

            if (neighbors.every((neighbor) => neighbor > num)) {
                lowPoints.push(num);
            }
        }
    }

    return lowPoints.reduce((total, point) => total + (point + 1), 0);
}

function part1() {
    return getLowPointRiskScore(fileLines);
}

function part2() {}
