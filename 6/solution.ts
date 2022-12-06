async function solve(input: string[]): Promise<unknown[]> {
    const signal = input.join('');
    const marker = [0, 1, 2, 3];
    const pairwise = marker.flatMap((j) => marker.flatMap((k) => j !== k ? [[j, k]] : []));

    let i = 0;
    while ((i < signal.length - marker.length) && !pairwise.every(([j, k]) => signal[i + j] !== signal[i + k])) i++;

    // Problem is posed as 1-indexed and we want the index of the *last* character in the start marker
    const part1 = i + marker.length;
    return [part1];
}

export default { solve };