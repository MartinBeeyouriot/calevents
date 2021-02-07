defmodule CaleventsWeb.Schema.Schema do
  use Absinthe.Schema

  import_types(Absinthe.Type.Custom)

  query do
    @desc "Get a list of users"
    field :users, list_of(:user) do
      resolve(&CaleventsWeb.Resolvers.Accounts.users/3)
    end

    @desc "Get a user by its id"
    field :user, :user do
      arg(:id, non_null(:id))
      resolve(&CaleventsWeb.Resolvers.Accounts.user/3)
    end

    @desc "Get an event by its id"
    field :event, :event do
      arg(:id, non_null(:id))
      resolve(&CaleventsWeb.Resolvers.Planner.event/3)
    end

    @desc "Get an event by its (optional) user_id"
    field :events, list_of(:event) do
      arg(:user_id, :id)
      resolve(&CaleventsWeb.Resolvers.Planner.events/3)
    end
  end

  mutation do
    @desc "Create a new User"
    field :create_user, :user do
      arg(:name, non_null(:string))
      arg(:color, non_null(:string))

      resolve(&CaleventsWeb.Resolvers.Accounts.create_user/3)
    end

    @desc "Update a User"
    field :update_user, :user do
      arg(:id, non_null(:id))
      arg(:age, :integer)
      arg(:name, :string)
      arg(:color, :string)

      resolve(&CaleventsWeb.Resolvers.Accounts.update_user/3)
    end

    @desc "Delete a User"
    field :delete_user, :user do
      arg(:id, non_null(:id))

      resolve(&CaleventsWeb.Resolvers.Accounts.delete_user/3)
    end

    @desc "Create a new Event"
    field :create_event, :event do
      arg(:start, non_null(:datetime))
      arg(:end, non_null(:datetime))
      arg(:user_id, non_null(:id))
      arg(:description, non_null(:string))
      arg(:title, non_null(:string))

      resolve(&CaleventsWeb.Resolvers.Planner.create_event/3)
    end

    @desc "Delete an Event"
    field :delete_event, :event do
      arg(:id, non_null(:id))

      resolve(&CaleventsWeb.Resolvers.Planner.delete_event/3)
    end

    @desc "Update an Event"
    field :update_event, :event do
      arg(:id, non_null(:id))
      arg(:user_id, non_null(:id))
      arg(:start, :datetime)
      arg(:end, :datetime)
      arg(:description, :string)
      arg(:title, :string)

      resolve(&CaleventsWeb.Resolvers.Planner.update_event/3)
    end
  end

  # User Object with some fields
  object :user do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :color, non_null(:string)
    field :age, non_null(:integer)

    field :events, list_of(:event) do
      resolve(&CaleventsWeb.Resolvers.Planner.events_by_user/3)
    end
  end

  # Event Object
  object :event do
    field :id, non_null(:id)
    field :start, non_null(:datetime)
    field :end, non_null(:datetime)
    field :user_id, non_null(:id)
    field :description, non_null(:string)
    field :title, non_null(:string)
  end
end
