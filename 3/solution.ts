type Rucksack = {
    whole: string[],
    first: string[],
    second: string[]
};

const inBoth = (c1: string[], c2: string[]): string[] => [...new Set(c1.filter((item) => c2.includes(item)))];
const inBothCompartments = (rucksack: Rucksack): string[] => inBoth(rucksack.first, rucksack.second);
const inAllThreeRucksacks = ([r1, r2, r3]: Rucksack[]): string[] => inBoth(inBoth(r1.whole, r2.whole), r3.whole);

const itemPriority = (itemType: string): number => {
    const code = itemType.charCodeAt(0);
    if (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0)) return 26 + (code - 'A'.charCodeAt(0)) + 1;
    else if (code >= 'a'.charCodeAt(0) && code <= 'z'.charCodeAt(0)) return (code - 'a'.charCodeAt(0)) + 1;
    else throw new Error(`Invalid item type: ${itemType}`);
}

async function solve(input: string[]): Promise<unknown[]> {

    const rucksacks = input.filter(line => line)
        .map((line) => ({
            whole: Array.from(line),
            first: Array.from(line.slice(0, line.length / 2)),
            second: Array.from(line.slice(line.length / 2))
        }) as Rucksack);

    const sharedItems = rucksacks.flatMap(inBothCompartments);
    const part1TotalItemPriorities = sharedItems.reduce((acc, itemType) => acc + itemPriority(itemType), 0);

    const part2Groups = [...Array(rucksacks.length / 3).keys()].map((i) => rucksacks.slice(i * 3, i * 3 + 3));
    const part2Badges = part2Groups.flatMap(inAllThreeRucksacks);
    const part2TotalBadgePriorites = part2Badges.reduce((acc, itemType) => acc + itemPriority(itemType), 0);

    return [part1TotalItemPriorities, part2TotalBadgePriorites];
}

export default { solve };