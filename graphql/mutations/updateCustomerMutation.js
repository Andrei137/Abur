import customerType from '../types/customerType.js';
import customerInputType from '../types/customerInputType.js';
import bcrypt from 'bcrypt';
import db from '../../models/index.js';

const updateCustomerMutationResolver = async (_, input, context) => {
  const isAuthorized = !!context.user_id
  if (!isAuthorized) {
    return false;
  }

  const user = await db.User.findOne({
    where: { id: context.user_id }
  });

  const customer = await db.Customer.findOne({
    where: { id: context.user_id }
  });

  if (!user || !customer) {
    return false;
  }

  const updatedUser = await user.update({
    ...input.customer,
    password: await bcrypt.hash(input.customer.password, 5)
  });

  const updatedCustomer = await customer.update({
    ...input.customer
  });

  return {
    ...updatedUser.dataValues,
    ...updatedCustomer.dataValues
  };
}

const updateCustomerMutation = {
  type: customerType,
  args: {
    customer: { type: customerInputType },
  },
  resolve: updateCustomerMutationResolver,
};

export default updateCustomerMutation;
