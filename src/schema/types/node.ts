import { fromGlobalId, toGlobalId } from 'graphql-relay';
import { interfaceType } from 'nexus';

export const Node = interfaceType({
    name: 'Node',
    definition(t) {
        t.nonNull.id('id', {
            resolve(source) {
                const id = toGlobalId(source.__typename, String(source.id));
                return id;
            },
        });
    },
});
