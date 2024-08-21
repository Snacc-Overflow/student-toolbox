"use client";

import { useSession } from "next-auth/react";
import styles from "./auth.module.scss";
import Avatar from "./avatar";

export default function LayoutAvatar() {
  const session = useSession();

  if (!session?.data?.user?.name) return null;

  return (
    <div className={styles["layout-avatar"]}>
      <Avatar size={48} username={session.data.user.name} />
    </div>
  );
}
