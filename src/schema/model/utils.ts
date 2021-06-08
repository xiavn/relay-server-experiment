export type typenameItem = { __typename: string };

export const itemOrNull = <I extends typenameItem>(
    item: Omit<I, '__typename'> | null,
    typename: I['__typename'],
) => {
    if (item !== null) {
        return {
            ...item,
            __typename: typename,
        };
    }
    return null;
};

export const item = <I extends typenameItem>(
    item: Omit<I, '__typename'>,
    typename: I['__typename'],
) => {
    return {
        ...item,
        __typename: typename,
    };
};

export const itemList = <I extends typenameItem>(
    items: Omit<I, '__typename'>[],
    typename: I['__typename'],
) =>
    items.map((item) => ({
        ...item,
        __typename: typename,
    }));
