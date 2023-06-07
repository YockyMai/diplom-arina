import React, { useEffect } from "react";
import "./Main.css";
import aboutAsImg from "../assets/imgForAboutUsOne.jpg";
import specialists from "../assets/specialists.svg";
import acii from "../assets/acii.svg";
import krasota from "../assets/krasota.svg";
import card from "../assets/card.svg";
import location from "../assets/location.svg";
import { useAppSelector } from "../store/hooks";
import {
  Box,
  Button,
  Center,
  Container,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import backgroundMenu from "../assets/backgroundMenu.jpg";

const MainPage = () => {
  const { isAuth } = useAppSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <MainLayout>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={backgroundMenu}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100vh",
            zIndex: -1,
          }}
          alt=""
        />
        <Title
          color={"#FFF"}
          p={"xl"}
          sx={{ backgroundColor: "rgba(0,0,0,0.46)", width: "fit-content" }}
        >
          Мы позаботимся о вашей красоте!
        </Title>
      </Box>

      <Box py={"xl"} sx={{ backgroundColor: "rgba(180,146,132,0.78)" }}>
        <Stack>
          <Title color={"#FFF"} align={"center"}>
            У нас
          </Title>
          <Group>
            <div className="price__list__item">
              <img src={specialists} alt="" />
              <p>Лучшие специалисты</p>
            </div>
            <div className="price__list__item">
              <img src={acii} alt="" />
              <p>скидки и акции</p>
            </div>
            <div className="price__list__item">
              <img src={krasota} alt="" />
              <p>красота и комфорт</p>
            </div>
            <div className="price__list__item">
              <img src={card} alt="" />
              <p>доступные цены</p>
            </div>
            <div className="price__list__item">
              <img src={location} alt="" />
              <p>удобное расположение</p>
            </div>
          </Group>
        </Stack>
      </Box>
      <Container my={100} size={"xl"}>
        <SimpleGrid cols={2}>
          <Center>
            <Stack align={"center"}>
              <Title>Приглашаем в наш салон красоты</Title>
              <Text align={"center"}>
                Мы создаем красоту, предоставляя качественные услуги в
                дружелюбной обстановке по доступным ценам. Мы строим одну из
                лучших сетей салонов красоты в России, успех которой основан на
                доверии, честности и гармонии в команде.
              </Text>
              <Center>
                {isAuth ? (
                  <Button
                    component={Link}
                    to={"/Menu#services"}
                    size={"xl"}
                    style={{ flex: 1, borderColor: "#B49284" }}
                    sx={{
                      color: "#B49284",
                      width: "100%",
                      transition: "0.3s",
                      ":hover": {
                        backgroundColor: "#B49284",
                        color: "#FFF",
                        transition: "0.3s",
                      },
                    }}
                    variant={"outline"}
                  >
                    Записаться
                  </Button>
                ) : (
                  <Text>
                    Чтобы записаться на услугу необходимо зарегистрироваться.
                  </Text>
                )}
              </Center>
            </Stack>
          </Center>

          <Image width={"100%"} src={aboutAsImg} alt="" />
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
};

export default MainPage;
