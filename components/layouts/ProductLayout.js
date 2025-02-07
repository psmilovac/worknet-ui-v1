import MainHeader from "../navigation/MainHeader";
import Navbar from "../navigation/Navbar";
import Sidebar from "../navigation/Sidebar";
import Footer from "../navigation/Footer";
import styles from "./ProductLayout.module.css";
import { AuthProvider } from "../context/AuthContext";
import { SettingsProvider } from "../context/SettingsContext";

export default function ProductLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <SettingsProvider>
          <MainHeader />
          <Navbar />
          <div className={styles.central_container}>
            {/* <Sidebar /> */}
            <main>{children}</main>
          </div>
          <Footer />
        </SettingsProvider>
      </AuthProvider>
    </>
  );
}
