import { splitFileByLines } from "../utils/file";
import { printOutput } from "../utils/output";

const inputPath = "day-08/input.txt";

const fileLines = splitFileByLines(inputPath);

printOutput(part1, part2);

export function getCountForLine(line: string) {
    const outputNumbers = line.split(" | ")[1].split(" ");
    return outputNumbers.reduce((total, num) => {
        if ([3, 4, 2, 7].includes(num.length)) {
            total += 1;
        }
        return total;
    }, 0);
}

function part1() {
    return fileLines.filter(Boolean).reduce((total, line) => total + getCountForLine(line), 0);
}

function part2() {}
