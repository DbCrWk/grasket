// @flow
import { errorLib as errorGn } from '#src/util/logger';
import Player from '#src/player/Player';
import LineOfSight from '#src/player/LineOfSight';
import areMatricesEqual from '#src/util/areMatricesEqual';
import permuteMatrix from '#src/util/permuteMatrix';

const namespace = 'Player > CourtMoment';
const error = errorGn(namespace);

type PermutationType = Array<number>;
function permutationBuilderHelper(
    currentPermutations: Array<PermutationType>,
    limit: number,
    depth: number,
) {
    if (depth === limit) return currentPermutations;

    const updatedPermutations = currentPermutations
        .map(
            p => {
                const next: Array<number> = (new Array(limit))
                    .fill(0)
                    .reduce((prev, curr, i) => (p.includes(i) ? prev : [...prev, i]), []);
                return next.map(n => [...p, n]);
            },
        ).reduce((a, b) => [...a, ...b], []);
    return permutationBuilderHelper(updatedPermutations, limit, depth + 1);
}
const permutations5: Array<PermutationType> = permutationBuilderHelper([[]], 5, 0);
const permutations4: Array<PermutationType> = permutationBuilderHelper([[]], 4, 0);

class CourtMoment {
    time: number;

    offense: Array<Player>;

    defense: Array<Player>;

    ball: ?Player;

    constructor(time: number, offense: Array<Player>, defense: Array<Player>, ball: ?Player) {
        this.time = time;
        this.offense = offense;
        this.defense = defense;
        this.ball = ball;
    }

    getOcclusionNetwork(): Array<Array<boolean>> {
        const occlusionNetwork = this.offense.map(
            o => this.offense.map(
                p => ((o === p) ? true : !(new LineOfSight(o, p)).doPlayersOcclude(this.defense)),
            ),
        );
        return occlusionNetwork;
    }

    isIsomorphicTo(otherCourtMoment: CourtMoment): boolean {
        const thisOcclusionNetwork = this.getOcclusionNetwork();
        const otherOcclusionNetwork = otherCourtMoment.getOcclusionNetwork();

        const thisBall = this.ball;
        const otherBall = otherCourtMoment.ball;

        if (thisBall && !otherBall) return false;
        if (!thisBall && otherBall) return false;

        if (thisBall) {
            const thisPlayerWithBall = this.getPlayerWithBall();
            const otherPlayerWithBall = otherCourtMoment.getPlayerWithBall();

            if (!thisPlayerWithBall || !otherPlayerWithBall) {
                throw error('.isIsomorphicTo', 'Plays each have a ball, but no player with ball', {
                    this: this,
                    otherCourtMoment,
                    thisBall,
                    otherBall,
                    thisPlayerWithBall,
                    otherPlayerWithBall,
                });
            }

            if (thisPlayerWithBall.name !== otherPlayerWithBall.name) return false;

            let isIsomorphic = false;
            // eslint-disable-next-line no-restricted-syntax
            for (const permutation of permutations5) {
                if (
                    areMatricesEqual(
                        permuteMatrix(thisOcclusionNetwork, permutation),
                        permuteMatrix(otherOcclusionNetwork, permutation),
                    )
                ) {
                    isIsomorphic = true;
                    break;
                }
            }

            return isIsomorphic;
        }

        let isIsomorphic = false;
        // eslint-disable-next-line no-restricted-syntax
        for (const permutation of permutations5) {
            if (
                areMatricesEqual(
                    permuteMatrix(thisOcclusionNetwork, permutation),
                    permuteMatrix(otherOcclusionNetwork, permutation),
                )
            ) {
                isIsomorphic = true;
                break;
            }
        }

        return isIsomorphic;
    }

    getPlayerWithBall(): ?Player {
        const { ball } = this;
        if (!ball) return null;

        const distances = this.offense.map(o => o.center.euclideanDistanceTo(ball.center));
        const minIndex = distances.reduce((prev, curr, i, arr) => (curr < arr[prev] ? i : prev), 0);

        return this.offense[minIndex];
    }
}

export default CourtMoment;
