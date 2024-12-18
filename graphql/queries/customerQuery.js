import { GraphQLInt, GraphQLNonNull } from "graphql";
import customerType from "../types/customerType.js";
import db from "../../models/index.js"

const customerQueryResolver = async (_, { id }) => {
    const user = await db.User.findOne({
        where: {
            id
        }
    });

    const customer = await db.Customer.findOne({
        where: {
            id
        }
    });

    if (!user || !customer) {
        return null;
    }

    return {
        ...user.dataValues,
        ...customer.dataValues
    };
};

const customerQuery = {
    type: customerType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: customerQueryResolver,
};

export default customerQuery;
