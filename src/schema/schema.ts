import { connectionPlugin, makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './types';

const schema = makeSchema({
    types,
    outputs: {
        typegen: join(__dirname, '..', 'nexus-typegen.ts'),
        schema: join(__dirname, '..', 'schema.graphql'),
    },
    contextType: {
        module: join(__dirname, './context.ts'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            {
                module: join(__dirname, './source-types.d.ts'),
                alias: 'prisma',
            },
        ],
    },
    features: {
        abstractTypeStrategies: {
            __typename: true,
        },
    },
    plugins: [connectionPlugin()],
});

export default schema;
