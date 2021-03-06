defmodule CaleventsWeb.Router do
  use CaleventsWeb, :router

  pipeline :api do
    # Defining Cors origin
    plug CORSPlug, origin: "http://localhost:4200"
    plug :accepts, ["json"]
  end

  scope "/" do
    pipe_through :api

    # Api
    forward "/api", Absinthe.Plug, schema: CaleventsWeb.Schema.Schema

    # Graphiql
    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: CaleventsWeb.Schema.Schema,
      interface: :simple
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: CaleventsWeb.Telemetry
    end
  end
end
