// @flow
import within from '#src/util/within';

describe('within', () => {
    describe('.areFloatsEqual', () => {
        const { areFloatsEqual } = within(0.001);

        it('returns true when actually equal', () => {
            expect.assertions(1);

            const a = 0.21345;
            const b = 0.21345;

            expect(areFloatsEqual(a, b)).toBe(true);
        });

        it('returns true when within tolerance', () => {
            expect.assertions(1);

            const a = 0.21345;
            const b = 0.21346;

            expect(areFloatsEqual(a, b)).toBe(true);
        });

        it('returns false when outside tolerance', () => {
            expect.assertions(1);

            const a = 0.21345;
            const b = 0.31345;

            expect(areFloatsEqual(a, b)).toBe(false);
        });
    });

    describe('.isFloatGreaterThan', () => {
        const { isFloatGreaterThan } = within(0.001);

        it('returns true when actually greater than', () => {
            expect.assertions(1);

            const a = 0.21346;
            const b = 0.21345;

            expect(isFloatGreaterThan(a, b)).toBe(true);
        });

        it('returns true when within tolerance', () => {
            expect.assertions(1);

            const a = 0.21345;
            const b = 0.21345;

            expect(isFloatGreaterThan(a, b)).toBe(true);
        });

        it('returns false when outside tolerance', () => {
            expect.assertions(1);

            const a = 0.20344;
            const b = 0.31345;

            expect(isFloatGreaterThan(a, b)).toBe(false);
        });
    });

    describe('.isFloatGreaterThanOrEqualTo', () => {
        const { isFloatGreaterThanOrEqualTo } = within(0.001);

        it('returns true when actually greater than', () => {
            expect.assertions(1);

            const a = 0.21346;
            const b = 0.21345;

            expect(isFloatGreaterThanOrEqualTo(a, b)).toBe(true);
        });

        it('returns true when within tolerance', () => {
            expect.assertions(1);

            const a = 0.21345;
            const b = 0.21345;

            expect(isFloatGreaterThanOrEqualTo(a, b)).toBe(true);
        });

        it('returns false when outside tolerance', () => {
            expect.assertions(1);

            const a = 0.20344;
            const b = 0.31345;

            expect(isFloatGreaterThanOrEqualTo(a, b)).toBe(false);
        });
    });

    describe('.isFloatLessThan', () => {
        const { isFloatLessThan } = within(0.001);

        it('returns true when actually less than', () => {
            expect.assertions(1);

            const b = 0.21346;
            const a = 0.21345;

            expect(isFloatLessThan(a, b)).toBe(true);
        });

        it('returns true when within tolerance', () => {
            expect.assertions(1);

            const b = 0.21345;
            const a = 0.21345;

            expect(isFloatLessThan(a, b)).toBe(true);
        });

        it('returns false when outside tolerance', () => {
            expect.assertions(1);

            const b = 0.20344;
            const a = 0.31345;

            expect(isFloatLessThan(a, b)).toBe(false);
        });
    });

    describe('.isFloatLessThanOrEqualTo', () => {
        const { isFloatLessThanOrEqualTo } = within(0.001);

        it('returns true when actually less than', () => {
            expect.assertions(1);

            const b = 0.21346;
            const a = 0.21345;

            expect(isFloatLessThanOrEqualTo(a, b)).toBe(true);
        });

        it('returns true when within tolerance', () => {
            expect.assertions(1);

            const b = 0.21345;
            const a = 0.21345;

            expect(isFloatLessThanOrEqualTo(a, b)).toBe(true);
        });

        it('returns false when outside tolerance', () => {
            expect.assertions(1);

            const b = 0.20344;
            const a = 0.31345;

            expect(isFloatLessThanOrEqualTo(a, b)).toBe(false);
        });
    });
});
