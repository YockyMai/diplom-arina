import React from "react";
import "./styles.css";
import logoSrc from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
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
          <a
            style={{ color: "#FFF" }}
            className={"header__links"}
            href="/Menu#about"
          >
            О нас
          </a>
          <a
            style={{ color: "#FFF" }}
            className={"header__links"}
            href="/Menu#services"
          >
            Услуги и цены
          </a>
          <a
            style={{ color: "#FFF" }}
            className={"header__links"}
            href="/Menu#footer"
          >
            Контакты
          </a>
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
