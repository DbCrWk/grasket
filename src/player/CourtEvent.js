// @flow
class CourtEvent {
    time: number;

    index: number;

    constructor({ time, index }: { time: number, index: number }) {
        this.time = time;
        this.index = index;
    }
}

export default CourtEvent;
