import libraryType from '@types/entity/library.js';

const libraryQueryResolver = async (_, {}, { userId }) => {
    return { userId };
};

export default {
    type: libraryType,
    args: {},
    resolve: libraryQueryResolver,
};
