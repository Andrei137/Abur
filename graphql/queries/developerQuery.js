import { GraphQLInt, GraphQLNonNull } from "graphql";
import developerType from "../types/developerType.js";
// TODO: ERR_UNSUPPORTED_ESM_URL_SCHEME
// import db from "../../models/index.js"

const developerQueryResolver = async (_, { id }) => {
    // TODO
    // const developer = await db.Developer.findOne({
    //     where: {
    //         id
    //     }
    // });

    console.log('developerQueryResolver');
    console.log(id);
    //console.log(developer);

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
