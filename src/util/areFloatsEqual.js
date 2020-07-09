// @flow

function areFloatsEqualGn(tol: number) {
    return (a: number, b: number): boolean => Math.abs(a - b) < tol;
}

export default areFloatsEqualGn;
