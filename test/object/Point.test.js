// @flow
import Point from '#src/object/Point';

describe('point', () => {
    describe('()', () => {
        it('saves constructed values', () => {
            expect.assertions(2);

            const x = 1;
            const y = 2;
            const p = new Point(x, y);

            expect(p.x).toBe(x);
            expect(p.y).toBe(y);
        });
    });

    describe('.equals', () => {
        it('returns true if x, y are same', () => {
            expect.assertions(1);

            const p = new Point(1, 2);
            const o = new Point(1, 2);

            expect(p.equals(o)).toBe(true);
        });

        it('returns false if x, y are different', () => {
            expect.assertions(1);

            const p = new Point(2, 3);
            const o = new Point(1, 2);

            expect(p.equals(o)).toBe(false);
        });

        it('returns false if x same, y different', () => {
            expect.assertions(1);

            const p = new Point(1, 3);
            const o = new Point(1, 2);

            expect(p.equals(o)).toBe(false);
        });

        it('returns false if x different, y same', () => {
            expect.assertions(1);

            const p = new Point(2, 2);
            const o = new Point(1, 2);

            expect(p.equals(o)).toBe(false);
        });

        it('is commutative when equal', () => {
            expect.assertions(2);

            const p = new Point(1, 2);
            const o = new Point(1, 2);

            expect(p.equals(o)).toBe(true);
            expect(o.equals(p)).toBe(true);
        });

        it('is commutative when not equal', () => {
            expect.assertions(2);

            const p = new Point(1, 2);
            const o = new Point(1, 3);

            expect(p.equals(o)).toBe(false);
            expect(o.equals(p)).toBe(false);
        });
    });

    describe('.euclideanDistanceTo', () => {
        it('returns 0 for the same point', () => {
            expect.assertions(1);

            const x = 1;
            const y = 2;
            const p = new Point(x, y);
            const q = new Point(x, y);

            expect(p.euclideanDistanceTo(q)).toStrictEqual(0);
        });

        it('returns correct value for different point', () => {
            expect.assertions(2);

            const p = new Point(0, 0);
            const q = new Point(0, 1);

            const r = new Point(2, 5);
            const s = new Point(6, 2);

            expect(p.euclideanDistanceTo(q)).toBe(1);
            expect(r.euclideanDistanceTo(s)).toBe(5);
        });
    });
});
