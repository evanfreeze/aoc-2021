import { splitFileByLines } from "../utils/file";
import { printOutput } from "../utils/output";

const inputPath = "day-02/input.txt";

const fileLines = splitFileByLines(inputPath);

printOutput(part1, part2);

function part1() {
    let horizontal = 0;
    let depth = 0;
    for (const line of fileLines) {
        const [direction, amount] = line.split(" ");
        switch (direction) {
            case "forward":
                horizontal += Number(amount);
                break;
            case "down":
                depth += Number(amount);
                break;
            case "up":
                depth -= Number(amount);
                break;
            default:
                break;
        }
    }
    return horizontal * depth;
}

function part2() {
    let horizontal = 0;
    let aim = 0;
    let depth = 0;
    for (const line of fileLines) {
        const [direction, amount] = line.split(" ");
        switch (direction) {
            case "forward":
                horizontal += Number(amount);
                depth += Number(amount) * aim;
                break;
            case "down":
                aim += Number(amount);
                break;
            case "up":
                aim -= Number(amount);
                break;
            default:
                break;
        }
    }
    return horizontal * depth;
}
