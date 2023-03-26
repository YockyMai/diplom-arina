import React, { useEffect, useState } from "react";
import {
  Button,
  NumberInput,
  Select,
  SelectItem,
  Stack,
  TextInput,
} from "@mantine/core";
import { UserApi } from "../../api/UserApi";
import { showNotification } from "@mantine/notifications";
import { ServiceApi } from "../../api/ServiceApi";
import { IService } from "../../types/objects/service";

const EditService = () => {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [services, setServices] = useState<SelectItem[]>([]);
  const [allServices, setAllServices] = useState<IService[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<undefined | number>(50);

  const [masters, setMasters] = useState<SelectItem[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<string | null>(null);

  const resetFiled = () => {
    setName("");
    setDescription("");
    setPrice(undefined);
    setSelectedMaster(null);
    setStep(0);
    setServiceId(null);
  };

  useEffect(() => {
    ServiceApi.getAll().then(({ data }) => {
      const services = data.map((service) => ({
        label: service.name,
        value: service.id.toString(),
      }));

      setAllServices(data);

      setServices(services);
    });
    UserApi.findMasters().then(({ data }) => {
      const users = data.users.map((el) => ({
        value: el.id.toString(),
        label: el.username,
      }));

      setMasters(users);
    });
  }, []);

  const onSubmit = async () => {
    try {
      if (!selectedMaster || !price || !name || !serviceId) {
        showNotification({ message: "Заполните все поля" });
        return;
      }

      await ServiceApi.edit({
        name,
        serviceId,
        masterId: selectedMaster,
        description,
        price,
      });

      showNotification({ message: "Услуга успешно обновлена" });

      resetFiled();
    } catch (e) {
      showNotification({ message: "Ошибка, попробуйте позже" });
    }
  };

  const onSelectService = () => {
    const service = allServices.find((el) => el.id.toString() === serviceId);

    if (!service) return;

    setName(service.name);
    setDescription(service.description);
    setPrice(Number(service.price));
    setSelectedMaster(service.userId.toString());

    setStep(1);
  };

  return (
    <Stack>
      {step === 0 ? (
        <div style={{ height: 400 }}>
          <Select
            label={"Выберите услугу, которую будете редактировать"}
            placeholder={"Нажмите для выбора"}
            data={services}
            value={serviceId}
            onChange={setServiceId}
          />
          <Button mt={"sm"} disabled={!serviceId} onClick={onSelectService}>
            Выбрать
          </Button>
        </div>
      ) : (
        <>
          <TextInput
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
            label={"Наименование услуги"}
            placeholder={"Введите название услуги"}
          />
          <TextInput
            value={description}
            onChange={(e) => {
              setDescription(e.currentTarget.value);
            }}
            label={"Описание услуги"}
            placeholder={"Введите описание услуги"}
          />
          <Select
            label={"Выберите мастера, который будет прикреплен к этой услуги"}
            placeholder={"Нажмите для выбора"}
            data={masters}
            value={selectedMaster}
            onChange={(val) => setSelectedMaster(val)}
          />
          <NumberInput
            min={1}
            value={price}
            onChange={(value) => {
              value && setPrice(value);
            }}
            label={"Стоимость услуги"}
            placeholder={"Введите стоимость"}
          />
          <Button onClick={onSubmit}>Сохранить</Button>
        </>
      )}
    </Stack>
  );
};

export default EditService;
