// @flow
function fixpointPermutationBuilder(fixIndex: number, fixPoint: number) {
    function helper(permutation: Array<number>): Array<number> {
        const firstHalf = permutation.slice(0, fixIndex);
        const secondHalf = permutation.slice(fixIndex, permutation.length);

        const newPermutation = [...firstHalf, null, ...secondHalf];
        return newPermutation.map(el => {
            if (el === null) return fixPoint;
            if (el >= fixPoint) return el + 1;
            return el;
        });
    }

    return helper;
}

export default fixpointPermutationBuilder;
