// @flow
import LineOfSight from '#src/player/LineOfSight';
import Player from '#src/player/Player';
import Point from '#src/object/Point';

describe('lineOfSight', () => {
    describe('()', () => {
        it('saves constructed values', () => {
            expect.assertions(2);

            const from = new Player({ name: 'a', team: 'offense' }, { center: new Point(2, 3), occlusionRadius: 3 });
            const to = new Player({ name: 'b', team: 'offense' }, { center: new Point(10, 11), occlusionRadius: 3 });
            const los = new LineOfSight(from, to);

            expect(los.from.equals(from)).toBe(true);
            expect(los.to.equals(to)).toBe(true);
        });
    });
});
