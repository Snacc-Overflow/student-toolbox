import DatabaseExample from "@/components/dashboard/database-example";
import Title from "@/components/title";

export default async function Home() {
  return (
    <main>
      <Title text={`👋 Welcome, "student"`} />
      <DatabaseExample />
    </main>
  );
}
