export const getCellClassname = (width: number | undefined): string =>
    width === undefined ? 'vtable__cell vtable__cell--flex' : 'vtable__cell';
