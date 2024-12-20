import db from '../../models/index.js';

const findBy = async (model, field, value) =>
    await db[model].findOne({
        where: {
            [field]: value
        }
    });

const findAllWithJoin = async (model, joinWith) => {
    const data = await db[model].findAll({
        include: [{
            model: db[joinWith],
            required: true
        }]
    });
    return data.map(item => ({
        ...item.dataValues,
        ...item.dataValues[joinWith].dataValues
    }));
}

const findAll = async (model, joinWith) => {
    return joinWith === null
        ? await db[model].findAll()
        : await findAllWithJoin(model, joinWith);
}

const generateFunctions = modelName => ({
    [`update${modelName}`]: async (entity, body) => await entity.update(body),
    [`find${modelName}ById`]: async id => await findBy(modelName, 'id', id),
    [`find${modelName}ByField`]: async (field, value) => await findBy(modelName, field, value),
    [`findAll${modelName}s`]: async (props = {})  => findAll(modelName, props.joinWith ?? null),
});

export default Object.keys(db).reduce((acc, modelName) => {
    if (modelName.toLowerCase() === 'sequelize') {
        return acc;
    }
    return {
        ...acc,
        ...generateFunctions(modelName),
    };
}, {});
