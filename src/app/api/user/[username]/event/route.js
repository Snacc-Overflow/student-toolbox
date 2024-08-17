import { createUserModel } from "@/lib/mongodb/mongodb";
import { NextResponse } from "next/server";

/**
 * Retrieves all events for the specified user
 *
 * @param {NextRequest} req
 * @param {{params:{username: string}}} context
 * @returns {NextResponse}
 */
export async function GET(req, context) {
  const username = context.params.username;
  const UserModel = await createUserModel();
  const user = await UserModel.findOne({ username });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user.events);
}

/**
 * Creates a new event for the specified user
 *
 * @param {NextRequest} req
 * @param {{params:{username: string}}} context
 * @returns {NextResponse}
 */
export async function POST(req, context) {
  const username = context.params.username;
  const UserModel = await createUserModel();
  const { event } = await req.json();

  const user = await UserModel.findOne({ username });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    user.events.push(event);
    await user.save();
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Deletes an event for the specified user
 *
 * @param {NextRequest} req
 * @param {{params:{username: string}}} context
 * @returns {NextResponse}
 */
export async function DELETE(req, context) {
  const username = context.params.username;
  const UserModel = await createUserModel();
  const { eventId } = await req.json();

  const user = await UserModel.findOne({ username });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    user.events = user.events.filter((e) => e.id !== eventId);
    await user.save();
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Handles unsupported HTTP methods
 *
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export function handler(req) {
  return NextResponse.json(
    { error: `Method ${req.method} Not Allowed` },
    { status: 405 }
  );
}
