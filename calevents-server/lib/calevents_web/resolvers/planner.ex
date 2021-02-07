defmodule CaleventsWeb.Resolvers.Planner do
  alias Calevents.Planner

  def events(_, %{user_id: user_id}, _) do
    {:ok, Planner.get_by(user_id)}
  end

  def events(_, _, _) do
    {:ok, Planner.list_uvents()}
  end

  @doc """
    This query is used to get events from user for the user/event query.
  """
  def events_by_user(root, _args, info) do
    {:ok, Planner.get_by(root.id)}
  end

  def event(_, %{id: id}, _) do
    {:ok, Planner.get_event!(id)}
  end

  @doc """
    Create an event and check for dates start before
  """
  def create_event(_root, args, _info) do
    %{user_id: user_id, start: start_date, end: end_date} = args

    # we are checking that for each event of our user the start_date and end_date
    if planning_possible(start_date, end_date, user_id) do
      case Planner.create_event(args) do
        {:ok, event} ->
          {:ok, event}

        {:error, _changeset} ->
          {:error, "could not find user_id"}

        _error ->
          {:error, "could not create event"}
      end
    else
      {:error, "could not create event, overlapping"}
    end
  end

  #
  # Check if the time/date range is possible with the already saved events.
  # In case of an update we pass the event_id to skip that item.
  #
  defp planning_possible(start_date, end_date, user_id, event_id \\ "-1") do
    # first check if any element is null date is correct
    if start_date == nil or end_date == nil or user_id == nil do
      true
    end

    # Retrieve all the element for our user. We can add filter later to limit it
    # to one day only, to limit events size.
    events = Planner.get_by(user_id)

    IO.puts("doing the date check ...")

    case events do
      # no events found so planning is possible
      nil ->
        true

      _ ->
        # are not overlapping already existing events
        is_possible = if compare_date(start_date, :>, end_date), do: false, else: true

        results =
          Enum.map(events, fn event ->
            cond do
              # in the case of an update we skip this event
              String.to_integer(event_id) == event.id ->
                true

              true ->
                # Impossible conditions
                condition1 =
                  compare_date(start_date, :>=, event.start) and
                    compare_date(start_date, :<, event.end)

                condition2 =
                  compare_date(end_date, :>, event.start) and
                    compare_date(end_date, :<, event.end)

                if condition1 or condition2 do
                  false
                else
                  true
                end
            end
          end)

        # look into the list to see if there is any false member which means
        # that this event is overlapping
        is_not_overlapping = not (results |> Enum.member?(false))

        # IO.puts("Is possible: #{is_possible} #{is_not_overlapping}")

        is_possible and is_not_overlapping
    end
  end

  # Private function to compare the date
  defp compare_date(a, :<, b), do: DateTime.compare(a, b) == :lt
  defp compare_date(a, :<=, b), do: DateTime.compare(a, b) != :gt
  defp compare_date(a, :>, b), do: DateTime.compare(a, b) == :gt
  defp compare_date(a, :>=, b), do: DateTime.compare(a, b) != :lt

  @doc """
    Delete an event
  """
  def delete_event(_root, %{id: id}, _info) do
    case Planner.get_event(id) do
      nil ->
        {:error, "could not find event"}

      event ->
        case Planner.delete_event(event) do
          {:ok, event} ->
            {:ok, event}

          _error ->
            {:error, "could not delete event"}
        end
    end
  end

  @doc """
    Update Event
  """
  def update_event(_root, %{id: id} = args, _info) do
    case Planner.get_event(id) do
      nil ->
        {:error, "could not find event to update"}

      event ->
        update_event_private(event, args)
    end
  end

  # This is the update event if start_date or end_date have been specified
  defp update_event_private(
         event,
         %{id: id, user_id: user_id, start: start_date, end: end_date} = args
       ) do
    # we are checking that for each event of our user the start_date and end_date
    if planning_possible(start_date, end_date, user_id, id) do
      case Planner.update_event(event, args) do
        {:ok, event} ->
          {:ok, event}

        {:error, _changeset} ->
          {:error, "could not find user_id"}
      end
    else
      {:error, "could not create event, overlapping"}
    end
  end

  # This is in any other case with just an id.
  defp update_event_private(event, args) do
    case Planner.update_event(event, args) do
      {:ok, event} ->
        {:ok, event}

      _error ->
        {:error, "could not update event"}
    end
  end
end
