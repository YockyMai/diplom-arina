import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import Main from "./pages/Main";
import Menu from "./pages/Menu";
import Registration from "./pages/Registration";
import Login from "./pages/Login/Login";
import EventsPageDetailing from "./pages/EventsPageDetailing";
import { check } from "./store/slices/userSlice";
import MyAppointment from "./pages/MyAppointment";
import EventsPage from "./pages/EvenetsPage";
import MasterPage from "./pages/Master";
import AdminPage from "./pages/AdminPage";
import Services from "./pages/Services";

function App() {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const role = useAppSelector((state) => state.user.user.role);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(check());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Main />} />
          <Route path={"/menu"} element={<Menu />} />
          <Route path={"/Services"} element={<Services />} />

          {isAuth ? (
            <>
              {role === "MASTER" && (
                <Route path={"/master"} element={<MasterPage />} />
              )}
              {role === "ADMIN" && (
                <Route path={"/admin"} element={<AdminPage />} />
              )}
              <Route path={"/events"} element={<EventsPage />} />
              <Route
                path={"/events/:eventId"}
                element={<EventsPageDetailing />}
              />
              <Route path={"/appointment"} element={<MyAppointment />} />
            </>
          ) : (
            <>
              <Route path={"/registration"} element={<Registration />} />
              <Route path={"/login"} element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
