// @flow
// import { errorLib as errorGn } from '#src/util/logger';
import PlayerMoment from '#src/player/PlayerMoment';
import LineOfSight from '#src/player/LineOfSight';
import areMatricesEqual from '#src/util/areMatricesEqual';
import permuteMatrix from '#src/util/permuteMatrix';
import permutationBuilder from '#src/util/permutationBuilder';
import fixpointPermutationBuilder from '#src/util/fixpointPermutationBuilder';

// const namespace = 'Player > CourtMoment';
// const error = errorGn(namespace);

class CourtMoment {
    time: number;

    offense: Array<PlayerMoment>;

    defense: Array<PlayerMoment>;

    ball: PlayerMoment;

    constructor(
        time: number,
        offense: Array<PlayerMoment>,
        defense: Array<PlayerMoment>,
        ball: PlayerMoment,
    ) {
        this.time = time;
        this.offense = offense;
        this.defense = defense;
        this.ball = ball;
    }

    getOcclusionNetwork(): Array<Array<boolean>> {
        const defensePoints = this.defense.map(d => d.center);

        const occlusionNetwork = this.offense.map(
            o => this.offense.map(
                p => (
                    o.equals(p)
                        ? true
                        : !(new LineOfSight(o.center, p.center)).doPointsOcclude(defensePoints)
                ),
            ),
        );
        return occlusionNetwork;
    }

    isIsomorphicTo(otherCourtMoment: CourtMoment): boolean {
        const thisOcclusionNetwork = this.getOcclusionNetwork();
        const otherOcclusionNetwork = otherCourtMoment.getOcclusionNetwork();

        // const thisPlayerIndexWithBall = this.getPlayerIndexWithBall();
        // const otherPlayerIndexWithBall = otherCourtMoment.getPlayerIndexWithBall();
        // const permutations = permutationBuilder(4);
        // const permutationFixer = fixpointPermutationBuilder(
        //     thisPlayerIndexWithBall,
        //     otherPlayerIndexWithBall,
        // );
        // const fixedPermutations = permutations.map(permutationFixer);
        const fixedPermutations = permutationBuilder(5);

        const permutedMatrices = fixedPermutations.map(p => permuteMatrix(thisOcclusionNetwork, p));

        const ret = permutedMatrices.some(m => areMatricesEqual(m, otherOcclusionNetwork));

        return ret;
    }

    getPlayerWithBall(): PlayerMoment {
        const { ball } = this;

        const distances = this.offense.map(o => o.center.euclideanDistanceTo(ball.center));
        const minIndex = distances.reduce((prev, curr, i, arr) => (curr < arr[prev] ? i : prev), 0);

        return this.offense[minIndex];
    }

    getPlayerIndexWithBall(): number {
        const { ball } = this;

        const distances = this.offense.map(o => o.center.euclideanDistanceTo(ball.center));
        const minIndex = distances.reduce((prev, curr, i, arr) => (curr < arr[prev] ? i : prev), 0);

        return minIndex;
    }
}

export default CourtMoment;
