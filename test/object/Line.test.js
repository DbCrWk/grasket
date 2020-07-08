// @flow
import Line from '../../src/object/Line';
import Point from '../../src/object/Point';
import Circle from '../../src/object/Circle';

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
            expect(l.intercept).toBe(1);
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

        it('returns true if point on vertical line', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(1, 5);
            const l = Line.byPoints(a, b);

            expect(l.hasPoint(a)).toBe(true);
        });

        it('returns false if point not on vertical line', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(1, 5);
            const c = new Point(2, 6);
            const l = Line.byPoints(a, b);

            expect(l.hasPoint(c)).toBe(false);
        });
    });

    describe('.getPerpendicular', () => {
        it('returns correct perpendicular line', () => {
            expect.assertions(4);

            const a = new Point(1, 3);
            const b = new Point(2, 5);
            const l = Line.byPoints(a, b);

            const c = new Point(4, 4);
            const d = new Point(6, 3);
            const r = l.getPerpendicular(c);

            expect(r.slope).toBe(-1 / 2);
            expect(r.intercept).toBe(6);
            expect(r.hasPoint(c)).toBe(true);
            expect(r.hasPoint(d)).toBe(true);
        });

        it('returns vertical line when appropriate', () => {
            expect.assertions(3);

            const a = new Point(1, 3);
            const b = new Point(2, 3);
            const l = Line.byPoints(a, b);

            const c = new Point(0, 0);
            const r = l.getPerpendicular(c);

            expect(r.slope).toBe(Infinity);
            expect(r.intercept).toBe(0);
            expect(r.hasPoint(c)).toBe(true);
        });

        it('returns horizontal line when appropriate', () => {
            expect.assertions(3);

            const a = new Point(1, 3);
            const b = new Point(1, 5);
            const l = Line.byPoints(a, b);

            const c = new Point(4, 4);
            const r = l.getPerpendicular(c);

            expect(r.slope).toBe(0);
            expect(r.intercept).toBe(4);
            expect(r.hasPoint(c)).toBe(true);
        });
    });

    describe('.getLineIntersectionPoint', () => {
        it('returns correct intersection pint', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(2, 5);
            const l = Line.byPoints(a, b);

            const c = new Point(4, 4);
            const r = l.getPerpendicular(c);

            const p = l.getLineIntersectionPoint(r);
            const i = new Point(2, 5);
            expect(p.equals(i)).toBe(true);
        });

        it('return origin when lines are the same', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(2, 5);
            const l = Line.byPoints(a, b);

            const p = l.getLineIntersectionPoint(l);
            const i = new Point(0, 0);
            expect(p.equals(i)).toBe(true);
        });

        it('throws when lines are parallel', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(2, 5);
            const l = Line.byPoints(a, b);

            const c = new Point(1, 4);
            const d = new Point(2, 6);
            const r = Line.byPoints(c, d);

            expect(() => l.getLineIntersectionPoint(r)).toThrow('Lines are parallel, but not equal and do not have an intersection point');
        });
    });

    describe('.getClosestPoint', () => {
        it('returns the closest point to circle', () => {
            expect.assertions(1);

            const l = new Line(1, 0);
            const c = new Point(4, 2);

            const p = l.getClosestPoint(c);
            const q = new Point(3, 3);

            expect(p.equals(q)).toBe(true);
        });
    });

    describe('.getCircleClosestPoint', () => {
        it('returns the closest point to circle', () => {
            expect.assertions(1);

            const l = new Line(1, 0);
            const c = new Circle(new Point(4, 2), 1);

            const p = l.getCircleClosestPoint(c);
            const q = new Point(3, 3);

            expect(p.equals(q)).toBe(true);
        });
    });
});
