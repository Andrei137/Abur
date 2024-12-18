import { GraphQLInt, GraphQLNonNull } from "graphql";
import developerType from "../types/developerType.js";
import db from "../../models/index.js"

const developerQueryResolver = async (_, { id }) => {
    const developer = await db.Developer.findOne({
        where: {
            id
        }
    });

    // TODO: debug
    console.log('developerQueryResolver');
    console.log(id);
    console.log(developer);

    return developer;
};

const developerQuery = {
    type: developerType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: developerQueryResolver,
};

export default developerQuery;
