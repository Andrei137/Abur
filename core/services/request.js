import db from '@models/index.js';

const generateWhere = (fields, values) =>
    fields !== null && values !== null && fields.length === values.length
        ? fields.reduce((acc, field, index) => {
            acc[field] = values[index];
            return acc;
        }, {})
        : undefined;

const spreadData = (data, joinWith) => data
    ? {
        ...data.dataValues,
        ...(joinWith ? data.dataValues[joinWith].dataValues : {}),
    }
    : null;

const findQuery = async (model, joinWith, fields = null, values = null, isSingle = false) => {
    const include = joinWith
        ? [
            {
                model: db[joinWith],
                required: true,
            },
        ]
        : [];
    const params = { where: generateWhere(fields, values), include };

    const result = isSingle
        ? await db[model].findOne(params)
        : await db[model].findAll(params);

    return isSingle
        ? spreadData(result, joinWith)
        : result.map((data) => spreadData(data, joinWith));
};

const deleteQuery = async (model, fields = null, values = null) =>
    await db[model].destroy({ where: generateWhere(fields, values) });

const updateById = async (model, id, body) => {
    const where = { id };
    const entity = await db[model].findOne({ where });
    if (!entity) {
        return null;
    }
    return spreadData(await entity.update(body));
};

const generateFunctions = model => ({
    [`find${model}ById`]: async (id, props = {}) =>
        await findQuery(model, props?.joinWith, ['id'], [id], true),
    [`find${model}ByField`]: async (field, value, props = {}) =>
        await findQuery(model, props?.joinWith, [field], [value], true),
    [`find${model}sByField`]: async (field, value, props = {}) =>
        await findQuery(model, props?.joinWith, [field], [value]),
    [`find${model}ByFields`]: async (fields, values, props = {}) =>
        await findQuery(model, props?.joinWith, fields, values, true),
    [`find${model}sByFields`]: async (fields, values, props = {}) =>
        await findQuery(model, props?.joinWith, fields, values),
    [`findAll${model}s`]: async (props = {}) =>
        await findQuery(model, props?.joinWith),
    [`create${model}`]: async body =>
        spreadData(await db[model].create(body)),
    [`update${model}`]: async (id, body) =>
        await updateById(model, id, body),
    [`delete${model}`]: async id =>
        await deleteQuery(model, ['id'], [id]),
    [`delete${model}sByField`]: async (field, value) =>
        await deleteQuery(model, [field], [value]),
    [`delete${model}sByFields`]: async (fields, values) =>
        await deleteQuery(model, fields, values),
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
