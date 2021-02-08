# Calevents

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix

## Run docker
```sh
docker-compose build
docker-compose up
```

## Run phoenix
```
  mix deps.get
  mix compile
```
  The app is expecting PGHOST as the hostname to run into docker and in local. In local PGHOST needs to be exported before to start the server.
  Database must be running.
  Database 'calevents_dev' must be created and user postgress needs to exist.
  pg_ctl -D /usr/local/var/postgres start
  export PGHOST=localhost
```
  mix phx.server
```

## Infos

API is available at: http://localhost:4000/api/
Graphiql enabled at: http://localhost:4000/graphiql/
CORS enable for http://localhost:4200/

Queries available in gql-queries.graphql