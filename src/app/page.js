import { auth } from "@/auth"
import DatabaseExample from "@/components/dashboard/database-example"
import Title from "@/components/title"
import styles from './page.module.scss'
import DashboardItem from "@/components/dashboard/dashboardItem";

export default async function Home() {
  const session = await auth()
  const dashboardItems = [
    { title: 'To-Do List', icon: '/icons/todolist.png', link: '/todo' },
    { title: 'Timetable', icon: '/icons/timetable.png', link: '/timetable' },
    { title: 'GPA Calculator', icon: '/icons/calculator.png', link: '/calculator' },
  ];

  return (
    <main>
      <Title
        text={`👋 Welcome, ${session ? session?.user?.name : "student"}!`}
      />
      <div className={styles.dashboard}>
        {dashboardItems.map((item, index) => (
          <DashboardItem
            key={index}
            title={item.title}
            icon={item.icon}
            link={item.link}
          />
        ))}
      </div>
      <DatabaseExample />
    </main>
  )
}
