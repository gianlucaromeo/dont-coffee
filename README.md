# ☕️🙅🏻‍♂️ Don't coffee!

A (work-in-progress) coffee-tracker web-app made with Next.js, React.js, tRPC, TanStack, Postgres.

# How to start this project

👉🏻 Install dependencies:

```bash
npm install
```

👉🏻 Create a `.env` file by copying the `.example_env` file and filling in the values if needed.

👉🏻 Make sure that you have Docker installed and running on your machine.

👉🏻 Start the development server with database, run:

```bash
npm run docker:start
```

👉🏻 (One time) Migrate database:

```shell
npm run docker:db:push
```

👉🏻 (One time) Seed the database with mock data:

```shell
npm run docker:db:seed
```

👉🏻 Navigate to [localhost:3000](http://localhost:3000), read the instructions on the page and start solving the case!

### How to stop the development server

```bash
npm run docker:stop
```

> NOTE: When installing NPM dependencies you might need to stop (step 8) and start the development server again (step 4).