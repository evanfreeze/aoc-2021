import { getMinFuelToAlign, getMinFuelToAlignHigherCost, getFuelForMove } from "..";

it("calculates optimal fuel alignment position", () => {
    const input = "16,1,2,0,4,2,7,1,2,14";
    expect(getMinFuelToAlign(input)).toEqual(37);
});

it("calculates the optimal fuel alignment position when farther moves cost more", () => {
    const input = "16,1,2,0,4,2,7,1,2,14";
    expect(getMinFuelToAlignHigherCost(input)).toEqual(168);
});

it("calculates the fuel required correctly when farther away grows fuel rate", () => {
    const solutions = [
        [16, 5, 66],
        [1, 5, 10],
        [2, 5, 6],
        [0, 5, 15],
        [4, 5, 1],
        [7, 5, 3],
        [14, 5, 45],
        [10, 10, 0],
        [1, -2, 6],
        [-2, 1, 6],
    ];
    for (const [start, end, result] of solutions) {
        expect(getFuelForMove(start, end)).toEqual(result);
    }
});
