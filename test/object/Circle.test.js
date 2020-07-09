// @flow
import Circle from '../../src/object/Circle';
import Point from '../../src/object/Point';

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
});
