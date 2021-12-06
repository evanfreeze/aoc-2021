import { parseLineIntoPoints } from "..";

const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

it("turns line definition into array of points", () => {
    expect(parseLineIntoPoints(`0,9 -> 5,9`)).toEqual([
        [0, 9],
        [1, 9],
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
    ]);

    expect(parseLineIntoPoints(`9,4 -> 3,4`)).toEqual([
        [9, 4],
        [8, 4],
        [7, 4],
        [6, 4],
        [5, 4],
        [4, 4],
        [3, 4],
    ]);

    expect(parseLineIntoPoints(`7,0 -> 7,4`)).toEqual([
        [7, 0],
        [7, 1],
        [7, 2],
        [7, 3],
        [7, 4],
    ]);

    expect(parseLineIntoPoints(`7,4 -> 7,0`)).toEqual([
        [7, 4],
        [7, 3],
        [7, 2],
        [7, 1],
        [7, 0],
    ]);
});

it("with diagonals — turns line definition into array of points", () => {
    expect(parseLineIntoPoints("1,1 -> 3,3", true)).toEqual([
        [1, 1],
        [2, 2],
        [3, 3],
    ]);

    expect(parseLineIntoPoints("3,3 -> 1,1", true)).toEqual([
        [3, 3],
        [2, 2],
        [1, 1],
    ]);

    expect(parseLineIntoPoints("9,7 -> 7,9", true)).toEqual([
        [9, 7],
        [8, 8],
        [7, 9],
    ]);

    expect(parseLineIntoPoints("7,9 -> 9,7", true)).toEqual([
        [7, 9],
        [8, 8],
        [9, 7],
    ]);
});
