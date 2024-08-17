import { auth } from "@/auth";
import Title from "@/components/title";
import Link from "next/link";
import styles from './page.module.scss';

export default async function Home() {
  const session = await auth();

  return (
    <main className={styles.main}>
      {/* Main Content Area */}
      <div className={styles.content}>
        <header className={styles.header}>
          <Title text={`👋 Welcome, ${session ? session.user.name : "student"}!`} />
          <div className={styles.profileIcon}></div>
        </header>

        {/* Cards Section */}
        <section className={styles.cardsSection}>
          {/* GPA Calculator Box */}
          <Link href="/calculator">
            <div className={styles.card}>
              <h2>GPA Calculator</h2>
              <div className={styles.addIcon}>+</div>
            </div>
          </Link>

          {/* Time Table Planner Box */}
          <Link href="/timetable">
            <div className={styles.card}>
              <h2>Time Table Planner</h2>
              <div className={styles.addIcon}>+</div>
            </div>
          </Link>

          {/* To-Do List Box */}
          <Link href="/todo">
            <div className={styles.card}>
              <h2>To-Do List</h2>
              <div className={styles.addIcon}>+</div>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
