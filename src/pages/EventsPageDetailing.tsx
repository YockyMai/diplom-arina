import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  Alert,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Image,
  Loader,
  Mark,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { ServiceApi } from "../api/ServiceApi";
import { IService, Time } from "../types/objects/service";
import { getImageUrl } from "../libs/getImageUrl";
import "dayjs/locale/ru";
import { showNotification } from "@mantine/notifications";
import { AppointmentApi } from "../api/AppointmentApi";
import { useAppSelector } from "../store/hooks";
import { MyDatePicker } from "../components/DatePicker";

const EventsPageDetailing = () => {
  const userId = useAppSelector((state) => state.user.user.id);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const [isLoading, setIsLoading] = useState(true);
  const { eventId } = useParams();

  const [service, setService] = useState<IService | null>(null);
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
  const [selectedTimeId, setSelectedTimeId] = useState<null | number>(null);

  useEffect(() => {
    if (eventId !== undefined) {
      ServiceApi.getOne(Number(eventId))
        .then(({ data }) => {
          setService(data);
          setSelectedDayId(data.calendars[0].days[0].id);
        })
        .catch(() => {
          setService(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setService(null);
    }
  }, []);

  if (isLoading || !service)
    return (
      <Center sx={{ minHeight: "80vh" }}>
        <Loader mt={100} size={"xl"} />
      </Center>
    );

  const onSubmit = async () => {
    try {
      if (!isAuth) {
        showNotification({
          color: "red",
          message: "Авторизуйтесь чтобы записаться на услугу",
        });
        return;
      }
      if (!selectedDayId) {
        showNotification({ color: "red", message: "Выберите день записи" });
        return;
      }
      if (!selectedTimeId) {
        showNotification({ color: "red", message: "Выберите время записи" });
        return;
      }
      await AppointmentApi.create(
        service.id,
        selectedDayId,
        selectedTimeId,
        userId
      );
      showNotification({
        color: "green",
        title: "Вы успешно записались",
        message:
          "Перейдите на страницу МОИ ЗАПИСИ для полее подробной информации",
      });
    } catch (e) {
      showNotification({
        color: "red",
        message: "Извините но похоже записей на это время нет!",
      });
    }
  };

  return (
    <MainLayout>
      <Container py={100} size={"xl"}>
        <SimpleGrid
          breakpoints={[{ cols: 1, maxWidth: "sm" }]}
          cols={2}
          my={"xl"}
          pt={"xl"}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Group position={"apart"}>
              <Title color={"#B49284"} order={1}>
                {service.name}
              </Title>
            </Group>
            <Box
              sx={(theme) => ({
                borderRadius: theme.radius.sm,
                backgroundColor: "rgba(180,147,133,0.3)",
                overflow: "hidden",
              })}
            >
              <Text size={"xl"} py={"lg"} color={"#B49284"} align={"center"}>
                Описание
              </Text>
              <Text px={"xl"} pb={"xl"} size={"xl"} color={"#B49284"}>
                {service.description}
              </Text>
            </Box>

            <Text size={"xl"} color={"#B49385"}>
              Стоимость услуги составит : {service.price} рублей.
            </Text>
          </Box>
          <Stack>
            {selectedDayId && (
              <MyDatePicker
                selectedTimeId={selectedTimeId}
                setSelectedTimeId={setSelectedTimeId}
                selectedDayId={selectedDayId}
                setSelectedDayId={setSelectedDayId}
                days={service.calendars[0].days.sort((a, b) => {
                  const dateA = new Date(a.day);
                  const dateB = new Date(b.day);
                  return dateA.getTime() - dateB.getTime();
                })}
              />
            )}
          </Stack>
        </SimpleGrid>
        <Stack mx={"auto"} sx={{ maxWidth: 400 }}>
          <Button
            radius={0}
            p={"xl"}
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
            color={"indigo"}
            onClick={onSubmit}
          >
            Записаться
          </Button>
        </Stack>
      </Container>
    </MainLayout>
  );
};

export default EventsPageDetailing;
