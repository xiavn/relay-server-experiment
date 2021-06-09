import { objectType } from 'nexus';

export const pageCursorType = objectType({
    name: 'PageCursor',
    definition(t) {
        t.nonNull.string('cursor');
        t.nonNull.int('page');
        t.nonNull.boolean('isCurrent');
    },
});

export const pageCursorsType = objectType({
    name: 'PageCursors',
    definition(t) {
        t.field('first', {
            type: 'PageCursor',
            description:
                'Optional, may be included in `around` (if current page is near the beginning).',
        });
        t.field('last', {
            type: 'PageCursor',
            description:
                'Optional, may be included in `around` (if current page is near the end).',
        });
        t.nonNull.list.nonNull.field('around', {
            type: 'PageCursor',
            description: 'Always includes current page',
        });
        t.field('previous', {
            type: 'PageCursor',
        });
        t.nonNull.int('totalRecords');
    },
});
