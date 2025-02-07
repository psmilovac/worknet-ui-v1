// Login page has different layout then Other pages
import Navbar from "../navigation/Navbar";
import { AuthProvider } from "../context/AuthContext";
import { SettingsProvider } from "../context/SettingsContext";

export default function LandingLayout({ children }) {
  return (
    <AuthProvider>
      <SettingsProvider>
        {/* <Navbar /> */}
        <main>{children}</main>
      </SettingsProvider>
    </AuthProvider>
  );
}
