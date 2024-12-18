import developerType from '../types/developerType.js';
import developerInputType from '../types/developerInputType.js';
import bcrypt from 'bcrypt';
import db from '../../models/index.js';

const updateDeveloperMutationResolver = async (_, input, context) => {
    const isAuthorized = !!context.user_id
    if (!isAuthorized) {
        return false;
    }
    
    const user = await db.User.findOne({
        where: { id: context.user_id }
    });

    const developer = await db.Developer.findOne({
        where: { id: context.user_id }
    }); 

    if (!user || !developer) {
        return false;
    }

    const updatedUser = await user.update({
        ...input.developer,
        password: await bcrypt.hash(input.developer.password, 5)
    });

    const updatedDeveloper = await developer.update({
        ...input.developer
    });

    return {
        ...updatedUser.dataValues,
        ...updatedDeveloper.dataValues
    };
}

const updateDeveloperMutation = {
    type: developerType,
    args: {
        developer: { type: developerInputType },
    },
    resolve: updateDeveloperMutationResolver,
};

export default updateDeveloperMutation;
