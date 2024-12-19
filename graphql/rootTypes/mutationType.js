import graphql from 'graphql';
import loginMutation from '../mutations/loginMutation.js';
import updateCustomerMutation from '../mutations/updateCustomerMutation.js';
import updateDeveloperMutation from '../mutations/updateDeveloperMutation.js';

const mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: loginMutation,
        updateDeveloper: updateDeveloperMutation,
        updateCustomer: updateCustomerMutation,
    },
});

export default mutationType;
