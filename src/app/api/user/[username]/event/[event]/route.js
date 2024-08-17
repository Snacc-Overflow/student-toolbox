import { createUserModel } from "@/lib/mongodb/mongodb";
import { NextResponse } from "next/server";

/**
 * Updates an event for the specified user
 *
 * @param {NextRequest} req
 * @param {{params:{username: string, eventId: string}}} context
 * @returns {NextResponse}
 */
export async function PATCH(req, context) {
  const { username, eventId } = context.params;
  const updatedEvent = await req.json(); // Ensure this has the updated event data

  try {
    const UserModel = await createUserModel();
    const user = await UserModel.findOne({ username });
    updatedEvent.start = new Date(updatedEvent.start);
    updatedEvent.end = new Date(updatedEvent.end);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the event exists
    const eventExists = user.events.some((event) => event.id === eventId);
    if (!eventExists) {
      alert("Event not found");
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Update the event in the user's events array
    user.events = user.events.map((event) =>
      event.id === eventId ? { ...event, ...updatedEvent } : event
    );

    // Save the user document
    await user.save();

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
