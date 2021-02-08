defmodule Calevents.Planner.Event do
  @moduledoc """
  Auto-generated.
  """
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
    # Added to make sure user_id exists in the db when creating an event, without phoenix throws an exception instead of an error
    |> foreign_key_constraint(:user_id, name: :uvents_user_id_fkey)
    # Validation added on foreign_key user_id
    |> validate_required([:title, :description, :start, :end, :user_id])
  end
end
