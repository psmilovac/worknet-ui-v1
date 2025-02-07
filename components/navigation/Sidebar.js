import Link from "next/link";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import { sidebar_list } from "./SidebarMenuItems.js";

export default function Sidebar() {
  const testClick = () => {
    let titles = sidebar_list.map((tit) => {
      tit.title;
    });
    console.log(
      sidebar_list.map((tit) => {
        tit.title;
      })
    );
  };

  return (
    <div className={styles.container}>
      {/* ~~~~~~~ Sidebar Starts ~~~~~~~ */}
      <nav className={styles.sidebar}>
        <div className={styles.sidebar_content}>
          
          {/* ~~~~~~~ Product Section Starts ~~~~~~~*/}
          <div className={styles.product}>
            <div className={styles.product_logo}>
            <Image
                  src="/ps_triangle_gray.svg"
                  alt="PowerSecure Logo"
                  width={30}
                  height={30}
                  priority
                />
            </div>
            <div className={styles.product_data}>
              <div className={styles.product_name}>BalanceGear15</div>
              <div className={styles.product_description}>
                Medium Voltage Switchgear
              </div>
            </div>
          </div>
          {/* Product Section Ends */}

          {/* ~~~~~ Main Menu Starts ~~~~~~~ */}
          <div className={styles.sidebar_menu_items}>
            <ul className={styles.sidebar_items}>
              {sidebar_list.map((item, index) => (
                <li key={index}>
                  <h4 className={styles.sidebar_title}>
                    <Link href={item.title_href}>{item.title}</Link>
                  </h4>
                  <ul className={styles.sidebar_submenu}>
                    {item.item.map((sub, indx) => (
                      <li className={styles.submenu_item} key={indx}>
                        <Link href={sub.href}>{sub.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
