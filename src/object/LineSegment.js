// @flow
import { errorLib as errorGn } from '../util/logger';
import Line from './Line';
import Point from './Point';
import Circle from './Circle';

const namespace = 'Object > LineSegment';
const error = errorGn(namespace);

class LineSegment {
    line: Line;

    start: Point;

    end: Point;

    constructor(line: Line, start: Point, end: Point) {
        if (
            !(line.hasPoint(start))
        ) {
            throw error('.constructor', 'Start point must be on line', { line, start, end });
        }

        if (
            !(line.hasPoint(end))
        ) {
            throw error('.constructor', 'End point must be on line', { line, start, end });
        }

        this.line = line;
        this.start = (start.x <= end.x) ? start : end;
        this.end = (start.x <= end.x) ? end : start;

        (this: any).hasPoint = this.hasPoint.bind(this);
    }

    hasPoint(p: Point): boolean {
        return (
            this.line.hasPoint(p)
            && p.x >= this.start.x
            && p.x <= this.end.x
        );
    }

    getCircleIntersectionPoints(circle: Circle): Array<Point> {
        return this.line.getCircleIntersectionPoints(circle).filter(this.hasPoint);
    }
}

export default LineSegment;
