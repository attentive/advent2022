import { isEmptyOrWhitespace } from "../utils";

type Crate = string;
type Stack = Crate[];
type Floor = Stack[];

type Move = {
    quantity: number;
    from: number;
    to: number;
};

const parseFloor = (floorLines: string[]): Floor => {
    // Remove 1 … 9 indices and read stacks from bottom to top
    floorLines = floorLines.reverse().slice(1);

    // Create empty Floor - note the use of .from, not .fill
    const floor: Floor = Array.from(Array(9), () => [] as Stack);

    // Load lines into Floor structure
    floorLines.forEach((line) => {
        [...Array(Math.ceil(line.length / 4)).keys()].forEach((stack) => {
            const token = line.slice(stack * 4, Math.min(stack * 4 + 4, line.length));
            if (!isEmptyOrWhitespace(token)) {
                const crate = token.slice(1, 2) as Crate;
                floor[stack].push(crate);
            }
        });
    });

    return floor;
}

const parseMoves = (moveLines: string[]): Move[] =>
    moveLines.map((line) => {
        const [_, quantity, from, to] = /^\s*move (\d+) from (\d+) to (\d+)\s*$/g.exec(line) || [];
        return { quantity: parseInt(quantity), from: parseInt(from), to: parseInt(to) } as Move;
    });


const moveCrates = (floor: Floor, { quantity, from, to }: Move, isCrateMover9001 = false): Floor => {
    // Note stacks are 0-indexed, but moves are 1-indexed
    const [fromStack, toStack] = [floor[from - 1], floor[to - 1]];
    const crates = fromStack.splice(fromStack.length - quantity, quantity);

    // Handle part 2 where crate order is not reversed during multi-crate moves
    if (isCrateMover9001) {
        toStack.push(...crates);
    } else {
        toStack.push(...crates.reverse());
    }

    return floor;
} 

async function solve(input: string[]): Promise<unknown[]> {
    const firstEmptyLine = input.findIndex(isEmptyOrWhitespace);
    const [floorLines, moveLines] = [input.slice(0, firstEmptyLine), input.slice(firstEmptyLine + 1).filter(line => Boolean(line))];

    const moves = parseMoves(moveLines);

    // Note the use of Object.assign to create a copy of the floorLines array
    const part1Floor = parseFloor(Object.assign([], floorLines));
    const part1Final = moves.reduce((current, move) => moveCrates(current, move), part1Floor);
    const part1 = part1Final.map(stack => stack[stack.length - 1]).join('');

    const part2Floor = parseFloor(Object.assign([], floorLines));
    const part2Final = moves.reduce((current, move) => moveCrates(current, move, true), part2Floor);
    const part2 = part2Final.map(stack => stack[stack.length - 1]).join('');

    return [part1, part2];
}

export default { solve };