import { createUserModel } from "@/lib/mongodb/mongodb";

export default async function handler(req, res) {
  const User = await createUserModel();

  // Get the user (Assuming you're managing user sessions)
  const user = await User.findOne({ username: "exampleUser" });

  switch (req.method) {
    case "GET": // Fetch all events
      if (user) {
        res.status(200).json(user.events);
      } else {
        res.status(404).json({ error: "User not found" });
      }
      break;

    case "POST": // Create a new event
      const { event } = req.body;
      if (user) {
        user.events.push(event);
        await user.save();
        res.status(201).json(event);
      } else {
        res.status(404).json({ error: "User not found" });
      }
      break;

    case "DELETE": // Delete an event
      const { eventId } = req.body;
      if (user) {
        user.events = user.events.filter((e) => e.id !== eventId);
        await user.save();
        res.status(204).end();
      } else {
        res.status(404).json({ error: "User not found" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
