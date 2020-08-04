// @flow
import Circle from '#src/object/Circle';
import Point from '#src/object/Point';

describe('circle', () => {
    describe('()', () => {
        it('saves constructed values', () => {
            expect.assertions(2);

            const p = new Point(1, 2);
            const r = 2;
            const c = new Circle(p, r);

            expect(c.center).toBe(p);
            expect(c.radius).toBe(r);
        });
    });

    describe('.hasPoint', () => {
        it('returns true for point in interior', () => {
            expect.assertions(1);

            const p = new Point(1, 2);
            const r = 2;
            const c = new Circle(p, r);
            const q = new Point(1, 1);

            expect(c.hasPoint(q)).toBe(true);
        });

        it('returns true for point on boundary', () => {
            expect.assertions(1);

            const p = new Point(1, 2);
            const r = 2;
            const c = new Circle(p, r);
            const q = new Point(1, 0);

            expect(c.hasPoint(q)).toBe(true);
        });

        it('returns false for point outside', () => {
            expect.assertions(1);

            const p = new Point(1, 2);
            const r = 2;
            const c = new Circle(p, r);
            const q = new Point(1, -1);

            expect(c.hasPoint(q)).toBe(false);
        });
    });

    describe('.equals', () => {
        it('returns true if center, radius are same', () => {
            expect.assertions(1);

            const a = new Circle(new Point(1, 2), 12);
            const b = new Circle(new Point(1, 2), 12);

            expect(a.equals(b)).toBe(true);
        });

        it('returns false if center, radius are different', () => {
            expect.assertions(1);

            const a = new Circle(new Point(1, 3), 11);
            const b = new Circle(new Point(1, 2), 12);

            expect(a.equals(b)).toBe(false);
        });

        it('returns false if center same, radius different', () => {
            expect.assertions(1);

            const a = new Circle(new Point(1, 2), 12);
            const b = new Circle(new Point(1, 2), 11);

            expect(a.equals(b)).toBe(false);
        });

        it('returns false if center different, radius same', () => {
            expect.assertions(1);

            const a = new Circle(new Point(1, 2), 12);
            const b = new Circle(new Point(1, 3), 12);

            expect(a.equals(b)).toBe(false);
        });

        it('is commutative when equal', () => {
            expect.assertions(2);

            const a = new Circle(new Point(1, 2), 12);
            const b = new Circle(new Point(1, 2), 12);

            expect(a.equals(b)).toBe(true);
            expect(b.equals(a)).toBe(true);
        });

        it('is commutative when not equal', () => {
            expect.assertions(2);

            const a = new Circle(new Point(1, 2), 12);
            const b = new Circle(new Point(1, 3), 12);

            expect(a.equals(b)).toBe(false);
            expect(b.equals(a)).toBe(false);
        });
    });
});
