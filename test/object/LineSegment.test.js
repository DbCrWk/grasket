// @flow
import Line from '../../src/object/Line';
import LineSegment from '../../src/object/LineSegment';
import Point from '../../src/object/Point';
import Circle from '../../src/object/Circle';

describe('line', () => {
    describe('()', () => {
        it('saves constructed values for valid line segment', () => {
            expect.assertions(3);

            const m = 1;
            const b = 2;
            const line = new Line(m, b);
            const start = new Point(0, 2);
            const end = new Point(1, 3);

            const s = new LineSegment(line, start, end);

            expect(s.line).toBe(line);
            expect(s.start).toBe(start);
            expect(s.end).toBe(end);
        });

        it('saves constructed values for vertical valid line segment', () => {
            expect.assertions(3);

            const m = Infinity;
            const b = 2;
            const line = new Line(m, b);
            const start = new Point(2, 0);
            const end = new Point(2, 2);

            const s = new LineSegment(line, start, end);

            expect(s.line).toBe(line);
            expect(s.start).toBe(start);
            expect(s.end).toBe(end);
        });

        it('saves constructed values for valid line segment with inverted start/end', () => {
            expect.assertions(3);

            const m = 1;
            const b = 2;
            const line = new Line(m, b);
            const start = new Point(1, 3);
            const end = new Point(0, 2);

            const s = new LineSegment(line, start, end);

            expect(s.line).toBe(line);
            expect(s.end).toBe(start);
            expect(s.start).toBe(end);
        });

        it('saves constructed values for valid vertical line segment with inverted start/end', () => {
            expect.assertions(3);

            const m = Infinity;
            const b = 2;
            const line = new Line(m, b);
            const start = new Point(2, 2);
            const end = new Point(2, 0);

            const s = new LineSegment(line, start, end);

            expect(s.line).toBe(line);
            expect(s.end).toBe(start);
            expect(s.start).toBe(end);
        });

        it('throws for invalid line segment (start not on line)', () => {
            expect.assertions(1);

            const m = 1;
            const b = 2;
            const line = new Line(m, b);
            const start = new Point(0, 3);
            const end = new Point(1, 3);

            expect(() => new LineSegment(line, start, end)).toThrow('Start point must be on line');
        });

        it('throws for invalid line segment (end not on line)', () => {
            expect.assertions(1);

            const m = 1;
            const b = 2;
            const line = new Line(m, b);
            const start = new Point(1, 3);
            const end = new Point(1, 4);

            expect(() => new LineSegment(line, start, end)).toThrow('End point must be on line');
        });
    });

    describe('.hasPoint', () => {
        it('returns true if point in line segment (start)', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(2, 5);
            const l = Line.byPoints(a, b);
            const s = new LineSegment(l, a, b);

            expect(s.hasPoint(a)).toBe(true);
        });

        it('returns true if point in line segment (end)', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(2, 5);
            const l = Line.byPoints(a, b);
            const s = new LineSegment(l, a, b);

            expect(s.hasPoint(b)).toBe(true);
        });

        it('returns true if point in line segment (interior)', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const c = new Point(3 / 2, 4);
            const b = new Point(2, 5);
            const l = Line.byPoints(a, b);
            const s = new LineSegment(l, a, b);

            expect(s.hasPoint(c)).toBe(true);
        });

        it('returns false if point not on line', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(2, 5);
            const c = new Point(0, 0);
            const l = Line.byPoints(a, b);
            const s = new LineSegment(l, a, b);

            expect(s.hasPoint(c)).toBe(false);
        });

        it('returns false if point on line, before start', () => {
            expect.assertions(1);

            const c = new Point(0, 1);
            const a = new Point(1, 3);
            const b = new Point(2, 5);
            const l = Line.byPoints(a, b);
            const s = new LineSegment(l, a, b);

            expect(s.hasPoint(c)).toBe(false);
        });

        it('returns false if point on line, after end', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(2, 5);
            const c = new Point(3, 7);
            const l = Line.byPoints(a, b);
            const s = new LineSegment(l, a, b);

            expect(s.hasPoint(c)).toBe(false);
        });

        it('returns true if point in vertical line segment (start)', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(1, 5);
            const l = Line.byPoints(a, b);
            const s = new LineSegment(l, a, b);

            expect(s.hasPoint(a)).toBe(true);
        });

        it('returns true if point in vertical line segment (end)', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(1, 5);
            const l = Line.byPoints(a, b);
            const s = new LineSegment(l, a, b);

            expect(s.hasPoint(b)).toBe(true);
        });

        it('returns true if point in vertical line segment (interior)', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const c = new Point(1, 4);
            const b = new Point(1, 5);
            const l = Line.byPoints(a, b);
            const s = new LineSegment(l, a, b);

            expect(s.hasPoint(c)).toBe(true);
        });

        it('returns false if point not on vertical line', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(1, 5);
            const c = new Point(0, 0);
            const l = Line.byPoints(a, b);
            const s = new LineSegment(l, a, b);

            expect(s.hasPoint(c)).toBe(false);
        });

        it('returns false if point on vertical line, before start', () => {
            expect.assertions(1);

            const c = new Point(1, 1);
            const a = new Point(1, 3);
            const b = new Point(1, 5);
            const l = Line.byPoints(a, b);
            const s = new LineSegment(l, a, b);

            expect(s.hasPoint(c)).toBe(false);
        });

        it('returns false if point on vertical line, after end', () => {
            expect.assertions(1);

            const a = new Point(1, 3);
            const b = new Point(1, 5);
            const c = new Point(1, 7);
            const l = Line.byPoints(a, b);
            const s = new LineSegment(l, a, b);

            expect(s.hasPoint(c)).toBe(false);
        });
    });

    describe('.getCircleIntersectionPoints', () => {
        it('returns empty for no intersection on line', () => {
            expect.assertions(1);

            const line = new Line(1, 0);
            const circle = new Circle(new Point(0, 10), 1);

            expect(line.getCircleIntersectionPoints(circle)).toStrictEqual([]);
        });

        it('returns empty for no intersection on line, but outside segment', () => {
            expect.assertions(1);

            const line = new Line(1, 0);
            const circle = new Circle(new Point(2, 2), Math.sqrt(2));
            const segment = new LineSegment(line, new Point(5, 5), new Point(6, 6));

            expect(segment.getCircleIntersectionPoints(circle)).toStrictEqual([]);
        });

        it('returns one end point and one internal point for two intersections on line, but one outside segment', () => {
            expect.assertions(3);

            const line = new Line(1, 0);
            const circle = new Circle(new Point(2, 2), Math.sqrt(2));
            const segment = new LineSegment(line, new Point(2, 2), new Point(6, 6));

            const arrP = segment.getCircleIntersectionPoints(circle);
            expect(arrP).toHaveLength(2);

            const [p, q] = arrP;
            const intersectionP = new Point(2, 2);
            const intersectionQ = new Point(3, 3);
            expect(p.equals(intersectionP)).toBe(true);
            expect(q.equals(intersectionQ)).toBe(true);
        });

        it('returns both end points when segment contained in circle', () => {
            expect.assertions(3);

            const line = new Line(1, 0);
            const circle = new Circle(new Point(2, 2), Math.sqrt(2));
            const segment = new LineSegment(line, new Point(2, 2), new Point(3, 3));

            const arrP = segment.getCircleIntersectionPoints(circle);
            expect(arrP).toHaveLength(2);

            const [p, q] = arrP;
            const intersectionP = new Point(2, 2);
            const intersectionQ = new Point(3, 3);
            expect(p.equals(intersectionP)).toBe(true);
            expect(q.equals(intersectionQ)).toBe(true);
        });

        it('returns two points for two intersections on line, inside segment', () => {
            expect.assertions(3);

            const line = new Line(1, 0);
            const circle = new Circle(new Point(2, 2), Math.sqrt(2));
            const segment = new LineSegment(line, new Point(1 / 2, 1 / 2), new Point(6, 6));

            const arrP = segment.getCircleIntersectionPoints(circle);
            expect(arrP).toHaveLength(2);

            const [p, q] = arrP;
            const intersectionP = new Point(1, 1);
            const intersectionQ = new Point(3, 3);

            expect(p.equals(intersectionP)).toBe(true);
            expect(q.equals(intersectionQ)).toBe(true);
        });
    });
});
