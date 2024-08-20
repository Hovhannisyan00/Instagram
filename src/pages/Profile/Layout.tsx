import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { handleLogout, verifyUser } from "../../helpers/api";
import { IUser } from "../../helpers/types";

export const Layout = () => {
  const [account, setAccount] = useState<IUser | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    verifyUser().then((response) => {
      if (!response.user) {
        navigate("/login");
      } else {
        setAccount(response.user);
      }
    });
  }, []);

  const logout = () => {
    handleLogout().then(() => navigate("/login"));
  };

  return (
    account && (
      <>
      <div>

        <nav>
          <NavLink to="/profile" end>Profile</NavLink>
          <NavLink to="/profile/settings">Settings</NavLink>
          <NavLink to="/profile/search">Search</NavLink>
          <NavLink to="/profile/followers">Followings</NavLink>
          <NavLink to="/profile/followings">Followiers</NavLink>
          <NavLink to="/profile/albums">Photos</NavLink>
          <NavLink to="/profile/requests">Requests</NavLink>


          <button onClick={logout}>Log out</button>
        </nav>
        <Outlet context={{ account, setAccount }} />
      </div>
      </>
    )
  );
};
