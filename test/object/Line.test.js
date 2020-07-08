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

    describe('.equals', () => {
        it('returns true if slope, intercept are same', () => {
            expect.assertions(1);

            const m = 1;
            const b = 2;

            const l = new Line(m, b);
            const r = new Line(m, b);

            expect(l.equals(r)).toBe(true);
        });

        it('returns false if slope, intercept are different', () => {
            expect.assertions(1);

            const l = new Line(1, 2);
            const r = new Line(3, 4);

            expect(l.equals(r)).toBe(false);
        });

        it('returns false if slope same, intercept different', () => {
            expect.assertions(1);

            const l = new Line(1, 2);
            const r = new Line(1, 4);

            expect(l.equals(r)).toBe(false);
        });

        it('returns false if slope different, intercept same', () => {
            expect.assertions(1);

            const l = new Line(1, 2);
            const r = new Line(2, 2);

            expect(l.equals(r)).toBe(false);
        });

        it('is commutative when equal', () => {
            expect.assertions(2);

            const l = new Line(1, 2);
            const r = new Line(1, 2);

            expect(l.equals(r)).toBe(true);
            expect(r.equals(l)).toBe(true);
        });

        it('is commutative when not equal', () => {
            expect.assertions(2);

            const l = new Line(1, 2);
            const r = new Line(1, 3);

            expect(l.equals(r)).toBe(false);
            expect(r.equals(l)).toBe(false);
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
