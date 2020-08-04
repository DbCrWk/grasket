// @flow
import CourtMoment from '#src/player/CourtMoment';
import PlayerMoment from '#src/player/PlayerMoment';
import Player from '#src/player/Player';
import Point from '#src/object/Point';

const ball = new PlayerMoment(
    { player: new Player({ name: '-1', uniformNumber: '-1' }) },
    { center: new Point(46.31729, 23.04334) },
);
const offense = [
    new PlayerMoment(
        { player: new Player({ name: '940823', uniformNumber: '1' }) }, { center: new Point(58.07811, 23.34283) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '879504', uniformNumber: '14' }) }, { center: new Point(47.83071, 23.61903) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '740354', uniformNumber: '22' }) }, { center: new Point(76.43439, 24.83434) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '879502', uniformNumber: '4' }) }, { center: new Point(55.7165, 25.92519) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '696305', uniformNumber: '50' }) }, { center: new Point(47.82852, 25.09588) },
    ),
];
const defense = [
    new PlayerMoment(
        { player: new Player({ name: '937647', uniformNumber: '0' }) }, { center: new Point(55.32911, 25.26071) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '756883', uniformNumber: '13' }) }, { center: new Point(57.32186, 18.70627) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '937667', uniformNumber: '15' }) }, { center: new Point(47.60885, 23.05894) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '696290', uniformNumber: '21' }) }, { center: new Point(46.1765, 23.94627) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '887661', uniformNumber: '5' }) }, { center: new Point(46.01607, 22.04821) },
    ),
];

const m1488326682708 = new CourtMoment(1488326682708, offense, defense, ball);

const ball1488326706106 = new PlayerMoment(
    { player: new Player({ name: '-1', uniformNumber: '-1' }) },
    { center: new Point(8.15985, 4.3118) },
);
const offense1488326706106 = [
    new PlayerMoment(
        { player: new Player({ name: '940823', uniformNumber: '1' }) }, { center: new Point(5.92496, 21.57132) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '879504', uniformNumber: '14' }) }, { center: new Point(8.05985, 4.2118) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '740354', uniformNumber: '22' }) }, { center: new Point(8.60293, 47.04237) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '879502', uniformNumber: '4' }) }, { center: new Point(26.11243, 8.47728) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '696305', uniformNumber: '50' }) }, { center: new Point(6.86841, 31.28842) },
    ),
];
const defense1488326706106 = [
    new PlayerMoment(
        { player: new Player({ name: '937647', uniformNumber: '0' }) }, { center: new Point(8.45145, 17.69969) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '756883', uniformNumber: '13' }) }, { center: new Point(20.01355, 14.81376) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '937667', uniformNumber: '15' }) }, { center: new Point(8.52781, 37.41741) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '696290', uniformNumber: '21' }) }, { center: new Point(7.23353, 24.31414) },
    ),
    new PlayerMoment(
        { player: new Player({ name: '887661', uniformNumber: '5' }) }, { center: new Point(6.55631, 30.98392) },
    ),
];

const m1488326706106 = new CourtMoment(
    1488326706106, offense1488326706106, defense1488326706106, ball1488326706106,
);
