import gameType from "./game.js";
import userType from "./user.js";
import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export default new GraphQLObjectType({
  name: "Review",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    user: { type: new GraphQLNonNull(userType) },
    game: { type: new GraphQLNonNull(gameType) },
    rating: { type: GraphQLInt },
    comment: { type: GraphQLString },
  }),
});
