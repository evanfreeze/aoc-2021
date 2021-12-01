import { splitFileByLines } from "../utils/file";
import { printOutput } from "../utils/output";

const inputPath = "day-01/input.txt";
printOutput(part1, part2);

function part1() {
    const sonarReadings = splitFileByLines(inputPath).map((l) => Number(l));

    let previous: number;
    let totalIncreases = 0;

    for (const reading of sonarReadings) {
        if (previous && reading > previous) {
            totalIncreases += 1;
        }
        previous = reading;
    }

    return totalIncreases;
}

function part2() {
    const sonarReadings = splitFileByLines(inputPath).map((l) => Number(l));

    let groupEnd = 4;
    let totalGroupIncreases = 0;

    while (groupEnd < sonarReadings.length) {
        const firstGroupSum = sonarReadings.slice(groupEnd - 4, groupEnd - 1).reduce((total, num) => total + num);
        const secondGroupSum = sonarReadings.slice(groupEnd - 3, groupEnd).reduce((total, num) => total + num);
        if (secondGroupSum > firstGroupSum) {
            totalGroupIncreases += 1;
        }
        groupEnd += 1;
    }

    return totalGroupIncreases;
}
