// @flow

function within(tol: number) {
    const areFloatsEqual = (a: number, b: number): boolean => Math.abs(a - b) < tol;

    const isFloatGreaterThan = (a: number, b: number): boolean => a > b - tol;
    const isFloatGreaterThanOrEqualTo = (a: number, b: number): boolean => a >= b - tol;

    const isFloatLessThan = (a: number, b: number): boolean => a < b + tol;
    const isFloatLessThanOrEqualTo = (a: number, b: number): boolean => a <= b + tol;

    return {
        areFloatsEqual,
        isFloatGreaterThan,
        isFloatGreaterThanOrEqualTo,
        isFloatLessThan,
        isFloatLessThanOrEqualTo,
    };
}

export default within;
