import React from "react";
import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useAppDispatch } from "../store/hooks";
import { register as registerAction } from "../store/slices/userSlice";
import { IconPhoneCalling } from "@tabler/icons-react";
import InputMask from "react-input-mask";
import { object, ref, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const phoneRegExp = /(\+7|8)[\s(]*\d{3}[)\s]*\d{3}[\s-]?\d{2}[\s-]?\d{2}/i;

const validationScheme = object({
  email: string().email("Неверный формат email").required("Обязательное поле"),
  username: string()
    .min(3, "Минимальная длина - 3 символа")
    .max(20, "Максимальная длина - 20 символов")
    .required("Обязательное поле"),
  password: string()
    .min(8, "Минимальная длина пароля - 8 символов")
    .max(50, "Максимальная длина пароля - 50 символов")
    .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .matches(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
    .matches(
      /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@\[\]^_{|}~]+$/,
      "Пароль должен состоять только из латинских символов"
    )
    .required("Обязательное поле"),
  repeatPassword: string()
    .oneOf([ref("password")], "Пароли не совпадают")
    .required("Обязательное поле"),
  phone: string().matches(phoneRegExp, "Неверный номер телефона"),
});

type AuthByLocalFields = {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  phone: string;
};

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthByLocalFields>({
    resolver: yupResolver(validationScheme),
  });

  const onSubmit = async (fields: any) => {
    dispatch(
      registerAction({
        email: fields.email,
        password: fields.password,
        username: fields.username,
        phone: fields.phone,
      })
    ).then(() => {
      navigate("/");
    });
  };
  return (
    <>
      <div className="reg-container">
        <h1>Регистрация</h1>
        <p>
          Пожалуйста, заполните эту форму, чтобы зарегистрировать свой аккаунт
        </p>
        <hr />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              {...register("email")}
              label={"Email"}
              placeholder={"example@mail.com"}
              type={"email"}
              required
            />
            <Text color={"red"}>{errors.email?.message}</Text>
            <TextInput
              required
              label={"Имя"}
              placeholder={"Иван"}
              {...register("username")}
            />
            <Text color={"red"}>{errors.username?.message}</Text>
            <Input.Wrapper label={"Телефон"} required>
              <Input
                {...register("phone")}
                component={InputMask}
                icon={<IconPhoneCalling />}
                mask={"+7 (999) 999 99-99"}
                placeholder={"+7 (999) 999 99-99"}
              />
            </Input.Wrapper>
            <Text color={"red"}>{errors.phone?.message}</Text>

            <PasswordInput
              required
              {...register("password")}
              label={"Пароль"}
              placeholder={"Введите пароль"}
            />
            <Text color={"red"}>{errors.password?.message}</Text>

            <PasswordInput
              required
              label={"Повторите пароль"}
              placeholder={"Введите пароль"}
              {...register("repeatPassword")}
            />
            <Text color={"red"}>{errors.repeatPassword?.message}</Text>

            <Button color={"orange"} type={"submit"}>
              Зарегистрироватся
            </Button>

            <Text>
              Уже есть аккаунт? <Link to={"/login"}>Войти</Link>
            </Text>
          </Stack>
        </form>
      </div>
    </>
  );
};

export default Registration;
