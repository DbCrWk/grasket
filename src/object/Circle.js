// @flow

import Point from './Point';

class Circle {
    center: Point;

    radius: number;

    constructor(center: Point, radius: number) {
        this.center = center;
        this.radius = radius;
    }

    hasPoint(p: Point): boolean {
        const distanceFromRadius = this.center.euclideanDistanceTo(p);
        return distanceFromRadius <= this.radius;
    }
}

export default Circle;
