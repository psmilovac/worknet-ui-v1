import styles from "@/styles/landing.module.css";
import ButtonWide from "../components/ui/buttons/ButtonWide";
import LandingLayout from "@/components/layouts/LandingLayout";
import MainHeader from "@/components/navigation/MainHeader";
import { useState, useContext, useEffect } from "react";
import { api_root } from "@/global/global_vars";
import axios from "axios";
import AuthContext from "@/components/context/AuthContext.js";
import handler from "./api/hello";
import { useRouter } from "next/router";
import Image from "next/image";

const url = api_root + "/api/login";

// Home Page will have unique Layout
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");
  const [message, setMessage] = useState("");

  const { loading, error, isAuthenticated, login } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      setMessage(error);
      // console.log(error);
      // router.push("/");
    }
    if (isAuthenticated && !loading) {
      router.push("/");
      // router.push("/");
    }
    // if (!isAuthenticated) {
    //   router.push("/");
    // }
  }, [loading, error, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();
    login({ username: email, password }); // call internal login function on api/aut/login
  };

  const onLoginClick = (e) => {
    e.preventDefault();
    const reqBody = { username: email, password };
    const config = { "content-type": "application/json" };
    try {
      axios
        .post(url, reqBody, config)
        .then((res) => setUserData(res.data))
        .then(() => console.log(userData));
    } catch (error) {
      console.log(error);
    }
  };

  const onLoginClickTest = (e) => {
    e.preventDefault();
    const test = handler();
    console.log("handler:", test);
  };

  return (
    <>
      <MainHeader />
      <main className={styles.main}>
        <div className={styles.login}>
          <h3 style={{ textAlign: "center" }}>Welcome</h3>
          <div style={{ textAlign: "center", margin: "2rem 0" }}>
            <Image
              // src="/powersecure_color.svg"
              src="/ps_triangle_color.svg"
              alt="PowerSecure Logo"
              width={50}
              height={50}
              priority
            />
          </div>
          <form>
            <label htmlFor="uname">
              <b>Username</b>
            </label>
            <input
              className={styles.input_text}
              type="email"
              placeholder="Enter email"
              name="uname"
              required
              onChange={(e) => setEmail(e.target.value)}
              pattern="\S+@\S+\.\S+"
              title="Your email is invalid"
            />
            <div></div>
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              className={styles.input_text}
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br />
            <span style={{ fontSize: "0.9rem", color: "red" }}>
              {message ? message : ""}
            </span>{" "}
            <div
              style={{
                width: "100%",
                margin: "1rem 0 0 0",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ButtonWide type="submit" onClick={submitHandler}>
                {loading ? "Authenticating..." : "Login"}
              </ButtonWide>
            </div>
          </form>
          <div
            style={{
              width: "100%",
              margin: "1rem 0 0 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* <ButtonWide link="/product/bg15/application/quotes">
              Enter as a Guest
            </ButtonWide> */}
          </div>
        </div>
      </main>
    </>
  );
}

// Login page has different layout then Other pages
LoginPage.getLayout = function getLayout(page) {
  return (
    <>
      <LandingLayout>{page}</LandingLayout>
    </>
  );
};
