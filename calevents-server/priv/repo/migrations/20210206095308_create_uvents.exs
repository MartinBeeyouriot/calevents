defmodule Calevents.Repo.Migrations.CreateUvents do
  use Ecto.Migration

  def change do
    create table(:uvents) do
      add :title, :string
      add :description, :string
      add :start, :utc_datetime
      add :end, :utc_datetime
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:uvents, [:user_id])
  end
end
