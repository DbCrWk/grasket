// @flow

import Point from './Point';

class Circle {
    center: Point;

    radius: number;

    constructor(center: Point, radius: number) {
        this.center = center;
        this.radius = radius;
    }
}

export default Circle;
