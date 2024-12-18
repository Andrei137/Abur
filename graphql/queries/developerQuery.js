import { GraphQLInt, GraphQLNonNull } from "graphql";
import developerType from "../types/developerType.js";
import db from "../../models/index.js"

const developerQueryResolver = async (_, { id }) => {
    const user = await db.User.findOne({
        where: {
            id
        }
    });

    const developer = await db.Developer.findOne({
        where: {
            id
        }
    });

    if (!user || !developer) {
        return null;
    }

    return {
        ...user.dataValues,
        ...developer.dataValues
    };
};

const developerQuery = {
    type: developerType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: developerQueryResolver,
};

export default developerQuery;
