import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  Container,
  createStyles,
  ThemeIcon,
  Title,
  Image,
  Text,
  Divider,
  rem,
  SimpleGrid,
  Alert,
  Badge,
  Button,
  Group,
  Switch,
  Modal,
  Stack,
  Box,
} from "@mantine/core";
import { AppointmentApi } from "../api/AppointmentApi";
import { IAppointment } from "../types/objects/appointment";
import { getImageUrl } from "../libs/getImageUrl";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useAppSelector } from "../store/hooks";
import { showNotification } from "@mantine/notifications";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    AppointmentApi.getAllForUser().then(({ data }) => {
      setAppointments(data);
    });
  }, []);
  const [confirmCancelModal, setConfirmCancelModal] = useState(false);
  const [cancelAppointmentId, setCancelAppointmentId] = useState<null | number>(
    null
  );

  const cancelAppointments = () => {
    if (cancelAppointmentId)
      AppointmentApi.cancel(cancelAppointmentId)
        .then(() => {
          showNotification({
            message: "Услугуа отменена ",
          });
          setAppointments((prev) => {
            return prev.filter((item) => item.id !== cancelAppointmentId);
          });
        })
        .catch(() => {
          showNotification({
            title: "Ошибка",
            message: "Не удалось отменить услугу, попробуйте позже",
          });
        })
        .finally(() => {
          setConfirmCancelModal(false);
          setCancelAppointmentId(null);
        });
  };

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
          <Text align={"center"} fw={700} fz="lg">
            {item.service.name}
          </Text>
          <Group mt={"sm"} position={"apart"}>
            <Text>Стоимость:</Text>
            <Text color={"#B49284"} weight={"bold"} size={"lg"}>
              {item.service.price}₽
            </Text>
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
            <Text>Ваш мастер:</Text>

            <Text color={"#B49284"}>{item.service.user.username}</Text>
          </Group>
          <Divider mb={"xl"} mt={-3} variant={"dashed"} />
          {!item.canceled && (
            <Stack>
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
                onClick={() => {
                  setConfirmCancelModal(true);
                  setCancelAppointmentId(item.id);
                }}
              >
                Отменить запись
              </Button>
            </Stack>
          )}
        </div>
      </Box>
    </div>
  ));

  return (
    <MainLayout>
      <Container py={150} size={"xl"}>
        <Group position={"apart"}>
          <Title>Ваши записи</Title>
        </Group>

        {items.length > 0 ? (
          <SimpleGrid
            cols={3}
            spacing={50}
            breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]}
            style={{ marginTop: 30 }}
          >
            {items}
          </SimpleGrid>
        ) : (
          <Text
            align={"center"}
            size={"xl"}
            weight={"bold"}
            mt={"xl"}
            color={"red"}
          >
            У вас нет активных записей
          </Text>
        )}
      </Container>
      <Modal
        centered
        opened={confirmCancelModal}
        onClose={() => {
          setConfirmCancelModal(false);
        }}
      >
        <Stack>
          <Text
            sx={{ width: "100%" }}
            size={"lg"}
            weight={"bold"}
            color={"#B49284"}
            align={"center"}
          >
            Вы уверены что хотите отменить запись?
          </Text>
          <Text align={"center"}>
            Отменить данное действие будет невозможно
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
            onClick={() => {
              cancelAppointments();
            }}
          >
            Отменить запись
          </Button>
        </Stack>
      </Modal>
    </MainLayout>
  );
};

export default MyAppointment;
