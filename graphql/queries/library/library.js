import libraryType from '@types/entity/library.js';

const libraryQueryResolver = async (_, {}, { userId }) => ({ userId });

export default {
    type: libraryType,
    args: {},
    resolve: libraryQueryResolver,
};
