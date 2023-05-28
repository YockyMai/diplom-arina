import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  Group,
  Image,
  rem,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import MainLayout from "../layouts/MainLayout";
import { IAppointment } from "../types/objects/appointment";
import { AppointmentApi } from "../api/AppointmentApi";
import { getImageUrl } from "../libs/getImageUrl";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useAppSelector } from "../store/hooks";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: rem(80),
    paddingBottom: rem(50),
  },

  item: {
    display: "flex",
    boxShadow: theme.shadows.xl,
    padding: theme.spacing.xl,
    border: `2px solid ${theme.colors.dark[9]}`,
    borderRadius: theme.radius.md,
  },

  itemIcon: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },

  itemTitle: {
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
  },

  supTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: 800,
    fontSize: theme.fontSizes.sm,
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
      .color,
    letterSpacing: rem(0.5),
  },

  title: {
    lineHeight: 1,
    textAlign: "center",
    marginTop: theme.spacing.xl,
  },

  description: {
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },

  highlight: {
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    padding: rem(5),
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: "inline-block",
    color: theme.colorScheme === "dark" ? theme.white : "inherit",
  },
}));

const MasterPage = () => {
  const user = useAppSelector((state) => state.user.user);

  const { classes } = useStyles();

  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    AppointmentApi.getAllForMaster().then(({ data }) => {
      setAppointments(data);
      console.log(data);
    });
  }, []);

  const items = appointments.map((item) => (
    <div style={{ borderRadius: "0.3em", overflow: "hidden" }}>
      <Image src={getImageUrl(item.service.img)} />
      <Box
        p={"md"}
        pt={"sm"}
        sx={(theme) => ({ backgroundColor: "rgba(180,146,132,0.3)" })}
        key={item.id}
      >
        <div>
          <Group position={"apart"}>
            <Text>Услуга:</Text>
            <Text color={"#B49284"}>{item.service.name}</Text>
          </Group>
          <Divider mb={"xl"} mt={-3} variant={"dashed"} />
          <Group position={"apart"}>
            <Text>Дата записи:</Text>
            <Text color={"#B49284"}>
              {dayjs(item.date).locale("ru").format("D MMMM в HH:00")}
            </Text>
          </Group>
          <Divider mb={"xl"} mt={-3} variant={"dashed"} />
          <Group position={"apart"}>
            <Text>Имя клиента:</Text>

            <Text color={"#B49284"}>{item.user.username}</Text>
          </Group>
          <Divider mb={"xl"} mt={-3} variant={"dashed"} />
        </div>
      </Box>
    </div>
  ));

  return (
    <MainLayout>
      <Container my={150} size={"xl"}>
        <Title mb={"md"}>Добро пожаловать {user.username}</Title>
        <Text mb={"xl"} size={"xl"}>
          Ваши клиенты:
        </Text>
        <SimpleGrid
          cols={3}
          spacing={50}
          breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]}
          style={{ marginTop: 30 }}
        >
          {items}
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
};

export default MasterPage;
