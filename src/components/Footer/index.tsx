import React from "react";
import { useAppSelector } from "../../store/hooks";
import { BsTelegram, TbBrandVk } from "react-icons/all";
import {
  AspectRatio,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";

const Footer = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  return (
    <div id="footer" style={{ backgroundColor: "#B49284", padding: "40px 0" }}>
      <Container size={"xl"}>
        <SimpleGrid breakpoints={[{ maxWidth: "md", cols: 1 }]} cols={2}>
          <AspectRatio ratio={16 / 9}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2303.725158641774!2d55.938071216049345!3d54.732049077715146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43d93a67de6d954d%3A0x8cf8a4c918d85972!2z0YPQuy4g0JPQvtCz0L7Qu9GPLCA2My8xLCDQo9GE0LAsINCg0LXRgdC_LiDQkdCw0YjQutC-0YDRgtC-0YHRgtCw0L0sIDQ1MDA3Ng!5e0!3m2!1sru!2sru!4v1663940063896!5m2!1sru!2sru"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              frameBorder={"0"}
            />
          </AspectRatio>

          <Group px={"xl"} position={"apart"} align={"start"}>
            <Stack style={{ color: "#FFF" }}>
              <Title order={2}>Контакты:</Title>
              <Text size={"lg"}>Адрес: ул. Гоголя 63/1</Text>
              <Text size={"lg"}>Телефон/WhatsApp: +7 (917) 400-63-00</Text>
              <Text size={"lg"}>Часы работы: 9:00 - 21:00</Text>
            </Stack>
            <Stack style={{ color: "#FFF" }}>
              <Title order={2}>Мы в соц. сетях:</Title>

              <Group>
                <div>
                  <TbBrandVk />
                </div>
                <Text
                  component={Link}
                  to={"https://vk.com/studio63_ufa"}
                  target="_blank"
                  size={"lg"}
                >
                  ВКонтакте
                </Text>
              </Group>

              <Group>
                <BsTelegram />
                <Text
                  component={Link}
                  to={"https://t.me/studio63_ufa"}
                  target="_blank"
                  size={"lg"}
                >
                  Телеграм
                </Text>
              </Group>
            </Stack>
          </Group>
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default Footer;
