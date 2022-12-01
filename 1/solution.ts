async function solve(input: string[]): Promise<number[]> {

    const foodItemsByElf = input.reduce((groups: number[][], line) => {
        if (line === '') {
            groups.push([]);
        } else {
            groups[groups.length - 1].push(Number(line));
        }
        return groups;
    }, [[]]);

    const calorieTotalsByElf = foodItemsByElf.map((foodItems) => foodItems.reduce((a, i) => a + i, 0));

    // Get the maximum calorie total carried by any elf
    const part1 = Math.max.apply(null, calorieTotalsByElf);

    // Get the sum of the three top calorie totals carried by elves
    const part2 = calorieTotalsByElf.sort((a, b) => b - a).slice(0, 3).reduce((a, i) => a + i, 0);

    return [part1, part2];
}

export default { solve };