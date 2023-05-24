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
            return prev.map((item) => {
              if (item.id === cancelAppointmentId)
                return { ...item, canceled: true };
              return item;
            });
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
    <div>
      <Image src={getImageUrl(item.service.img)} />
      <Box
        p={"md"}
        pt={"sm"}
        sx={(theme) => ({ backgroundColor: theme.colors.gray[3] })}
        key={item.id}
      >
        <div>
          <Text align={"center"} fw={700} fz="lg">
            {item.service.name}
          </Text>
          <Group mt={"sm"} position={"apart"}>
            <Text>Стоимость:</Text>
            <Text color={"indigo"} weight={"bold"} size={"lg"}>
              {item.service.price}₽
            </Text>
          </Group>
          <Divider mb={"xl"} mt={-3} variant={"dashed"} />

          <Group position={"apart"}>
            <Text>Дата записи:</Text>
            <Text color={"indigo"}>
              {dayjs(item.date).locale("ru").format("D MMMM в HH:00")}
            </Text>
          </Group>
          <Divider mb={"xl"} mt={-3} variant={"dashed"} />
          <Alert title={"Ваш мастер:"} color={"indigo"}>
            {item.service.user.username}
          </Alert>

          {!item.canceled && (
            <Group position={"right"} mt={"sm"}>
              <Button
                onClick={() => {
                  setConfirmCancelModal(true);
                  setCancelAppointmentId(item.id);
                }}
                color={"red"}
              >
                Отменить запись
              </Button>
            </Group>
          )}
        </div>
      </Box>
    </div>
  ));

  return (
    <MainLayout>
      <Container size={"lg"}>
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
        <Alert color={"red"}>
          <Stack>
            <Text
              sx={{ width: "100%" }}
              size={"lg"}
              weight={"bold"}
              color={"red"}
              align={"center"}
            >
              Вы уверены что хотите отменить запись?
            </Text>
            <Text align={"center"}>
              Отменить данное действие будет невозможно
            </Text>
            <Button
              color={"red"}
              onClick={() => {
                cancelAppointments();
              }}
            >
              Отменить запись
            </Button>
          </Stack>
        </Alert>
      </Modal>
    </MainLayout>
  );
};

export default MyAppointment;
