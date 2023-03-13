import React from "react";
import "./styles.css";
import logoSrc from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Text, Menu, UnstyledButton } from "@mantine/core";
import { signOut } from "../../store/slices/userSlice";

const Header = () => {
  const { user, isAuth } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const signOutFunc = () => {
    dispatch(signOut());
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
          <Link to={"/Menu"}>Главная</Link>
          <a className={"header__links"} href="/Menu#about">
            О нас
          </a>
          <a className={"header__links"} href="/Menu#services">
            Услуги и цены
          </a>
          <a className={"header__links"} href="/Menu#footer">
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
                <Menu.Item color={"red"} onClick={signOutFunc}>
                  Выйти
                </Menu.Item>
                {isAuth && (
                  <Menu.Item component={Link} to={"/appointment"}>
                    Мои записи
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          ) : (
            <a href="/registration">Регистрация</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
