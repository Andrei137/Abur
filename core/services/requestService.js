import db from '../../models/index.js';

const readBy = async (model, field, value) =>
    await db[model].findOne({
        where: {
            [field]: value
        }
    });
const findByField = modelName => async (field, value) => await readBy(modelName, field, value);
const findById = modelName => async id => await readBy(modelName, 'id', id);
const update = async (entity, body) => await entity.update(body);

const join = async (model1, model2) => {
    const data = await model1.findAll({
        include: [{
            model: model2,
            required: true
        }]
    });

    const parsedData = data.map(d => ({
        ...d.dataValues,
        ...d.dataValues[model2.name].dataValues
    }));

    return parsedData;
}

const findAllDevelopers = async () => await join(db.User, db.Developer);
const findAllCustomers = async () => await join(db.User, db.Customer);

const generateFunctions = modelName => ({
    [`update${modelName}`]: update,
    [`find${modelName}ById`]: findById(modelName),
    [`find${modelName}ByField`]: findByField(modelName),
});

export default Object.keys(db).reduce((acc, modelName) => {
    if (modelName.toLowerCase() === 'sequelize') {
        return acc;
    }
    return {
        ...acc,
        ...generateFunctions(modelName),
    };
}, {
    findAllDevelopers,
    findAllCustomers
});
