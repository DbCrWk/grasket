// @flow
function areMatricesEqual<T>(a: Array<Array<T>>, b: Array<Array<T>>): boolean {
    return a.every((rr, i) => rr.every((r, j) => r === b[i][j]));
}

export default areMatricesEqual;
