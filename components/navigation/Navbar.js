import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.js";
import ButtonMini from "../ui/buttons/ButtonMini";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useContext(AuthContext) || {}; // error will show without || {}

  const logoutHandler = () => {
    logout();
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <ul>
            {/* <li className={styles.logo}> */}
            <li>
              {isAuthenticated ? (
                <Link
                  href={
                    process.env.NODE_ENV !== "development"
                      ? "https://powersecure.com/"
                      : "https://powersecure.com/"
                  }
                >
                  <Image
                    // src="/powersecure_color.svg"
                    src="/ps_triangle_color.svg"
                    alt="PowerSecure Logo"
                    width={40}
                    height={40}
                    priority
                  />
                </Link>
              ) : (
                <Link
                  href={
                    process.env.NODE_ENV !== "development"
                      ? "https://worknet.app/"
                      : "/"
                  }
                >
                  <Image
                    // src="/powersecure_color.svg"
                    src="/ps_triangle_color.svg"
                    alt="PowerSecure Logo"
                    width={40}
                    height={40}
                    priority
                  />
                </Link>
              )}
            </li>

            {isAuthenticated && (
              <li className={styles.navigation_text}>
                <Link href="/">Home</Link>
              </li>
            )}
            {/* The link works but it is not ready */}
            {/* {isAuthenticated && (
              <li className={styles.navigation_text}>
                <Link
                  // href="#"
                  href="https://powersecure-docs.vercel.app/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Documentation
                </Link>
              </li>
            )} */}

           
            {/* <li className={styles.navigation_text}>
              {user && <Link href="/service">Services</Link>}
            </li> */}
          </ul>
        </nav>

        <div className={styles.navigation}>
          <ul>
            {/* <li className={styles.search_box}>
              <input type="text" placeholder="Search documentation..." />
            </li> */}
          </ul>
        </div>
        <div className={styles.navigation}>
          <ul>
          <li className={styles.navigation_text}>
              {user && <Link href="#">{user.first_name} {user.last_name}</Link>}
            </li>
            <li
              className={styles.navigation_text}
              style={{ margin: "0 0 1rem 0" }}
            >
              {user && <ButtonMini onClick={logoutHandler}>Logout</ButtonMini>}
            </li>
          </ul>
        </div>
      </header>
    </main>
  );
}
