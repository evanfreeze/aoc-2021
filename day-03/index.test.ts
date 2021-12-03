import { solvePart1, solvePart2 } from "../day-03";

const mockInput = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
];

it("part 1 works", () => {
    expect(solvePart1(mockInput)).toEqual(198);
});

it("part 2 works", () => {
    expect(solvePart2(mockInput)).toEqual(230);
});
