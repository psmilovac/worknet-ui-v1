// Login page has different layout then Other pages
import MainHeader from "../navigation/MainHeader";
import Navbar from "../navigation/Navbar";
import Sidebar from "../navigation/Sidebar";
import Footer from "../navigation/Footer";
import styles from "./ProductSubLayout.module.css";
import { AuthProvider } from "../context/AuthContext";
import { SettingsProvider } from "../context/SettingsContext";

// id=modal-root line is test

export default function ProductSubLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <SettingsProvider>
          <MainHeader />
          <Navbar />
          <div className={styles.central_container}>
            <Sidebar />
            <div className={styles.main}>{children}</div>
          </div>
          {/* <div id="modal-root"></div> */}
          <Footer />
        </SettingsProvider>
      </AuthProvider>
    </>
  );
}
