defmodule Calevents.Planner.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "uvents" do
    field :description, :string
    field :end, :utc_datetime
    field :start, :utc_datetime
    field :title, :string
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:title, :description, :start, :end, :user_id])
    |> validate_required([:title, :description, :start, :end, :user_id])
  end
end
