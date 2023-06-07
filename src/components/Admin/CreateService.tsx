import React, { useEffect, useState } from "react";
import {
  Button,
  FileInput,
  NumberInput,
  Select,
  SelectItem,
  Stack,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { CategoriesVariants, ServiceApi } from "../../api/ServiceApi";
import { UserApi } from "../../api/UserApi";

const CreateService = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<undefined | number>(50);
  const [image, setImage] = useState<File | null>(null);

  const [category, setCategory] = useState<string | null>(null);

  const [masters, setMasters] = useState<SelectItem[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<string | null>(null);

  const resetFiled = () => {
    setName("");
    setDescription("");
    setPrice(undefined);
    setSelectedMaster(null);
    setImage(null);
  };

  useEffect(() => {
    UserApi.findMasters().then(({ data }) => {
      const users = data.users.map((user) => ({
        label: user.username,
        value: user.id.toString(),
      }));

      setMasters(users);
    });
  }, []);

  const onSubmit = async () => {
    try {
      if (
        !image ||
        !selectedMaster ||
        !price ||
        !name ||
        !description ||
        !category
      ) {
        showNotification({ message: "Заполните все поля" });
        return;
      }

      const formData = new FormData();

      formData.append("name", name);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("price", price ? price.toString() : "50");
      formData.append("img", image);
      formData.append("master_id", selectedMaster);

      await ServiceApi.create(formData);

      showNotification({ message: "Услуга успешно создана" });

      resetFiled();
    } catch (e) {
      showNotification({ message: "Ошибка, попробуйте позже" });
    }
  };

  return (
    <Stack>
      <TextInput
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        label={"Наименование услуги"}
        placeholder={"Введите название услуги"}
      />
      <Select
        value={category}
        onChange={setCategory}
        label={"Выберите категорию"}
        placeholder={"Категории"}
        data={[
          {
            value: CategoriesVariants.brows,
            label: CategoriesVariants.brows,
          },
          {
            value: CategoriesVariants.eyelashes,
            label: CategoriesVariants.eyelashes,
          },
          {
            value: CategoriesVariants.pedicure,
            label: CategoriesVariants.pedicure,
          },
          {
            value: CategoriesVariants.manicure,
            label: CategoriesVariants.manicure,
          },
        ]}
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
      <FileInput
        label={"Загрузите изображение услуги"}
        placeholder={"Нажмите для выбора"}
        value={image}
        onChange={setImage}
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
      <Button onClick={onSubmit}>Создать</Button>
    </Stack>
  );
};

export default CreateService;
