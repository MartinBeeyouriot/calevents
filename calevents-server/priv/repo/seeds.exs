# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Calevents.Repo.insert!(%Calevents.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Calevents.Repo
alias Calevents.Accounts.User

%User{
  name: "Martin",
  age: 35,
  color: "#FBBEB1"
}
|> Repo.insert!()

%User{
  name: "John",
  age: 43,
  color: "#B1E9FB"
}
|> Repo.insert!()
