import styles from "./SideProfileMenu.module.css";
import Link from "next/link";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { useStatus } from "@/context/contextStatus";
import { toast } from "react-toastify";

export default function SideProfileMenu() {
  const {
    profileMenu,
    setProfileMenu,
    token,
    setToken,
    setUserData,
    
  } = useStatus();
  const router = useRouter();

  const handleLogout = () => {
    toast("Successfully logged out!");
    setToken(null);
    setUserData(null);
    destroyCookie({}, "token", {
      path: "/",
    });
    destroyCookie({}, "user", {
      path: "/",
    });
    destroyCookie({}, "userId", {
      path: "/",
    });

    router.push("/");
    setProfileMenu(false);
  };
  const wrapperRef = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setProfileMenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, profileMenu]);

  const handleLogin = () => {
    router.push("/auth");
    setProfileMenu(false);
  };

  const handleSignUp = () => {
    router.push("/auth");
   
    setProfileMenu(false);
  };

  return (
    <div className={`${profileMenu ? styles.main__wrapper : ``}`}>
      <div
        ref={wrapperRef}
        className={`${styles.main}  ${profileMenu ? styles.show : styles.hide}`}
      >
        <div className={styles.header}>
          <h4 className="text-black font-semibold">Profile</h4>
          <svg
            className="fill-current text-black h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={() => setProfileMenu(false)}
          >
            <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
          </svg>
        </div>
        <div className={styles.list}>
          <ul>
            {/* <li>shahidul</li> */}
            {token ? (
              <div>
                <Link
                  prefetch={false}
                  href="/"
                  onClick={() => setProfileMenu(false)}
                >
                  <li className="text-black">Home</li>
                </Link>
                <hr />
                <Link
                  prefetch={false}
                  href="/profile"
                  onClick={() => setProfileMenu(false)}
                >
                  <li className="text-black">My Profile </li>
                </Link>
                <hr />
                <ul onClick={handleLogout}>
                  <li
                    className="text-black"
                    onClick={() => setProfileMenu(false)}
                  >
                    Log out
                  </li>
                </ul>
                <hr />
              </div>
            ) : (
              <div>
                <ul onClick={handleLogin}>
                  <li
                    className="text-black"
                    onClick={() => setProfileMenu(false)}
                  >
                    Login
                  </li>
                </ul>
                <hr />
                <ul onClick={handleSignUp}>
                  <li
                    className="text-black"
                    onClick={() => setProfileMenu(false)}
                  >
                    Sign up
                  </li>
                </ul>
                <hr />
              </div>
            )}

          
          </ul>
        </div>
      </div>
    </div>
  );
}
