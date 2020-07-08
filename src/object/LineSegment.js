// @flow
import { errorLib as errorGn } from '../util/logger';
import Line from './Line';
import Point from './Point';

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
        this.start = start;
        this.end = end;
    }
}

export default LineSegment;
