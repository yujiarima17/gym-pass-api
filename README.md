
# Gym Pass API

This project is a NodeJS API to manage a gym application functionalities like: check-ins, nearby gyms, user metrics. This Gym Pass API uses JWT to auth the users and RBAC to validate their access to the application resources.
## API Docs

#### Return the User data.

```http
  GET /me
```

#### Return the nearby gyms by the user location.

```http
  GET /gyms/nearby
```

#### Return all the gyms paginated

```http
  GET /gyms/search
```

#### Return the user check-in history

```http
  GET /check-ins/history
```

#### Return the user check-in metrics

```http
  GET /check-ins/metrics
```
## Running Locally

Clone the Project.

```bash
  git clone https://github.com/yujiarima17/github-blog
```

Change to the project dir.

```bash
  cd my-project
```

Dependencies install.

```bash
  npm install
```

Initialiaze the server in a dev environment.

```bash
  npm run start:dev
```


## Tests Running

To run the tests :

```bash
  // runs all unity tests
  npm run test
```

```bash
  // runs all end-to-end tests
  npm run test:e2e
```


## Stack utilizada

**Back-end:** Node, Fastify, SuperTest, Prisma;


## Project Learning

I learned a lot during this project's development; firstly, I was really surprised by the world of back-end development with NodeJS. First of all, I need to mention that during this period, I learned about the importance of testing our code and how it can accelerate our application development!

The second thing is Prisma and Docker; I had never used them before, but after building my first application using these technologies, it's kind of impossible not to use an ORM to manage my database and a Docker container to avoid some unnecessary database dependencies.


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yuji-arima-7b7059209/)


