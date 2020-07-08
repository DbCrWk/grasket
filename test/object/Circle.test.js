// @flow
import Circle from '../../src/object/Circle';
import Point from '../../src/object/Point';

describe('circle', () => {
    describe('()', () => {
        it('saves constructed values', () => {
            expect.assertions(2);

            const p = new Point(1, 2);
            const r = 2;
            const c = new Circle(p, r);

            expect(c.center).toBe(p);
            expect(c.radius).toBe(r);
        });
    });
});
