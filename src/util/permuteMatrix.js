// @flow
function permuteMatrix<T>(matrix: Array<Array<T>>, permutation: Array<number>): Array<Array<T>> {
    return matrix.map((rr, i) => rr.map((r, j) => matrix[permutation[i]][permutation[j]]));
}

export default permuteMatrix;
