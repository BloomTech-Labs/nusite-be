# PartNerd API

## Code Climate Scores

[![Maintainability](https://api.codeclimate.com/v1/badges/c9c9e999329f1ce3ccba/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/nusite-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c9c9e999329f1ce3ccba/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/nusite-be/test_coverage)

🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline. Feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 3️⃣ next to each item represent the week that part of the docs needs to be comepleted by. Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric. Contributing to docs does NOT count as a PR to meet your weekly requirements.

# API Documentation

#### 1️⃣ Backend delpoyed at [🚫name service here](🚫add URL here) <br>

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment
- **npm run coverage** to see test coverage

### Backend framework goes here

Node, Express, TypeScript, Apollo-Server, GraphQL
🚫 Why did you choose this framework?

- Point One
- Point Two
- Point Three
- Point Four

## 2️⃣ Endpoints

🚫This is a placeholder, replace the endpoints, access controll, and descriptioin to match your project

#### Organization Routes

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    | `/`      | all users   | Welcome route to the API |

# Data Model

#### USERS

---

```
{
  id: INT
  username: STRING (unique)
  first_name: STRING
  last_name: STRING
  company: STRING (optional)
  password: STRING
  email: STRING (unique)
  dev_experience: INT (optional)
  dev_education: INT (optional)
}
```

---

#### PROJECTS

---

```
{
  id: INT
  project_name: STRING
  project_avatar: STRING
  project_description: STRING
  project_owner: INT (optional)
  project_developer: INT (optional)
  completed: BOOLEAN
  marketplace: BOOLEAN
  showcase: BOOLEAN
}
```

---

## Queries

```
query {
  users {
    first_name
    last_name
    username
    email
  }
}

query {
  projects {
    project_name
    project_avatar
    project_description
  }
}

query {
  user(id: 1) {
    first_name
    last_name
    username
    email
  }
}

query {
  project(id: 1) {
    project_name
    project_avatar
    project_description
  }
}

query {
  users {
    username
    projects {
      project_name
    }
  }
}

query {
  projects {
    project_name
    project_owner {
      username
    }
  }
}

query {
  projects {
    project_name
    project_developer {
      username
    }
  }
}
```

## 3️⃣ Environment Variables

_ DB_HOST - typically set to localhost for your localdb
_ DB_NAME - name specified when creating your

- DB_USER - set to postgres unless otherwise specified
- DB_PASS - set to your local db password
- JWT_SECRET - secret key for JWT hashing

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
