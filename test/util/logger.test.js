// @flow
import {
    error as errorGn,
    debug as debugGn,
    errorLib as errorLibGn,
    debugLib as debugLibGn,
    json,
} from '../../src/util/logger';

describe('logger', () => {
    it('has well-defined exports', () => {
        expect.assertions(0);
    });

    describe('{ error }', () => {
        it('correctly formats message with data', () => {
            expect.assertions(1);

            const error = errorGn('Namespace');
            const e = error('Test', { a: 'a' });

            expect(e).not.toBeNull();
        });

        it('correctly formats message without data', () => {
            expect.assertions(1);

            const error = errorGn('Namespace');
            const e = error('Test');

            expect(e).not.toBeNull();
        });
    });

    describe('{ debug }', () => {
        it('correctly formats message with data', () => {
            expect.assertions(1);

            const debug = debugGn('Namespace');
            const m = debug('Test', { a: 'a' });

            expect(m).not.toBeNull();
        });

        it('correctly formats message without data', () => {
            expect.assertions(1);

            const debug = debugGn('Namespace');
            const m = debug('Test');

            expect(m).not.toBeNull();
        });
    });

    describe('{ errorLib }', () => {
        it('correctly formats message with data', () => {
            expect.assertions(1);

            const error = errorLibGn('Namespace');
            const e = error('Test', 'Test', { a: 'a' });

            expect(e).not.toBeNull();
        });

        it('correctly formats message without data', () => {
            expect.assertions(1);

            const error = errorLibGn('Namespace');
            const e = error('Test', 'Test');

            expect(e).not.toBeNull();
        });
    });

    describe('{ debugLib }', () => {
        it('correctly formats message with data', () => {
            expect.assertions(1);

            const debug = debugLibGn('Namespace');
            const m = debug('Test', 'Test', { a: 'a' });

            expect(m).not.toBeNull();
        });

        it('correctly formats message without data', () => {
            expect.assertions(1);

            const debug = debugLibGn('Namespace');
            const m = debug('Test', 'Test');

            expect(m).not.toBeNull();
        });
    });

    describe('{ json }', () => {
        it('correctly formats message with data', () => {
            expect.assertions(1);

            const m = json()({ a: 'a' });

            expect(m).not.toBeNull();
        });

        it('correctly formats message without data', () => {
            expect.assertions(1);

            const m = json()();

            expect(m).not.toBeNull();
        });

        it('correctly formats message (pretty)', () => {
            expect.assertions(1);

            const m = json({ pretty: true })({ a: 'a' });

            expect(m).not.toBeNull();
        });
    });
});
