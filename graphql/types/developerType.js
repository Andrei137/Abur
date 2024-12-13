import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import userType from "./userType.js";

const developerType = new GraphQLObjectType({
    name: 'Developer',
    interfaces: [userType],
    fields: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        
        studio: { type: new GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLString },
        // TODO
    }
});

export default developerType;
