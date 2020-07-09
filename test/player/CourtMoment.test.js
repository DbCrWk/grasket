// @flow
import CourtMoment from '../../src/player/CourtMoment';
import Player from '../../src/player/Player';
import Point from '../../src/object/Point';

describe('courtMoment', () => {
    describe('()', () => {
        it('saves constructed values', () => {
            expect.assertions(3);

            const time = 1488326678428;
            const offense = [
                new Player({ name: 'a', team: 'offense' }, { center: new Point(47.95466, 22.76138), occlusionRadius: 3 }),
                new Player({ name: 'b', team: 'offense' }, { center: new Point(47.95466, 22.76139), occlusionRadius: 3 }),
                new Player({ name: 'c', team: 'offense' }, { center: new Point(57.88482, 22.29812), occlusionRadius: 3 }),
                new Player({ name: 'd', team: 'offense' }, { center: new Point(58.87267, 24.03082), occlusionRadius: 3 }),
                new Player({ name: 'e', team: 'offense' }, { center: new Point(47.7704, 22.76371), occlusionRadius: 3 }),
            ];
            const defense = [
                new Player({ name: 'u', team: 'defense' }, { center: new Point(57.89381, 22.26358), occlusionRadius: 3 }),
                new Player({ name: 'v', team: 'defense' }, { center: new Point(47.7704, 22.76371), occlusionRadius: 3 }),
                new Player({ name: 'x', team: 'defense' }, { center: new Point(98.93821, 48.96145), occlusionRadius: 3 }),
                new Player({ name: 'y', team: 'defense' }, { center: new Point(58.87267, 24.03082), occlusionRadius: 3 }),
                new Player({ name: 'z', team: 'defense' }, { center: new Point(47.95466, 22.76138), occlusionRadius: 3 }),
            ];

            const m = new CourtMoment(time, offense, defense);

            expect(m.time).toStrictEqual(time);
            expect(m.offense).toStrictEqual(offense);
            expect(m.defense).toStrictEqual(defense);
        });
    });

    describe('.getOcclusionNetwork', () => {
        it('correctly computes occlusion network', () => {
            expect.assertions(1);

            const offense = [
                new Player({ name: 'a', team: 'offense' }, { center: new Point(47.95466, 22.76138), occlusionRadius: 3 }),
                new Player({ name: 'b', team: 'offense' }, { center: new Point(47.95466, 22.76139), occlusionRadius: 3 }),
                new Player({ name: 'c', team: 'offense' }, { center: new Point(57.88482, 22.29812), occlusionRadius: 3 }),
                new Player({ name: 'd', team: 'offense' }, { center: new Point(58.87267, 24.03082), occlusionRadius: 3 }),
                new Player({ name: 'e', team: 'offense' }, { center: new Point(47.7704, 22.76371), occlusionRadius: 3 }),
            ];

            const defense = [
                new Player({ name: 'u', team: 'defense' }, { center: new Point(57.89381, 22.26358), occlusionRadius: 3 }),
                new Player({ name: 'v', team: 'defense' }, { center: new Point(47.7704, 22.76371), occlusionRadius: 3 }),
                new Player({ name: 'x', team: 'defense' }, { center: new Point(98.93821, 48.96145), occlusionRadius: 3 }),
                new Player({ name: 'y', team: 'defense' }, { center: new Point(58.87267, 24.03082), occlusionRadius: 3 }),
                new Player({ name: 'z', team: 'defense' }, { center: new Point(47.95466, 22.76138), occlusionRadius: 3 }),
            ];

            const courtMoment = new CourtMoment(1488326678428, offense, defense);
            const occlusionNetwork = courtMoment.getOcclusionNetwork();

            expect(occlusionNetwork).toStrictEqual([
                [true, false, false, false, false],
                [false, true, false, false, false],
                [false, false, true, false, false],
                [false, false, false, true, false],
                [false, false, false, false, true],
            ]);
        });

        it('is symmetric', () => {
            expect.assertions(25);

            const offense = [
                new Player({ name: 'a', team: 'offense' }, { center: new Point(47.95466, 22.76138), occlusionRadius: 3 }),
                new Player({ name: 'b', team: 'offense' }, { center: new Point(47.95466, 22.76139), occlusionRadius: 3 }),
                new Player({ name: 'c', team: 'offense' }, { center: new Point(57.88482, 22.29812), occlusionRadius: 3 }),
                new Player({ name: 'd', team: 'offense' }, { center: new Point(58.87267, 24.03082), occlusionRadius: 3 }),
                new Player({ name: 'e', team: 'offense' }, { center: new Point(47.7704, 22.76371), occlusionRadius: 3 }),
            ];

            const defense = [
                new Player({ name: 'u', team: 'defense' }, { center: new Point(57.89381, 22.26358), occlusionRadius: 3 }),
                new Player({ name: 'v', team: 'defense' }, { center: new Point(47.7704, 22.76371), occlusionRadius: 3 }),
                new Player({ name: 'x', team: 'defense' }, { center: new Point(98.93821, 48.96145), occlusionRadius: 3 }),
                new Player({ name: 'y', team: 'defense' }, { center: new Point(58.87267, 24.03082), occlusionRadius: 3 }),
                new Player({ name: 'z', team: 'defense' }, { center: new Point(47.95466, 22.76138), occlusionRadius: 3 }),
            ];

            const courtMoment = new CourtMoment(1488326678428, offense, defense);
            const occlusionNetwork = courtMoment.getOcclusionNetwork();

            occlusionNetwork.forEach(
                (iArr, i) => iArr.forEach((ijVal, j) => {
                    expect(ijVal).toStrictEqual(occlusionNetwork[j][i]);
                }),
            );
        });
    });
});
