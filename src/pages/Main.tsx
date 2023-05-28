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
      <Container mt={100} size={"xl"}>
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
                  <Box
                    component={Link}
                    to={"/events"}
                    style={{
                      backgroundColor: "#B49284",
                      width: 150,
                      height: 150,
                      borderRadius: "50%",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ textDecoration: "none", color: "#FFF" }}>
                      Записаться
                    </p>
                  </Box>
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

      <Box mt={100} py={"xl"} sx={{ backgroundColor: "#B49284" }}>
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
      <Container size={"lg"} py={150}>
        <Group align={"center"} position={"apart"}>
          <div>
            <Title align={"left"} order={2}>
              Адрес
            </Title>
            <Text align={"left"}>Г.Уфа, ул. Гоголя, д63/1</Text>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2303.725158641774!2d55.938071216049345!3d54.732049077715146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43d93a67de6d954d%3A0x8cf8a4c918d85972!2z0YPQuy4g0JPQvtCz0L7Qu9GPLCA2My8xLCDQo9GE0LAsINCg0LXRgdC_LiDQkdCw0YjQutC-0YDRgtC-0YHRgtCw0L0sIDQ1MDA3Ng!5e0!3m2!1sru!2sru!4v1663940063896!5m2!1sru!2sru"
            width="600"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Group>
      </Container>
    </MainLayout>
  );
};

export default MainPage;
