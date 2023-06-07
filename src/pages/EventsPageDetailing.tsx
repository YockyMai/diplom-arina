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
        });
    } else {
      setService(null);
    }
  }, []);

  if (service === null)
    return (
      <MainLayout>
        <Title>Этой услуги уже не существует</Title>
      </MainLayout>
    );

  const onSubmit = async () => {
    try {
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
          <Image
            src={getImageUrl(service.img)}
            width={"100%"}
            height={"auto"}
            fit={"contain"}
            sx={(theme) => ({
              borderRadius: theme.radius.sm,
              overflow: "hidden",
            })}
          />

          <Stack>
            <Group position={"apart"}>
              <Title order={1}>{service.name}</Title>
            </Group>
            <Box
              sx={(theme) => ({
                borderRadius: theme.radius.sm,
                backgroundColor: "#B49385",
                overflow: "hidden",
              })}
            >
              <Text
                size={"lg"}
                sx={{ backgroundColor: "#856d62" }}
                py={"lg"}
                color={"#FFF"}
                align={"center"}
              >
                Описание
              </Text>
              <Text p={"xl"} color={"#FFF"}>
                {service.description}
              </Text>
            </Box>
          </Stack>
        </SimpleGrid>
        <Center>
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
            <Text color={"#B49385"}>
              Стоимость услуги составит : {service.price} рублей.
            </Text>

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
        </Center>
      </Container>
    </MainLayout>
  );
};

export default EventsPageDetailing;
