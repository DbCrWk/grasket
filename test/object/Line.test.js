// @flow
import Line from '../../src/object/Line';
import Point from '../../src/object/Point';

describe('line', () => {
    describe('()', () => {
        it('saves constructed values', () => {
            expect.assertions(2);

            const m = 1;
            const b = 2;
            const l = new Line(m, b);

            expect(l.slope).toBe(m);
            expect(l.intercept).toBe(b);
        });
    });

    describe('.byPoints', () => {
        it('throws on identical points', () => {
            expect.assertions(1);

            const a = new Point(1, 2);
            const b = new Point(1, 2);

            expect(() => Line.byPoints(a, b)).toThrow('Points cannot be identical');
        });

        it('creates a vertical line', () => {
            expect.assertions(2);

            const a = new Point(1, 2);
            const b = new Point(1, 3);
            const l = Line.byPoints(a, b);

            expect(l.slope).toBe(Infinity);
            expect(l.intercept).toBe(0);
        });

        it('creates a line', () => {
            expect.assertions(2);

            const a = new Point(1, 3);
            const b = new Point(2, 5);
            const l = Line.byPoints(a, b);

            expect(l.slope).toBe(2);
            expect(l.intercept).toBe(1);
        });
    });

    describe('.hasPoint', () => {
        it('returns true if point on line', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(2, 5);
            const l = Line.byPoints(a, b);

            expect(l.hasPoint(a)).toBe(true);
        });

        it('returns false if point not on line', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(2, 5);
            const c = new Point(2, 6);
            const l = Line.byPoints(a, b);

            expect(l.hasPoint(c)).toBe(false);
        });
    });
});
