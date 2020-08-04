// @flow
type PermutationType = Array<number>;
function permutationBuilderHelper(
    currentPermutations: Array<PermutationType>,
    limit: number,
    depth: number,
) {
    if (depth === limit) return currentPermutations;

    const updatedPermutations = currentPermutations
        .map(
            p => {
                const next: Array<number> = (new Array(limit))
                    .fill(0)
                    .reduce((prev, curr, i) => (p.includes(i) ? prev : [...prev, i]), []);
                return next.map(n => [...p, n]);
            },
        ).reduce((a, b) => [...a, ...b], []);
    return permutationBuilderHelper(updatedPermutations, limit, depth + 1);
}

function permutationBuilder(limit: number): Array<PermutationType> {
    return permutationBuilderHelper([[]], limit, 0);
}

export default permutationBuilder;
