import React, { useState } from "react";
import "../Registration.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/slices/userSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, ref, string } from "yup";

type LoginFields = {
  password: string;
  email: string;
};

const validationScheme = object({
  email: string().email("Неверный формат email").required("Обязательное поле"),
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
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({ resolver: yupResolver(validationScheme) });

  const onSubmit: SubmitHandler<LoginFields> = async ({ password, email }) => {
    dispatch(login({ email, password })).then(() => {
      navigate("/");
    });
  };
  return (
    <>
      <div className="reg-container">
        <h1>Вход</h1>
        <p>Пожалуйста, заполните эту форму, чтобы войти в свой аккаунт</p>
        <hr />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              required
              {...register("email")}
              label={"Email"}
              placeholder={"example@mail.com"}
              type={"email"}
            />
            {errors.email && (
              <p>
                <Text color={"red"}>{errors.email.message}</Text>
              </p>
            )}
            <PasswordInput
              required
              {...register("password")}
              label={"Пароль"}
              placeholder={"Введите пароль"}
            />
            {errors.password && (
              <p>
                <Text color={"red"}>{errors.password.message}</Text>
              </p>
            )}
            <Button color={"orange"} type={"submit"}>
              Войти
            </Button>

            <Text>
              Еще нет аккаунта?{" "}
              <Link to={"/registration"}>Создать аккаунт</Link>
            </Text>
          </Stack>
        </form>
      </div>
    </>
  );
};

export default Login;
