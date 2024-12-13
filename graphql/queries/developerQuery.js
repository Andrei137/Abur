import { GraphQLInt, GraphQLNonNull } from "graphql";
import developerType from "../types/developerType.js";

const developerQueryResolver = async (_, { id }) => {
    // TODO
    // const developer = ...;

    console.log('developerQueryResolver');
    console.log(id);

    return null;
};

const developerQuery = {
    type: developerType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: developerQueryResolver,
};

export default developerQuery;
