## Running application


The application can be executed in Docker.




### Docker


1. Run `cp apps/auth/.env.example .env`
2. Run `cp libs/common/.env.example .env`
3. Fill the gaps in `.env` files
4. Run `docker-compose up --build`.


### Swagger documentation available


I have already created Swagger documentation for the API. You can access and test the API documentation by navigating to http://localhost:3000/api. This documentation provides an interactive interface to explore the API's endpoints, try out requests, and view responses in real-time.

### Code style
Project uses Prettier and ESLint in order to make code clean.
In order to reformat/check code run:

1. Run `pnpm run lint`.
2. Run `pnpm run format`.