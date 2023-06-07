import React, { useEffect, useState } from "react";
import "./Services.css";
import servicesAndPricesBackground from "../assets/servicesAndPricesBackground.jpg";
import cosmetBackground from "../assets/cosmetBackground.jpg";
import brovkiBackground from "../assets/brovkiBackground.jpg";
import manikBackground from "../assets/manikBackground.jpg";
import pedikBackground from "../assets/pedik.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";
import {
  BackgroundImage,
  Box,
  Button,
  Center,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IService } from "../types/objects/service";
import { CategoriesVariants, ServiceApi } from "../api/ServiceApi";
import { showNotification } from "@mantine/notifications";

const ServiceItem = ({ service }: { service: IService }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(0,0,0,0.6)",
        color: "#FFF",
        padding: 10,
        textAlign: "center",
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Title order={3}>{service.name}</Title>
        <Text align={"left"} lineClamp={7}>
          {service.description}
        </Text>
      </div>
      <div>
        <Button
          component={Link}
          to={`/events/${service.id}`}
          size={"xl"}
          mb={10}
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
          Подробнее
        </Button>
      </div>
    </Box>
  );
};

const Services = () => {
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
    if (hash === "#depil") {
      smoothScrollTo(0, scrollDuration);
    }
    if (hash === "#cosmet") {
      smoothScrollTo(900, scrollDuration);
    }
    if (hash === "#brovi") {
      smoothScrollTo(1800, scrollDuration);
    }
    if (hash === "#manik") {
      smoothScrollTo(2800, scrollDuration);
    }
  }, [hash]);

  const [pedicure, setPedicure] = useState<IService[]>([]);
  const [brows, setBrows] = useState<IService[]>([]);
  const [eyelashes, setEyelashes] = useState<IService[]>([]);
  const [manicure, setManicure] = useState<IService[]>([]);

  useEffect(() => {
    ServiceApi.getAll()
      .then(({ data }) => {
        console.log(data);
        setBrows(
          data.filter(
            (service) => service.category === CategoriesVariants.brows
          )
        );
        setPedicure(
          data.filter(
            (service) => service.category === CategoriesVariants.pedicure
          )
        );
        setEyelashes(
          data.filter(
            (service) => service.category === CategoriesVariants.eyelashes
          )
        );
        setManicure(
          data.filter(
            (service) => service.category === CategoriesVariants.manicure
          )
        );
      })
      .catch(() => {
        showNotification({ color: "red", message: "Ошибка при получении" });
      });
  }, []);

  return (
    <div>
      <Header />
      <Stack spacing={0}>
        <BackgroundImage
          sx={{ minHeight: "100vh" }}
          id={"#depil"}
          src={brovkiBackground}
        >
          <Center mt={100} mb={"xl"}>
            <Title
              sx={{ color: "#FFF", backgroundColor: "rgba(0,0,0,0.5)" }}
              p={"md"}
            >
              Ресницы
            </Title>
          </Center>
          <SimpleGrid p={"md"} cols={5}>
            {eyelashes.map((service) => (
              <ServiceItem service={service} />
            ))}
          </SimpleGrid>
        </BackgroundImage>
        <BackgroundImage
          sx={{ minHeight: "100vh" }}
          id={"#cosmet"}
          src={pedikBackground}
        >
          <Center my={"xl"}>
            <Title
              sx={{ color: "#FFF", backgroundColor: "rgba(0,0,0,0.5)" }}
              p={"md"}
            >
              Педикюр
            </Title>
          </Center>
          <SimpleGrid p={"md"} cols={5}>
            {pedicure.map((service) => (
              <ServiceItem service={service} />
            ))}
          </SimpleGrid>
        </BackgroundImage>
        <BackgroundImage
          sx={{ minHeight: "100vh" }}
          id={"#brovi"}
          src={cosmetBackground}
        >
          <Center my={"xl"}>
            <Title
              sx={{ color: "#FFF", backgroundColor: "rgba(0,0,0,0.5)" }}
              p={"md"}
            >
              Брови
            </Title>
          </Center>
          <SimpleGrid p={"md"} cols={5}>
            {brows.map((service) => (
              <ServiceItem service={service} />
            ))}
          </SimpleGrid>
        </BackgroundImage>
        <BackgroundImage
          sx={{ minHeight: "100vh" }}
          id={"#manik"}
          src={manikBackground}
        >
          <Center my={"xl"}>
            <Title
              sx={{ color: "#FFF", backgroundColor: "rgba(0,0,0,0.5)" }}
              p={"md"}
            >
              Маникюр
            </Title>
          </Center>
          <SimpleGrid p={"md"} cols={5}>
            {manicure.map((service) => (
              <ServiceItem service={service} />
            ))}
          </SimpleGrid>
        </BackgroundImage>
      </Stack>
      <Footer />
    </div>
  );
};

export default Services;
