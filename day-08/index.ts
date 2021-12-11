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

export function getNumericOutputForLine(line: string) {
    const [rawMap, rawOutput] = line.split(" | ");
    const map = rawMap.split(" ");
    const output = rawOutput.split(" ");

    let segmentsToNumber: Record<string, number> = {};
    let numberToSegments: string[][] = [];

    while (Object.keys(segmentsToNumber).length < 10) {
        const sortedMap = [...map].sort((a, b) => a.length - b.length);

        for (const wires of sortedMap) {
            if (wires.length === 2) {
                segmentsToNumber[wires] = 1;
                numberToSegments[1] = wires.split("");
            }

            if (wires.length === 3) {
                segmentsToNumber[wires] = 7;
                numberToSegments[7] = wires.split("");
            }

            if (wires.length === 4) {
                segmentsToNumber[wires] = 4;
                numberToSegments[4] = wires.split("");
            }

            if (wires.length === 7) {
                segmentsToNumber[wires] = 8;
                numberToSegments[8] = wires.split("");
            }

            if (wires.length === 5) {
                const wireSegments = wires.split("");
                // must be 2, 3, or 5
                if (numberToSegments[1]) {
                    if (numberToSegments[1].every((oneSeg) => wireSegments.includes(oneSeg))) {
                        // must be 3 if it has everything 1 has
                        segmentsToNumber[wires] = 3;
                        numberToSegments[3] = wires.split("");
                    } else {
                        // could be 2 or 5
                        if (numberToSegments[6]) {
                            const diffsFrom6 = numberToSegments[6].filter(
                                (segment) => !wireSegments.includes(segment),
                            ).length;

                            if (diffsFrom6 === 1) {
                                // must be 5
                                segmentsToNumber[wires] = 5;
                                numberToSegments[5] = wires.split("");
                            } else {
                                // must be 2
                                segmentsToNumber[wires] = 2;
                                numberToSegments[2] = wires.split("");
                            }
                        }
                    }
                }
            }

            if (wires.length === 6) {
                const wireSegments = wires.split("");
                // must be 0, 6, or 9
                if (numberToSegments[1]) {
                    if (numberToSegments[1].every((segment) => wireSegments.includes(segment))) {
                        // could be be 0 or 9
                        if (numberToSegments[8]) {
                            if (numberToSegments[4]) {
                                if (numberToSegments[4].every((segment) => wireSegments.includes(segment))) {
                                    // must be 9 if it has everything 4 has
                                    segmentsToNumber[wires] = 9;
                                    numberToSegments[9] = wires.split("");
                                } else {
                                    // must be 0 if it doesn't have everything 4 has since 4 has the middle
                                    segmentsToNumber[wires] = 0;
                                    numberToSegments[0] = wires.split("");
                                }
                            }
                        }
                    } else {
                        // must be 6 if it doesn't have both pieces of 1
                        segmentsToNumber[wires] = 6;
                        numberToSegments[6] = wires.split("");
                    }
                }
            }
        }
    }

    const result = output.reduce((result, outputNumber) => {
        const keys = Object.keys(segmentsToNumber);

        // console.log(`Looking for ${outputNumber} in map:\n\n ${JSON.stringify(segmentsToNumber, null, 2)}`);

        const match = keys.find((key) => {
            return (
                outputNumber.length === key.length &&
                outputNumber.split("").every((outputSeg) => key.split("").includes(outputSeg))
            );
        });

        // console.log(`Found match! \n${match} (${segmentsToNumber[match]})`);

        result.push(segmentsToNumber[match]);
        return result;
    }, []);
    return Number(result.join(""));
}

export function calculatePart2Answer(lines: string[]) {
    return lines.filter(Boolean).reduce((total, line) => total + getNumericOutputForLine(line), 0);
}

function part2() {
    return calculatePart2Answer(fileLines);
}
