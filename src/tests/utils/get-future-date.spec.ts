import {expect, test} from 'vitest';
import { getFutureDate } from './get-future-date';

test('increasses date with one year', () => {
    const year = new Date().getFullYear();
    expect(getFutureDate(`${year}-08-18`).getFullYear()).toEqual(year + 1)
})