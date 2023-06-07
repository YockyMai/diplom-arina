import React, { useState } from "react";
import {
  Box,
  Button,
  Group,
  Input,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { object, ref, string } from "yup";
import InputMask from "react-input-mask";
import { IconPhoneCalling } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../core/axios";
import { useAppSelector } from "../store/hooks";
import { showNotification } from "@mantine/notifications";

const phoneRegExp = /(\+7|8)[\s(]*\d{3}[)\s]*\d{3}[\s-]?\d{2}[\s-]?\d{2}/i;

const validationScheme = object({
  email: string().email("Неверный формат email").required("Обязательное поле"),
  phone: string().matches(phoneRegExp, "Неверный номер телефона"),
});

const EditUser = () => {
  const { id, email, phone } = useAppSelector((state) => state.user.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; phone: string }>({
    resolver: yupResolver(validationScheme),
    defaultValues: {
      email,
      phone,
    },
  });

  const onSubmit = async ({
    phone,
    email,
  }: {
    email: string;
    phone: string;
  }) => {
    axios.post("/user/editUser", {
      phone: phone
        .replace("+", "")
        .replace("(", "")
        .replace(")", "")
        .replace("-", "")
        .replace(/ /g, ""),
      email,
      id,
    });
    showNotification({ message: "Данные аккаунта обновлены!" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group mb={"xl"} align={"end"}>
          <TextInput
            {...register("email")}
            label={"Email"}
            placeholder={"example@mail.com"}
            type={"email"}
          />
          {errors.email && <Text color={"red"}>{errors.email?.message}</Text>}

          <Input.Wrapper label={"Телефон"} required>
            <Input
              {...register("phone")}
              component={InputMask}
              icon={<IconPhoneCalling />}
              mask={"+7 (999) 999 99-99"}
              placeholder={"+7 (999) 999 99-99"}
            />
          </Input.Wrapper>
          {errors.phone && <Text color={"red"}>{errors.phone?.message}</Text>}
          <Button
            style={{ borderColor: "#B49284" }}
            sx={{
              color: "#B49284",
              backgroundColor: "transparent",
              transition: "0.3s",
              ":hover": {
                backgroundColor: "#B49284",
                color: "#FFF",
                transition: "0.3s",
              },
            }}
            type={"submit"}
          >
            Редактировать данные
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default EditUser;
