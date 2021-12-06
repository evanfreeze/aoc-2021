import { splitFileByLines } from "../utils/file";
import { printOutput } from "../utils/output";

const inputPath = "day-06/input.txt";

const fileLines = splitFileByLines(inputPath);

printOutput(part1, part2);

export function calculateFishGrowth(start: string, days: number): number {
    let fish = start.split(",").map(Number);
    let daysRemaining = days;

    while (daysRemaining > 0) {
        let newFish = 0;
        for (let i = 0; i < fish.length; i += 1) {
            if (fish[i] === 0) {
                fish[i] = 6;
                newFish += 1;
            } else {
                fish[i] -= 1;
            }
        }
        for (let n = newFish; n > 0; n -= 1) {
            fish.push(8);
        }
        daysRemaining -= 1;
    }

    return fish.length;
}

function part1() {
    return calculateFishGrowth(fileLines[0], 80);
}

function part2() {}
