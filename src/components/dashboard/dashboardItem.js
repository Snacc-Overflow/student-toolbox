import styles from './dashboardItem.module.scss';

export default function DashboardItem({ title, icon, link }) {
  return (
    <div className={styles.dashboardItemContainer}>
      <p className={styles.dashboardItemTitle}>{title}</p>
      <a href={link} className={styles.dashboardItem}>
        <img src={icon} alt={`${title} icon`} className={styles.icon} />
      </a>
    </div>
  );
}

