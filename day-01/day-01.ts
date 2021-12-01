import { readLines } from "https://deno.land/std/io/bufio.ts";

const file = await Deno.open("./input.txt");

let previous = null;
let numberOfIncreases = 0;

for await (const sonarReading of readLines(file)) {
    const numericalReading = Number(sonarReading);
    if (previous && numericalReading > previous) {
        numberOfIncreases += 1;
    }
    previous = numericalReading;
}

console.info(numberOfIncreases);
