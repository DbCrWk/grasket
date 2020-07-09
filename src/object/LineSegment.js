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

        if (line.slope === Infinity) {
            this.start = (start.y <= end.y) ? start : end;
            this.end = (start.y <= end.y) ? end : start;
        } else {
            this.start = (start.x <= end.x) ? start : end;
            this.end = (start.x <= end.x) ? end : start;
        }

        (this: any).hasPoint = this.hasPoint.bind(this);
    }

    hasPoint(p: Point): boolean {
        if (this.line.slope === Infinity) {
            return (
                this.line.hasPoint(p)
                && p.y >= this.start.y
                && p.y <= this.end.y
            );
        }

        return (
            this.line.hasPoint(p)
            && p.x >= this.start.x
            && p.x <= this.end.x
        );
    }

    getCircleIntersectionPoints(circle: Circle): Array<Point> {
        const endPointsAsIntersection = [this.start, this.end].filter(circle.hasPoint.bind(circle));
        return [
            ...endPointsAsIntersection,
            ...this.line.getCircleIntersectionPoints(circle)
                .filter(this.hasPoint)
                .filter(p => !p.equals(this.start) && !p.equals(this.end)),
        ];
    }
}

export default LineSegment;
