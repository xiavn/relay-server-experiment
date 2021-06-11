import { extendType, objectType } from 'nexus';
import { getColour, getColours } from '../model/colour';

export const colourType = objectType({
    name: 'Colour',
    definition(t) {
        t.implements('Node');
        t.nonNull.string('name');
        t.nonNull.int('year');
        t.nonNull.string('hexValue', {
            resolve: (source) => {
                return source.color;
            },
        });
        t.nonNull.string('pantoneValue', {
            resolve: (source) => {
                return source['pantone_value'];
            },
        });
    },
});

export const colourQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('colours', {
            type: 'Colour',
            resolve: async () => {
                return await getColours();
            },
        });
    },
});
