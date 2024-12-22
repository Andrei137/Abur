import graphql from 'graphql';
import loginMutation from '@mutations/auth/login.js';
import updateCustomerMutation from '@mutations/customer/update.js';
import updateDeveloperMutation from '@mutations/developer/update.js';

const mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: loginMutation,
        updateDeveloper: updateDeveloperMutation,
        updateCustomer: updateCustomerMutation,
    },
});

export default mutationType;
