import styles from "./Footer.module.css";
import { api_root } from "@/global/global_vars";
import useSWR from "swr";

export default function Footer() {
  const logo = "©2025 Worknet by PowerSecure";

  const fetcher = (...arg) => fetch(...arg).then((res) => res.json());
  const back_end_root_api = api_root;
  let back_end_version = "No version data";
  
  const { data, error, isLoading } = useSWR(back_end_root_api, fetcher);
  if (isLoading) back_end_version = "Loading...";
  if (!data) back_end_version = "No version data"
  if (error) back_end_version = "Failed to connect"
  if (data) back_end_version = data.back_end_version

  return (
    <footer className={styles.container}>
      <div className={styles.title}>© 2025 PowerSecure Worknet</div>
      <div className={styles.title}>Version: A.3.193 - {back_end_version} </div>
    </footer>
  );
}
