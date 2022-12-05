import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read input.txt
async function readInput(day: number): Promise<string | undefined> {
    try {
        const result = await fs.readFile(
            join(__dirname, String(day), 'input.txt'),
            'utf-8',
        );
        return result;
    } catch (err) {
        console.log(err);
    }
}

// Read input.txt as lines
async function readLines(day: number): Promise<string[]> {
    const inputData = await readInput(day) ?? '';

    return inputData.split(/\r\n/);
}

// Dynamically import solution
async function importSolution(day: number): Promise<(input: string[]) => Promise<unknown[]>> {
    return (await import(`./${day}/solution.ts`)).default.solve;
}

// Check if a line is empty
function isEmptyOrWhitespace(str: string): boolean {
    return str === null || str.match(/^\s*$/) !== null;
}

export { readInput, readLines, importSolution, isEmptyOrWhitespace };

