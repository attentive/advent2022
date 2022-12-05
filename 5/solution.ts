/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { isEmptyOrWhitespace } from "../utils";

type Crate = string;
type Stack = Crate[];
type Floor = Stack[];

type Move = {
    quantity: number;
    from: number;
    to: number;
};

function parseFloor(floorLines: string[]): Floor {
    // Read stacks from bottom to top
    floorLines = floorLines.reverse();

    // Get the number of crate stacks from the first line which has the form `1 2 3 … N`
    const stackCount = floorLines[0].match(/\d+/g)!.length;

    // Create empty Floor - note the use of .from, not .fill
    const floor: Floor = [...Array(stackCount)].map(() => [] as Stack);

    // Load crates into Floor structure
    floorLines.slice(1).forEach((line) => {

        // Lines that look like eg `[H] [W]     [P] [W]     [H] [N] [N]`
        line.match(/(\[([A-Z])\] ?|(\s{3,4}))/g)!.forEach((crate, stack) => {
            if (!isEmptyOrWhitespace(crate)) {
                floor[stack].push(crate.slice(1, 2)); // `H`,`W` etc
            }
        });
    });

    return floor;
}

function parseCraneMoves(moveLines: string[]): Move[] {
    return moveLines.map((line) => {
        const [quantity, from, to] = line.match(/\d+/g)!.map(Number);
        return { quantity, from, to } as Move;
    });
}

function moveCrates(floor: Floor, { quantity, from, to }: Move, isCrateMover9001 = false): Floor {
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

    const moves = parseCraneMoves(moveLines);

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