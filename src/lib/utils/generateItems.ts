import type {Item} from '../types/item';

export const generateItems = (count: number): Item[] =>
    Array.from({length: count}, (_, index) => ({
        id: index + 1,
        text: `Данные №${index + 1}`,
    }));
