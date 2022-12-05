// Items in the game
enum Item {
    Rock = 1,
    Paper = 2,
    Scissors = 3
}

enum Score {
    Lose = 0,
    Draw = 1,
    Win = 2
}

// Decode 1up and 2up's moves (or required score) into Items (or a Score)
const p1Item = (move: string ): Item => <Item>(move.charCodeAt(0) - 'A'.charCodeAt(0) + 1); 
const p2Item = (move: string ): Item => <Item>(move.charCodeAt(0) - 'X'.charCodeAt(0) + 1);
const p2Score = (score: string): Score => <Score>(score.charCodeAt(0) - 'X'.charCodeAt(0));

// Scores for possible results
const PART1_SCORES = {
    [Item.Rock]: {
        [Item.Rock]: Score.Draw,
        [Item.Paper]: Score.Win,
        [Item.Scissors]: Score.Lose
    },
    [Item.Paper]: {
        [Item.Rock]: Score.Lose,
        [Item.Paper]: Score.Draw,
        [Item.Scissors]: Score.Win
    },
    [Item.Scissors]: {
        [Item.Rock]: Score.Win,
        [Item.Paper]: Score.Lose,
        [Item.Scissors]: Score.Draw
    },
};

const PART2_ITEMS = {
    [Item.Rock]: {
        [Score.Lose]: Item.Scissors,
        [Score.Draw]: Item.Rock,
        [Score.Win]: Item.Paper
    },
    [Item.Paper]: {
        [Score.Lose]: Item.Rock,
        [Score.Draw]: Item.Paper,
        [Score.Win]: Item.Scissors
    },
    [Item.Scissors]: {
        [Score.Lose]: Item.Paper,
        [Score.Draw]: Item.Scissors,
        [Score.Win]: Item.Rock
    }
};


async function solve(input: string[]): Promise<number[]> {

    // Note we need to filter that empty last line of the input …
    const filteredInput = input.map(round => /([A-C]) ([X-Z])/.exec(round) || [])
        .filter(([_, m1, m2]) => m1 && m2);

    const part1StrategyGuide = filteredInput
        .map(([_, m1, m2]) => ({ i1: p1Item(m1), i2: p2Item(m2) }));

    const part1Score = part1StrategyGuide.reduce((score, { i1: p1, i2: p2 }) => score + 3 * PART1_SCORES[p1][p2] + p2, 0);

    const part2StrategyGuide = filteredInput
        .map(([_, m1, m2]) => ({ i1: p1Item(m1), s2: p2Score(m2) }));

    const part2Score = part2StrategyGuide.reduce((score, { i1: p1, s2 }) => {
        // Convert strategy guide entry to required 2up move
        const p2 = PART2_ITEMS[p1][s2];
        return score + 3 * PART1_SCORES[p1][p2] + p2;
    }, 0);

    return [part1Score, part2Score];
}

export default { solve };