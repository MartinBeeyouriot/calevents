defmodule Calevents.Repo do
  use Ecto.Repo,
    otp_app: :calevents,
    adapter: Ecto.Adapters.Postgres
end
