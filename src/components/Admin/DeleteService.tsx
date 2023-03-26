import React, { useEffect, useState } from "react";
import { Button, Select, SelectItem, Stack } from "@mantine/core";
import { ServiceApi } from "../../api/ServiceApi";
import { showNotification } from "@mantine/notifications";

const DeleteService = () => {
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [services, setServices] = useState<SelectItem[]>([]);

  useEffect(() => {
    ServiceApi.getAll().then(({ data }) => {
      const services = data.map((service) => ({
        label: service.name,
        value: service.id.toString(),
      }));

      setServices(services);
    });
  }, []);

  const onSubmit = () => {
    if (!serviceId) return;
    ServiceApi.delete(serviceId)
      .then(() => {
        setServices((prevState) =>
          prevState.filter((el) => el.value !== serviceId)
        );
        setServiceId(null);

        showNotification({ message: "Услуга успешно удалена" });
      })
      .catch(() => {
        showNotification({ color: "red", message: "Ошибка попробуйте позже" });
      });
  };

  return (
    <Stack style={{ height: 400 }}>
      <Select
        placeholder={"Нажмите для выбора"}
        label={"Выберите услугу, которую хотите удалить"}
        data={services}
        value={serviceId}
        onChange={setServiceId}
      />
      <Button onClick={onSubmit} color={"red"} disabled={!serviceId}>
        Удалить
      </Button>
    </Stack>
  );
};

export default DeleteService;
