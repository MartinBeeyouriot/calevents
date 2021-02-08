defmodule CaleventsWeb.Resolvers.Accounts do
  @moduledoc """
  Accounts Resolvers
  """
  alias Calevents.Accounts

  @doc """
    Get the list of users
  """
  def users(_, _, _) do
    {:ok, Accounts.list_users()}
  end

  @doc """
    Get a specific user with its id
  """
  def user(_, %{id: id}, _) do
    {:ok, Accounts.get_user!(id)}
  end

  @doc """
    Create a new user with %{} args
  """
  def create_user(_root, args, _info) do
    # set default age value
    age = :rand.uniform(85)
    args = Map.put(args, :age, age)

    case Accounts.create_user(args) do
      {:ok, user} ->
        {:ok, user}

      _error ->
        {:error, "Could not create user. (server error)"}
    end
  end

  @doc """
    Delete a user with its id
  """
  def delete_user(_root, %{id: id}, _info) do
    user = Accounts.get_user!(id)

    case Accounts.delete_user(user) do
      {:ok, user} ->
        {:ok, user}

      _error ->
        {:error, "Could not delete user. (userId not found)"}
    end
  end

  @doc """
    Update a user with the args provided
  """
  def update_user(_root, args, _info) do
    %{id: id} = args
    user = Accounts.get_user!(id)

    case Accounts.update_user(user, args) do
      {:ok, user} ->
        {:ok, user}

      _error ->
        {:error, "Could not delete user. (userId not found)"}
    end
  end
end
