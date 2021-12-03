import { splitFileByLines } from "../utils/file";
import { printOutput } from "../utils/output";

const inputPath = "day-03/input.txt";

const fileLines = splitFileByLines(inputPath);

printOutput(part1, part2);

function getBitSums(numbers: string[]): [number[], number] {
    const bitSplit = numbers.map((line) => line.split("").map((b) => Number(b)));
    const bitSums: number[] = [];
    for (let i = 0; i < bitSplit[0].length; i += 1) {
        let bitSum = 0;
        bitSplit.forEach((bs) => {
            if (bs[i]) {
                bitSum += bs[i];
            }
        });
        bitSums.push(bitSum);
    }
    return [bitSums, bitSplit.length];
}

export function solvePart1(lines: string[]) {
    const [bitSums, totalNumbers] = getBitSums(lines.filter(Boolean));
    const gamma = bitSums.map((bs) => (bs >= totalNumbers / 2 ? 1 : 0));
    const epsilon = gamma.map((bit) => Number(!Boolean(bit)));
    const gammaBinary = gamma.join().replace(/,/g, "");
    const epsilonBinary = epsilon.join().replace(/,/g, "");
    return parseInt(gammaBinary, 2) * parseInt(epsilonBinary, 2);
}

function part1() {
    return solvePart1(fileLines);
}

export function solvePart2(lines: string[]) {
    let oxygenResults = lines.filter(Boolean);
    let oxygenMatch = "";
    let bit = 0;
    while (oxygenResults.length > 1) {
        const [bitSums, totalNumbers] = getBitSums(oxygenResults);
        const keepVal = bitSums[bit] >= totalNumbers / 2 ? "1" : "0";
        oxygenMatch += keepVal;
        oxygenResults = oxygenResults.filter((res) => res.startsWith(oxygenMatch));
        bit += 1;
    }
    let co2Results = lines.filter(Boolean);
    let co2Match = "";
    bit = 0;
    while (co2Results.length > 1) {
        const [bitSums, totalNumbers] = getBitSums(co2Results);
        const keepVal = bitSums[bit] >= totalNumbers / 2 ? "0" : "1";
        co2Match += keepVal;
        co2Results = co2Results.filter((res) => res.startsWith(co2Match));
        bit += 1;
    }

    return parseInt(oxygenResults[0], 2) * parseInt(co2Results[0], 2);
}

function part2() {
    return solvePart2(fileLines);
}
