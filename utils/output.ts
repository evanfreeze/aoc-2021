export function printOutput(part1?: Function, part2?: Function) {
    console.info("PART 1: ", part1?.() ?? "Not implemented");
    console.info("PART 2: ", part2?.() ?? "Not implemented");
}
