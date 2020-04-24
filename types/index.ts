import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    users: [User]!
    projects: [Project]
    user(id: ID!): User
    username(username: String): User
    userEmail(email: String): User
    project(id: ID!): Project
  }

  type User {
    id: ID!
    username: String!
    first_name: String!
    last_name: String!
    email: String!
    company: String
    dev_experience: Int
    dev_education: Int
    projects: [Project]
  }

  type Project {
    id: ID!
    project_name: String!
    project_avatar: String
    project_description: String!
    project_owner: User!
    project_developer: User
    completed: Boolean!
    marketplace: Boolean!
    showcase: Boolean!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type ResetPayload {
    token: String
    message: String
  }

  type Mutation {
    signup(
      username: String!
      first_name: String!
      last_name: String!
      password: String!
      email: String!
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addProject(project_name: String, project_owner: Int): Project
    updateProject(
      id: ID!
      project_name: String
      project_owner: Int
      project_developer: Int
    ): Project
    deleteProject(id: ID!): Project
    updateUser(
      id: ID!
      username: String
      first_name: String
      last_name: String
      email: String
      company: String
      dev_experience: Int
      dev_education: Int
    ): User
    # adding a project
    # claiming a project/job
    # update a project
    # update a user
    # potentially "delete" for developers
    # archive users
    # delete projects

    # initiate should send a token, secret possibly be email?
    initiateReset(email: String!): ResetPayload
    # Check the token, if good save the new password
    resetPassword(email: String!, password: String!): String
  }
`;

export default typeDefs;
