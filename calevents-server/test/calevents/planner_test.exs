defmodule Calevents.PlannerTest do
  use Calevents.DataCase

  alias Calevents.Planner

  describe "uvents" do
    alias Calevents.Planner.Event

    @valid_attrs %{description: "some description", end: "2010-04-17T14:00:00Z", start: "2010-04-17T14:00:00Z", title: "some title"}
    @update_attrs %{description: "some updated description", end: "2011-05-18T15:01:01Z", start: "2011-05-18T15:01:01Z", title: "some updated title"}
    @invalid_attrs %{description: nil, end: nil, start: nil, title: nil}

    def event_fixture(attrs \\ %{}) do
      {:ok, event} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Planner.create_event()

      event
    end

    test "list_uvents/0 returns all uvents" do
      event = event_fixture()
      assert Planner.list_uvents() == [event]
    end

    test "get_event!/1 returns the event with given id" do
      event = event_fixture()
      assert Planner.get_event!(event.id) == event
    end

    test "create_event/1 with valid data creates a event" do
      assert {:ok, %Event{} = event} = Planner.create_event(@valid_attrs)
      assert event.description == "some description"
      assert event.end == DateTime.from_naive!(~N[2010-04-17T14:00:00Z], "Etc/UTC")
      assert event.start == DateTime.from_naive!(~N[2010-04-17T14:00:00Z], "Etc/UTC")
      assert event.title == "some title"
    end

    test "create_event/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Planner.create_event(@invalid_attrs)
    end

    test "update_event/2 with valid data updates the event" do
      event = event_fixture()
      assert {:ok, %Event{} = event} = Planner.update_event(event, @update_attrs)
      assert event.description == "some updated description"
      assert event.end == DateTime.from_naive!(~N[2011-05-18T15:01:01Z], "Etc/UTC")
      assert event.start == DateTime.from_naive!(~N[2011-05-18T15:01:01Z], "Etc/UTC")
      assert event.title == "some updated title"
    end

    test "update_event/2 with invalid data returns error changeset" do
      event = event_fixture()
      assert {:error, %Ecto.Changeset{}} = Planner.update_event(event, @invalid_attrs)
      assert event == Planner.get_event!(event.id)
    end

    test "delete_event/1 deletes the event" do
      event = event_fixture()
      assert {:ok, %Event{}} = Planner.delete_event(event)
      assert_raise Ecto.NoResultsError, fn -> Planner.get_event!(event.id) end
    end

    test "change_event/1 returns a event changeset" do
      event = event_fixture()
      assert %Ecto.Changeset{} = Planner.change_event(event)
    end
  end
end
