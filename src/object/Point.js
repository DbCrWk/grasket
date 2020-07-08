// @flow

class Point {
    x: number;

    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(p: Point): boolean {
        return (
            this.x === p.x
            && this.y === p.y
        );
    }
}

export default Point;
