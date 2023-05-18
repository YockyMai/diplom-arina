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
} from "@mantine/core";
import { AppointmentApi } from "../api/AppointmentApi";
import { IAppointment } from "../types/objects/appointment";
import { getImageUrl } from "../libs/getImageUrl";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useAppSelector } from "../store/hooks";
import { showNotification } from "@mantine/notifications";

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

const MyAppointment = () => {
  const { classes } = useStyles();

  const { role } = useAppSelector((state) => state.user.user);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    IAppointment[]
  >([]);
  const [withCanceled, setWithCanceled] = useState(false);

  useEffect(() => {
    if (withCanceled) {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter((appointment) => appointment.canceled === false)
      );
    }
  }, [withCanceled, appointments]);

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

  const items = filteredAppointments.map((item) => (
    <div className={classes.item} key={item.id}>
      <ThemeIcon
        variant="light"
        className={classes.itemIcon}
        size={60}
        radius="md"
      >
        <Image src={getImageUrl(item.service.img)} />
      </ThemeIcon>

      <div>
        <Text fw={700} fz="lg" className={classes.itemTitle}>
          Наименование услуги: {item.service.name}
        </Text>
        <Text c="dimmed">{item.service.description}</Text>
        <Divider />
        <Text>Стоимость: {item.service.price}</Text>
        <Divider />
        <Text>
          Вас будет принимать мастер:
          <br /> {item.service.user.username}
        </Text>
        <Divider />
        <Text>
          Контактный email мастера:
          <br />{" "}
          <a href={`mailto: ${item.service.user.email}`}>
            {item.service.user.email}
          </a>
        </Text>
        <Text>
          Мобильный номер мастера:
          <br />{" "}
          <a href={`mailto: ${item.service.user.email}`}>
            {item.service.user.phone}
          </a>
        </Text>

        {!item.canceled ? (
          <Alert title={"Внимание"}>
            Не забудьте прийти к записанной дате <br />
            <Badge>
              {dayjs(item.date).locale("ru").format("D MMMM в HH:mm")}
            </Badge>
          </Alert>
        ) : (
          <Alert title={"Внимание"} color={"red"}>
            <Text>Вы отменили данную запись</Text>
          </Alert>
        )}

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
    </div>
  ));

  return (
    <MainLayout>
      <Container size={"lg"}>
        <Group position={"apart"}>
          <Title>Ваши записи</Title>
          <Switch
            label={"Показать отмененные записи"}
            checked={withCanceled}
            onChange={(event) => setWithCanceled(event.currentTarget.checked)}
          />
        </Group>

        {items.length > 0 ? (
          <SimpleGrid
            cols={2}
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
        title={"ㅤ"}
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
