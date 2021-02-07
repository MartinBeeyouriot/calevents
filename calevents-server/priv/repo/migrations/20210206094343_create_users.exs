defmodule Calevents.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :age, :integer
      add :color, :string

      timestamps()
    end

  end
end
