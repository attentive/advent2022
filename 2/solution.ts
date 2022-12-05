// Items in the game
enum Item {
    Rock = 1,
    Paper = 2,
    Scissors = 3
}

// Decode 1up and 2up's moves into Items
const p1Item = (move: string ): Item => <Item>(move.charCodeAt(0) - 'A'.charCodeAt(0) + 1); 
const p2Item = (move: string ): Item => <Item>(move.charCodeAt(0) - 'X'.charCodeAt(0) + 1);

// Scores for possible results
const SCORES = {
    [Item.Rock]: {
        [Item.Rock]: 3,
        [Item.Paper]: 6,
        [Item.Scissors]: 0
    },
    [Item.Paper]: {
        [Item.Rock]: 0,
        [Item.Paper]: 3,
        [Item.Scissors]: 6
    },
    [Item.Scissors]: {
        [Item.Rock]: 6,
        [Item.Paper]: 0,
        [Item.Scissors]: 3
    },
};

async function solve(input: string[]): Promise<number[]> {

    // Note we need to filter that empty last line of the input …
    const strategyGuide = input.map(round => /([A-C]) ([X-Z])/.exec(round) || [])
        .filter(([_, m1, m2]) => m1 && m2)
        .map(([_, m1, m2]) => ({ p1: p1Item(m1), p2: p2Item(m2) }));

    const totalScore = strategyGuide.reduce((score, { p1, p2 }) => score + SCORES[p1][p2] + p2, 0);
    return [totalScore];
}

export default { solve };