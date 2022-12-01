import { importSolution, readLines } from "./utils";

const day = Number(process.argv[2]);

console.log(`Advent of Code 2022: Day ${day}`);

console.log(`Loading solver …`);
const solve = (await importSolution(day)).default.solve;

console.log(`Loading input from ${day}/input.txt …`);
const input = await readLines(day);

console.log(`Solving …`);
const result = await solve(input);

console.log('Result:');
console.log(`${result}`);
