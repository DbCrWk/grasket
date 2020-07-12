// @flow
import Player from '#src/player/Player';
import Point from '#src/object/Point';
import Circle from '#src/object/Circle';

describe('player', () => {
    describe('()', () => {
        it('saves constructed values', () => {
            expect.assertions(4);

            const center = new Point(47.95466, 22.76138);
            const occlusionRadius = 3;
            const occlusionField = new Circle(center, occlusionRadius);
            const p = new Player({ name: 'a', team: 'offense' }, { center, occlusionRadius });

            expect(p.name).toStrictEqual('a');
            expect(p.team).toStrictEqual('offense');
            expect(p.center).toStrictEqual(center);
            expect(p.occlusionField.equals(occlusionField)).toBe(true);
        });
    });

    describe('.equals', () => {
        it('returns true when equal', () => {
            expect.assertions(1);

            const center = new Point(47.95466, 22.76138);
            const occlusionRadius = 3;
            const p = new Player({ name: 'a', team: 'offense' }, { center, occlusionRadius });
            const q = new Player({ name: 'a', team: 'offense' }, { center, occlusionRadius });

            expect(p.equals(q)).toBe(true);
        });

        it('returns false when only name different', () => {
            expect.assertions(1);

            const center = new Point(47.95466, 22.76138);
            const occlusionRadius = 3;
            const p = new Player({ name: 'a', team: 'offense' }, { center, occlusionRadius });
            const q = new Player({ name: 'b', team: 'offense' }, { center, occlusionRadius });

            expect(p.equals(q)).toBe(false);
        });

        it('returns false when only team different', () => {
            expect.assertions(1);

            const center = new Point(47.95466, 22.76138);
            const occlusionRadius = 3;
            const p = new Player({ name: 'a', team: 'offense' }, { center, occlusionRadius });
            const q = new Player({ name: 'a', team: 'defense' }, { center, occlusionRadius });

            expect(p.equals(q)).toBe(false);
        });

        it('returns false when only center different', () => {
            expect.assertions(1);

            const centerP = new Point(47.95466, 22.76138);
            const centerQ = new Point(49, 22.76138);
            const occlusionRadius = 3;
            const p = new Player({ name: 'a', team: 'offense' }, { center: centerP, occlusionRadius });
            const q = new Player({ name: 'a', team: 'offense' }, { center: centerQ, occlusionRadius });

            expect(p.equals(q)).toBe(false);
        });

        it('returns false when only occlusionRadius different', () => {
            expect.assertions(1);

            const center = new Point(47.95466, 22.76138);
            const p = new Player({ name: 'a', team: 'offense' }, { center, occlusionRadius: 3 });
            const q = new Player({ name: 'a', team: 'offense' }, { center, occlusionRadius: 4 });

            expect(p.equals(q)).toBe(false);
        });

        it('is commutative when equal', () => {
            expect.assertions(2);

            const center = new Point(47.95466, 22.76138);
            const occlusionRadius = 3;
            const p = new Player({ name: 'a', team: 'offense' }, { center, occlusionRadius });
            const q = new Player({ name: 'a', team: 'offense' }, { center, occlusionRadius });

            expect(p.equals(q)).toBe(true);
            expect(q.equals(p)).toBe(true);
        });

        it('is commutative when not equal', () => {
            expect.assertions(2);

            const center = new Point(47.95466, 22.76138);
            const p = new Player({ name: 'a', team: 'offense' }, { center, occlusionRadius: 3 });
            const q = new Player({ name: 'a', team: 'offense' }, { center, occlusionRadius: 4 });

            expect(p.equals(q)).toBe(false);
            expect(q.equals(p)).toBe(false);
        });
    });
});
