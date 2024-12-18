import graphql from 'graphql';
import loginMutation from '../mutations/loginMutation.js';
import updateDeveloperMutation from '../mutations/updateDeveloperMutation.js';

const mutationType = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        login: loginMutation,
        updateDeveloper: updateDeveloperMutation,
    }
});

export default mutationType;
