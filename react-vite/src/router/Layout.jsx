import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import LandingPage from "../components/LandingPage";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
{sessionUser ?
    <div className="logged-in">
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
      </div>
 :
 <div className="logged-out">
  <ModalProvider>
    <LandingPage />
      <Modal />
  </ModalProvider>
 </div>



}
</>

  );
}
