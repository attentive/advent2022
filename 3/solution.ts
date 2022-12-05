type Rucksack = {
    first: string[],
    second: string[]
};

const getUniqueSharedItems = (rucksack: Rucksack): string[] => [...new Set(rucksack.first.filter((item) => rucksack.second.includes(item)))];

const itemPriority = (itemType: string): number => {
    const code = itemType.charCodeAt(0);
    if (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0)) return 26 + (code - 'A'.charCodeAt(0)) + 1;
    else if (code >= 'a'.charCodeAt(0) && code <= 'z'.charCodeAt(0)) return (code - 'a'.charCodeAt(0)) + 1;
    else throw new Error(`Invalid item type: ${itemType}`);
}

async function solve(input: string[]): Promise<number[]> {

    const rucksacks = input.map((line) => ({ first: Array.from(line.slice(0, line.length / 2)), second: Array.from(line.slice(line.length / 2)) }) as Rucksack);

    const sharedItems = rucksacks.flatMap(getUniqueSharedItems);

    const part1TotalItemPriorities = sharedItems.reduce((acc, itemType) => acc + itemPriority(itemType), 0);
    return [part1TotalItemPriorities];
}

export default { solve };