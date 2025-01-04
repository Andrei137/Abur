import dlcType from "./game.js";
import gameType from "./game.js";
import customerType from "./customer.js";
import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
} from "graphql";

export default new GraphQLObjectType({
  name: "WishList",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    customer: { type: new GraphQLNonNull(customerType) },
    games: { type: new GraphQLList(gameType) },
    dlcs: { type: new GraphQLList(dlcType) },
  }),
});
