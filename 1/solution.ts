async function solve(input: string[]) {

    const foodItemsByElf = input.reduce((groups: number[][], line) => {
        if (line === '') {
            groups.push([]);
        } else {
            groups[groups.length - 1].push(Number(line));
        }
        return groups;
    }, [[]]);

    const calorieTotalsByElf = foodItemsByElf.map((foodItems) => foodItems.reduce((a, i) => a + i, 0));

    return Math.max.apply(null, calorieTotalsByElf);
}

export default { solve };