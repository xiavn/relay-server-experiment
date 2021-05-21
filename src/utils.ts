import jwt from 'jsonwebtoken';

export const APP_SECRET = 'GraphQL-is-aw3some';

const getTokenPayload = (token: string) => {
    return jwt.verify(token, APP_SECRET);
};

export const getUserId = (authHeader?: string, authToken?: string) => {
    if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            throw new Error('No token found');
        }
        const payload = getTokenPayload(token) as { userId: string };
        if (typeof payload === 'object') {
            if (typeof payload.userId !== 'undefined') {
                return payload.userId;
            }
        }
    }
    throw new Error('Not authenticated');
};
