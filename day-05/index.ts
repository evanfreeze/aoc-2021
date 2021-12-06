import { splitFileByLines } from "../utils/file";
import { printOutput } from "../utils/output";

const inputPath = "day-05/input.txt";

const fileLines = splitFileByLines(inputPath);

printOutput(part1, part2);

export function parseLineIntoPointsHV(line: string): [number, number][] {
    const [startStr, , endStr] = line.split(" ");
    const startPoint = startStr.split(",").map(Number) as [number, number];
    const endPoint = endStr.split(",").map(Number) as [number, number];

    let points = [startPoint];

    if (startPoint[0] === endPoint[0]) {
        if (startPoint[1] > endPoint[1]) {
            while (points[points.length - 1][1] > endPoint[1]) {
                points.push([startPoint[0], points[points.length - 1][1] - 1]);
            }
        } else {
            while (points[points.length - 1][1] < endPoint[1]) {
                points.push([startPoint[0], points[points.length - 1][1] + 1]);
            }
        }
    } else if (startPoint[1] === endPoint[1]) {
        if (startPoint[0] > endPoint[0]) {
            while (points[points.length - 1][0] > endPoint[0]) {
                points.push([points[points.length - 1][0] - 1, endPoint[1]]);
            }
        } else {
            while (points[points.length - 1][0] < endPoint[0]) {
                points.push([points[points.length - 1][0] + 1, endPoint[1]]);
            }
        }
    } else {
        return [];
    }

    return points;
}

function getMoreThanOneCount(inputLines: string[], cb: (input: string) => [number, number][]): number {
    const pointMap = inputLines.filter(Boolean).reduce((map, line) => {
        const pointsInLine = cb(line);
        pointsInLine.forEach((point) => {
            const stringPoint = String(point);
            if (map[stringPoint]) {
                map[stringPoint] += 1;
            } else {
                map[stringPoint] = 1;
            }
        });
        return map;
    }, {} as Record<string, number>);
    const moreThanOne = Object.entries(pointMap).filter(([k, v]) => v > 1);
    return moreThanOne.length;
}

function part1() {
    return getMoreThanOneCount(fileLines, parseLineIntoPointsHV);
}

export function parseLineIntoPointsHVD(line: string): [number, number][] {
    const [startStr, , endStr] = line.split(" ");
    const startPoint = startStr.split(",").map(Number) as [number, number];
    const endPoint = endStr.split(",").map(Number) as [number, number];

    let points = [startPoint];
    const [sx, sy] = startPoint;
    const [ex, ey] = endPoint;

    if (sx === ex) {
        if (sy > ey) {
            while (points[points.length - 1][1] > ey) {
                points.push([sx, points[points.length - 1][1] - 1]);
            }
        } else {
            while (points[points.length - 1][1] < ey) {
                points.push([sx, points[points.length - 1][1] + 1]);
            }
        }
    } else if (sy === ey) {
        if (sx > ex) {
            while (points[points.length - 1][0] > ex) {
                points.push([points[points.length - 1][0] - 1, ey]);
            }
        } else {
            while (points[points.length - 1][0] < ex) {
                points.push([points[points.length - 1][0] + 1, ey]);
            }
        }
    } else {
        const xDiff = sx - ex;
        const yDiff = sy - ey;

        if (xDiff < 0 && yDiff < 0) {
            // diagonal to bottom right
            while (String(points[points.length - 1]) !== String(endPoint)) {
                points.push([points[points.length - 1][0] + 1, points[points.length - 1][1] + 1]);
            }
        } else if (xDiff < 0 && yDiff > 0) {
            // diagonal to top right
            while (String(points[points.length - 1]) !== String(endPoint)) {
                points.push([points[points.length - 1][0] + 1, points[points.length - 1][1] - 1]);
            }
        } else if (xDiff > 0 && yDiff < 0) {
            // diagonal to bottom left
            while (String(points[points.length - 1]) !== String(endPoint)) {
                points.push([points[points.length - 1][0] - 1, points[points.length - 1][1] + 1]);
            }
        } else if (xDiff > 0 && yDiff > 0) {
            // diagonal to top left
            while (String(points[points.length - 1]) !== String(endPoint)) {
                points.push([points[points.length - 1][0] - 1, points[points.length - 1][1] - 1]);
            }
        }
    }

    return points;
}

function part2() {
    return getMoreThanOneCount(fileLines, parseLineIntoPointsHVD);
}
