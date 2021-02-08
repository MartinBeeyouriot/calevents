# calevents

## Description

This client app is using **Emberjs** and **apollo-ember-absinthe** library for graphql.
The server app is written in **Elixir** with Phoenix framework and Absinthe library.

This app allows to create/update/delete users as well as creating events for every users. Events for the same user **cannot overlap** each other.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) v14
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/) or any browser
* [Docker](https://docker.com/)


## Installation

* `git clone https://github.com/MartinBeeyouriot/calevents.git` this repository
  
  Run docker compose for postgresql and phoenix/absinthe
* `cd calevents-server`
* `docker-compose build`
* `docker-compose up`

Alternatively if you have hex/postgres/phoenix installed locally you can also run the following command:
```sh
  mix deps.get
  mix compile
```
  The app is expecting PGHOST to be defined as the database hostname to run into docker and in local. In local PGHOST needs to be exported before to start the server.
  Postgresql database must also be running.
  Database 'calevents_dev' must be created and user postgress needs to exist.
  ```sh
  pg_ctl -D /usr/local/var/postgres start
  export PGHOST=localhost
  ```
  To get couple of users run `mix run priv/repo/seeds.exs `
```sh
  mix phx.server
```

## Browse

* Browse to http://localhost:4000 for the website
* API is available at: http://localhost:4000/api/
* Graphiql enabled at: http://localhost:4000/graphiql/


## Screenshots
![alt text](https://github.com/MartinBeeyouriot/calevents/blob/master/screenshots/1.png?raw=true)
![alt text](https://github.com/MartinBeeyouriot/calevents/blob/master/screenshots/2.png?raw=true)
![alt text](https://github.com/MartinBeeyouriot/calevents/blob/master/screenshots/3.png?raw=true)

