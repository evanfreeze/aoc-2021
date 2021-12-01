import fs from "fs";
import path from "path";

export function splitFileByLines(filePath: string): string[] {
    const file = fs.readFileSync(path.join(process.cwd(), filePath), "utf-8");
    return file.split("\n");
}
