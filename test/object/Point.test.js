// @flow
import Point from '../../src/object/Point';

describe('point', () => {
    describe('()', () => {
        it('saves constructed values', () => {
            expect.assertions(2);

            const x = 1;
            const y = 2;
            const p = new Point(x, y);

            expect(p.x).toBe(x);
            expect(p.y).toBe(y);
        });
    });
});
