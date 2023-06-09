import React, { useEffect, useState } from "react";
import "./styles.css";
import logoSrc from "../../assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  Text,
  Menu,
  UnstyledButton,
  Group,
  Container,
  Box,
  Drawer,
  Button,
  Stack,
} from "@mantine/core";
import { signOut } from "../../store/slices/userSlice";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons-react";

const Header = () => {
  const navigate = useNavigate();

  const { user, isAuth } = useAppSelector((state) => state.user);
  const role = useAppSelector((state) => state.user.user.role);
  const dispatch = useAppDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
      smoothScrollTo(0, scrollDuration);
    }
    if (hash === "#services") {
      smoothScrollTo(500, scrollDuration);
    }
    if (hash === "#footer") {
      smoothScrollTo(4200, scrollDuration);
    }
    if (!hash) {
      smoothScrollTo(0, scrollDuration);
    }
  }, [hash]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0,0,0,0.7)",
        position: "fixed",
        width: "100%",
        zIndex: 100,
      }}
    >
      <Container size={"xl"} sx={{ width: "100%" }}>
        <Group spacing={"xl"} position={"apart"}>
          <Link to={"/"}>
            <Group noWrap>
              <img
                style={{ height: 80 }}
                src={logoSrc as any}
                alt="Beauty Saloon"
              />
              <h1 style={{ color: "#FFF" }}>Студия63</h1>
            </Group>
          </Link>
          <Group>
            {screenWidth > 905 ? (
              <>
                <Link
                  style={{ color: "#FFF" }}
                  className={"header__links"}
                  to="/Menu#about"
                >
                  <Text size={"lg"}>О нас</Text>
                </Link>
                <Link
                  style={{ color: "#FFF" }}
                  className={"header__links"}
                  to={"/Menu#services"}
                >
                  <Text size={"lg"}> Услуги и цены</Text>
                </Link>
                <Link
                  style={{ color: "#FFF" }}
                  className={"header__links"}
                  to={"/Menu#footer"}
                >
                  <Text size={"lg"}>Контакты</Text>
                </Link>
                <Link
                  style={{ color: "#FFF" }}
                  className={"header__links"}
                  to={"/masters"}
                >
                  <Text size={"lg"}>Мастера</Text>
                </Link>
              </>
            ) : (
              <IconMenu2 color={"#FFF"} onClick={open} />
            )}
            {isAuth ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton>
                    <Text
                      size={"lg"}
                      sx={{ whiteSpace: "nowrap" }}
                      color={"#FFFFFF"}
                    >
                      {user.username}
                    </Text>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item style={{ color: "#000000" }} onClick={signOutFunc}>
                    <Text size={"lg"}>Выйти</Text>
                  </Menu.Item>
                  {isAuth && (
                    <>
                      {role === "USER" && (
                        <Menu.Item
                          style={{ color: "#000000" }}
                          component={Link}
                          to={"/appointment"}
                        >
                          <Text size={"lg"}>Мои записи</Text>
                        </Menu.Item>
                      )}
                      {role === "MASTER" && (
                        <Menu.Item
                          style={{ color: "#000000" }}
                          component={Link}
                          to={"/master"}
                        >
                          <Text size={"lg"}>Записи</Text>
                        </Menu.Item>
                      )}
                      {role === "ADMIN" && (
                        <Menu.Item
                          style={{ color: "#000000" }}
                          component={Link}
                          to={"/admin"}
                        >
                          <Text size={"lg"}>Админ панель</Text>
                        </Menu.Item>
                      )}
                    </>
                  )}
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Link to="/registration" style={{ color: "#FFF" }}>
                <Text size={"lg"}>Регистрация</Text>
              </Link>
            )}
          </Group>
        </Group>
        {screenWidth <= 905 && (
          <Drawer opened={opened} onClose={close}>
            <Stack>
              <Link
                style={{ color: "#FFF" }}
                className={"header__links"}
                to="/Menu#about"
              >
                <Text color={"#000"} size={"lg"}>
                  О нас
                </Text>
              </Link>
              <Link
                style={{ color: "#FFF" }}
                className={"header__links"}
                to={"/Menu#services"}
              >
                <Text color={"#000"} size={"lg"}>
                  {" "}
                  Услуги и цены
                </Text>
              </Link>
              <Link
                style={{ color: "#FFF" }}
                className={"header__links"}
                to={"/Menu#footer"}
              >
                <Text color={"#000"} size={"lg"}>
                  Контакты
                </Text>
              </Link>
              <Link
                style={{ color: "#FFF" }}
                className={"header__links"}
                to={"/masters"}
              >
                <Text color={"#000"} size={"lg"}>
                  Мастера
                </Text>
              </Link>
            </Stack>
          </Drawer>
        )}
      </Container>
    </Box>
  );
};

export default Header;
