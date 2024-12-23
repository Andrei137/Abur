import db from '@models/index.js';

const spreadData = (data, joinWith) =>
    data
        ? {
            ...data.dataValues,
            ...(joinWith ? data.dataValues[joinWith].dataValues : {})
          }
        : null;

const findQuery = async (model, joinWith, field = null, value = null, isSingle = false) => {
    const where = field !== null && value !== null
        ? { [field]: value }
        : undefined;
    const include = joinWith
        ? [{
            model: db[joinWith],
            required: true,
          }]
        : [];

    const result = isSingle
        ? await db[model].findOne({where, include})
        : await db[model].findAll({where, include});

    return isSingle
        ? spreadData(result, joinWith)
        : result.map(data => spreadData(data, joinWith));
};

const findByField = async (model, field, value, joinWith) =>
    await findQuery(model, joinWith, field, value, true);

const findSomeByField = async (model, field, value, joinWith) =>
    await findQuery(model, joinWith, field, value, false);

const findAll = async (model, joinWith) =>
    await findQuery(model, joinWith)

const updateById = async (model, id, body) => {
    const where = { id };
    const entity = await db[model].findOne({ where });
    if (!entity) {
        return null;
    }
    return await entity.update(body);
}

const generateFunctions = model => ({
    [`find${model}ById`]: async (id, props = {}) =>
        await findByField(model, 'id', id, props?.joinWith),
    [`find${model}ByField`]: async (field, value, props = {}) =>
        await findByField(model, field, value, props?.joinWith),
    [`find${model}sByField`]: async (field, value, props = {}) =>
        await findSomeByField(model, field, value, props?.joinWith),
    [`findAll${model}s`]: async (props = {}) =>
        await findAll(model, props?.joinWith),
    [`update${model}`]: async (id, body) =>
        await updateById(model, id, body),
});

export default Object.keys(db).reduce((acc, model) => {
    if (model.toLowerCase() === 'sequelize') {
        return acc;
    }
    return {
        ...acc,
        ...generateFunctions(model),
    };
}, {});
