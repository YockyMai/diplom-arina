import React from "react";
import "./Menu.css";
import nogti from "../assets/nogti.png";
import brovki from "../assets/brovki.png";
import resn from "../assets/resn.png";
import depil from "../assets/depil.png";
// @ts-ignore
import Studio63 from "../assets/Studio63.webp";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  Box,
  Center,
  Container,
  Group,
  Image,
  List,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

const MenuPage = () => {
  return (
    <div>
      <Header />
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={Studio63}
          alt=""
          sx={{
            position: "absolute",
            zIndex: -1,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <Container>
          <Stack>
            <Title
              color={"#FFF"}
              sx={{ backgroundColor: "rgba(0,0,0,0.56)" }}
              mb={"xl"}
              p={"xl"}
              mt={150}
              align={"center"}
            >
              Добро пожаловать в Студию63 - самый креативный салон красоты в
              городе Уфа
            </Title>
            <List
              icon={<IconStar color={"#fff99d"} />}
              p={30}
              sx={{ backgroundColor: "rgba(0,0,0,0.56)" }}
              spacing={"lg"}
            >
              <List.Item>
                <Text color={"#FFF"}>
                  У нас есть все для комплексного, а значит самого эффективного
                  ухода за самыми хрупкими и в тоже время самыми заметными
                  гранями вашей привлекательности.
                </Text>
              </List.Item>
              <List.Item>
                <Text color={"#FFF"}>
                  Если чувствуешь, что нуждаешься в обновлении не только
                  внешнем, но и внутреннем - тогда спешите к нам в салон! Но мы
                  не просто очередной салон красоты, мы Бьюти-бар - здесь одни
                  из самых лучших и квалифицированных специалистов собраны в
                  одном месте.
                </Text>
              </List.Item>
              <List.Item>
                <Text color={"#FFF"}>
                  Мы готовы предоставить полный спектр услуг, и ты можешь
                  подготовить себя к любому значимому мероприятию. Здесь ты
                  «свой», здесь нет дискомфорта, все как дома, уют и тепло🌹
                  Радуй себя и своё тело ❤ Ну а мы ждём тебя.
                </Text>
              </List.Item>
              <List.Item>
                <Text color={"#FFF"}>
                  Мы хотели сделать невозможное — предоставить качественный
                  сервис каждому, чтобы любой человек, вне зависимости от своего
                  достатка, возраста, вкусовых предпочтений, смог получить
                  качественную услугу и стать еще счастливее.
                </Text>
              </List.Item>
            </List>
          </Stack>
        </Container>
      </Box>

      <div id="services" style={{ paddingTop: 100 }} className="our__services">
        <p>Наши услуги</p>
        <div className="services__wrapper">
          <Link to={"/Services#depil"}>
            <div className="service_card">
              <img src={resn} alt="" />
              <p>Ресницы. Особенные техники наращивания</p>
            </div>
          </Link>
          <Link to={"/Services#cosmet"}>
            <div className="service_card">
              <img src={depil} alt="" />
              <p>Педикюр, уход за вашим ножками.</p>
            </div>
          </Link>
          <Link to={"/Services#brovi"}>
            <div className="service_card">
              <img src={brovki} alt="" />

              <p>Оформление и окрашивание бровей.</p>
            </div>
          </Link>{" "}
          <Link to={"/Services#manik"}>
            <div className="service_card">
              <img src={nogti} alt="" />

              <p>Маникюр. Услуга в четыре руки</p>
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MenuPage;
