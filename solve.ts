import { importSolution as importSolver, readLines } from "./utils";

const day = Number(process.argv[2]);

console.log(`Advent of Code 2022: Day ${day}`);

console.log(`Loading solver from ${day}/solution.ts …`);
const solve = await importSolver(day);

console.log(`Loading input from ${day}/input.txt …`);
const input = await readLines(day);

console.log(`Solving …`);
const results = await solve(input);

for (const [part, result] of results.entries()) {
    console.log(`Result of Part ${part + 1}:`, '\n');
    console.log(result, '\n');
}
