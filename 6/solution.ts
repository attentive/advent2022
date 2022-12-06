function getPairwiseMarkerIndices(markerLength: number): number[][] {
    const indices = [...Array(markerLength).keys()];
    return indices.flatMap((j) => indices.flatMap((k) => j !== k ? [[j, k]] : []));
}

function findMarker(signal: string, markerLength: number): number {
    const pairwise = getPairwiseMarkerIndices(markerLength);
    let p = 0;
    while ((p < signal.length - markerLength) && !pairwise.every(([j, k]) => signal[p + j] !== signal[p + k])) p++;

    // Problem is posed as 1-indexed and we want the index of the *last* character in each start marker
    return p + markerLength;
}

async function solve(input: string[]): Promise<unknown[]> {
    const PACKET_MARKER = 4;
    const MESSAGE_MARKER = 14;

    // No line processing in this case
    const signal = input.join('');
    
    const [part1, part2] = [findMarker(signal, PACKET_MARKER), findMarker(signal, MESSAGE_MARKER)];

    return [part1, part2];
}

export default { solve };