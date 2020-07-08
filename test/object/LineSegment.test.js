// @flow
import Line from '../../src/object/Line';
import LineSegment from '../../src/object/LineSegment';
import Point from '../../src/object/Point';

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
});
