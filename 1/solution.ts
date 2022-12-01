async function solve(input: string[]): Promise<number[]> {

    const caloriesByElf = input.reduce((elves: number[][], calories) => {
        if (calories === '') {
            elves.push([]);
        } else {
            const elf = elves[elves.length - 1];
            const caloriesForFoodItem = Number(calories);
            elf.push(caloriesForFoodItem);
        }
        return elves;
    }, [[]]);

    const calorieTotalsByElf = caloriesByElf.map((elfCalories) => elfCalories.reduce((a, i) => a + i, 0));

    // Get the maximum calorie total carried by any elf
    const part1 = Math.max.apply(null, calorieTotalsByElf);

    // Get the sum of the three top calorie totals carried by elves
    const part2 = calorieTotalsByElf.sort((a, b) => b - a).slice(0, 3).reduce((a, i) => a + i, 0);

    return [part1, part2];
}

export default { solve };