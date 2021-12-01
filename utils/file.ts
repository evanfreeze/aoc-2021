import fs from "fs";
import path from "path";

export function splitFileByLines(filePath): string[] {
    const file = fs.readFileSync(path.join(__dirname, "..", filePath), "utf-8");
    return file.split("\n");
}
