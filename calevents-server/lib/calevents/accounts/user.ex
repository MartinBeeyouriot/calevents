defmodule Calevents.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Calevents.Planner.Event

  schema "users" do
    field :age, :integer
    field :color, :string
    field :name, :string
    has_many :uvents, Event, on_delete: :delete_all

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :age, :color])
    |> validate_required([:name, :age, :color])
  end
end
