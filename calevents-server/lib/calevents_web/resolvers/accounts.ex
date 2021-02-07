defmodule CaleventsWeb.Resolvers.Accounts do
  alias Calevents.Accounts

  def users(_, _, _) do
    {:ok, Accounts.list_users()}
  end

  def user(_, %{id: id}, _) do
    {:ok, Accounts.get_user!(id)}
  end

  def create_user(_root, args, _info) do
    # set default age value
    age = :rand.uniform(85)
    args = Map.put(args, :age, age)

    case Accounts.create_user(args) do
      {:ok, user} ->
        {:ok, user}

      _error ->
        {:error, "could not create user"}
    end
  end

  def delete_user(_root, %{id: id}, _info) do
    user = Accounts.get_user!(id)

    case Accounts.delete_user(user) do
      {:ok, user} ->
        {:ok, user}

      _error ->
        {:error, "could not delete user"}
    end
  end

  def update_user(_root, args, _info) do
    %{id: id} = args
    user = Accounts.get_user!(id)

    case Accounts.update_user(user, args) do
      {:ok, user} ->
        {:ok, user}

      _error ->
        {:error, "could not delete user"}
    end
  end
end
