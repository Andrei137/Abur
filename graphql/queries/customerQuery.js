import { GraphQLInt, GraphQLNonNull } from "graphql";
import customerType from "../types/customerType.js";
import db from "../../models/index.js"

const customerQueryResolver = async (_, { id }) => {
    const customer = await db.Customer.findOne({
        where: {
            id
        }
    });

    // TODO: debug
    console.log('customerQueryResolver');
    console.log(id);
    console.log(customer);

    return customer;
};

const customerQuery = {
    type: customerType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: customerQueryResolver,
};

export default customerQuery;
