import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  Alert,
  Box,
  Button,
  Center,
  Container,
  Group,
  Image,
  Loader,
  Mark,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { ServiceApi } from "../api/ServiceApi";
import { IService } from "../types/objects/service";
import { getImageUrl } from "../libs/getImageUrl";
import { DatePicker, DateTimePicker } from "@mantine/dates";
import "dayjs/locale/ru";
import { showNotification } from "@mantine/notifications";
import { AppointmentApi } from "../api/AppointmentApi";
import { useAppSelector } from "../store/hooks";

const EventsPageDetailing = () => {
  const userId = useAppSelector((state) => state.user.user.id);
  const { eventId } = useParams();

  const [date, setDate] = useState<Date | null>(null);

  const [service, setService] = useState<IService | null>(null);

  useEffect(() => {
    if (eventId !== undefined) {
      ServiceApi.getOne(Number(eventId))
        .then(({ data }) => {
          setService(data);
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
      if (date === null) {
        showNotification({ color: "red", message: "Выберите дату записи" });
        return;
      }
      await AppointmentApi.create(service.id, date, userId);
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
      <Container size={"xl"}>
        <Title>
          Услуга <Mark color={"pink"}>{service.name}</Mark>
        </Title>
        <Text size={"xl"}>Описание: {service.description}</Text>

        <Stack pt={"xl"}>
          <Image
            src={getImageUrl(service.img)}
            width={"100%"}
            height={200}
            sx={{ borderRadius: "50px", overflow: "hidden" }}
          />

          <Alert sx={{ width: "100%" }} title={"Запись"} color={"orange"}>
            <Text>Запишитесь на нашу услугу, заполнив поля ниже</Text>
          </Alert>

          <Center>
            <Stack>
              <DateTimePicker
                label={"Дата и время записи"}
                placeholder={"Выберите удобную для вас дату записи"}
                color={"blue"}
                minDate={new Date()}
                onChange={setDate}
                value={date}
                locale={"ru"}
              />
              <Text>
                Стоимость услуги составит : <Mark>{service.price}</Mark> рублей.
              </Text>
              <Button onClick={onSubmit}>Записаться</Button>
            </Stack>
          </Center>
        </Stack>
      </Container>
    </MainLayout>
  );
};

export default EventsPageDetailing;
