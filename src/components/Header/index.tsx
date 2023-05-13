import React, { useEffect } from "react";
import "./styles.css";
import logoSrc from "../../assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Text, Menu, UnstyledButton } from "@mantine/core";
import { signOut } from "../../store/slices/userSlice";

const Header = () => {
  const navigate = useNavigate();

  const { user, isAuth } = useAppSelector((state) => state.user);
  const role = useAppSelector((state) => state.user.user.role);
  const dispatch = useAppDispatch();

  const signOutFunc = () => {
    dispatch(signOut());
    navigate("/");
  };

  const { hash } = useLocation();

  function smoothScrollTo(targetY: number, duration: number) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime: any = null;

    function scrollStep(timestamp: any) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const scrollTop = startY + distance * progress;
      window.scrollTo(0, scrollTop);
      if (progress < 1) window.requestAnimationFrame(scrollStep);
    }

    window.requestAnimationFrame(scrollStep);
  }

  useEffect(() => {
    const scrollDuration = 500;
    if (hash === "#about") {
      smoothScrollTo(1100, scrollDuration);
    }
    if (hash === "#services") {
      smoothScrollTo(1800, scrollDuration);
    }
    if (hash === "#footer") {
      smoothScrollTo(4200, scrollDuration);
    }
    if (!hash) {
      smoothScrollTo(0, scrollDuration);
    }
  }, [hash]);

  return (
    <div className="header">
      <div className="container">
        <Link to={"/"}>
          <div className="header__logo">
            <img src={logoSrc as any} alt="Beauty Saloon" />
            <h1>Студия63</h1>
          </div>
        </Link>
        <div className="header__menu">
          <Link to={"/Menu"} style={{ color: "#FFF" }}>
            Главная
          </Link>
          <Link
            style={{ color: "#FFF" }}
            className={"header__links"}
            to="/Menu#about"
          >
            О нас
          </Link>
          <Link
            style={{ color: "#FFF" }}
            className={"header__links"}
            to={"/Menu#services"}
          >
            Услуги и цены
          </Link>
          <Link
            style={{ color: "#FFF" }}
            className={"header__links"}
            to={"/Menu#footer"}
          >
            Контакты
          </Link>
          {isAuth ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton>
                  <Text color={"#FFFFFF"}>{user.username}</Text>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  color={"red"}
                  style={{ color: "#000000" }}
                  onClick={signOutFunc}
                >
                  Выйти
                </Menu.Item>
                {isAuth && (
                  <>
                    {role === "USER" && (
                      <Menu.Item
                        style={{ color: "#000000" }}
                        component={Link}
                        to={"/appointment"}
                      >
                        Мои записи
                      </Menu.Item>
                    )}
                    {role === "MASTER" && (
                      <Menu.Item
                        style={{ color: "#000000" }}
                        component={Link}
                        to={"/master"}
                      >
                        записи
                      </Menu.Item>
                    )}
                    {role === "ADMIN" && (
                      <Menu.Item
                        style={{ color: "#000000" }}
                        component={Link}
                        to={"/admin"}
                      >
                        Админ панель
                      </Menu.Item>
                    )}
                  </>
                )}
              </Menu.Dropdown>
            </Menu>
          ) : (
            <a href="/registration" style={{ color: "#FFF" }}>
              Регистрация
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
