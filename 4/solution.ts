async function solve(input: string[]): Promise<number[]> {
    // Note we need to filter that empty last line of the input …
    const parsedInput = input.filter(line => Boolean(line))
        .map(line => /(\d+)-(\d+),(\d+)-(\d+)/.exec(line) || []) // 31-31,32-40
        .map(([_, l1, u1, l2, u2]) => [[parseInt(l1), parseInt(u1)], [parseInt(l2), parseInt(u2)]]); // [[31, 31], [32, 40]]
        
    const completeOverlaps = parsedInput.filter(([[l1, u1], [l2, u2]]) => (l1 <= l2 && u1 >= u2) || (l2 <= l1 && u2 >= u1));

    const part1 = completeOverlaps.length;

    const partialOverlaps = parsedInput.filter(([[l1, u1], [l2, u2]]) => (l1 <= l2 && u1 >= l2) || (l2 <= l1 && u2 >= l1));

    const part2 = partialOverlaps.length;

    return [part1, part2];
}

export default { solve };