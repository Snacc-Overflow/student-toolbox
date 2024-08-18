"use client";

import Title from "@/components/title";
import Calendar from "../../components/calendar/calendar";
import { useSession } from "next-auth/react";

export default function TimetablePage() {
  const session = useSession();
  const username = session?.data?.user?.name;
  return (
    <main>
      <Title text="Timetable" />
      <Calendar username={username} />
    </main>
  );
}
