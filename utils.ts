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

    // This version of the regex skips empty lines …
    // return inputData.split(/[\r\n]+/);

    return inputData.split(/\r\n/);
}

// Dynamically import solution
async function importSolution(day: number): Promise<{ default: { solve: (input: string[]) => Promise<string> } }> {
    return await import(`./${day}/solution.ts`);
}

export { readInput, readLines, importSolution };

