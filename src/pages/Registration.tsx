import React, { useState } from "react";
import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useAppDispatch } from "../store/hooks";
import { register } from "../store/slices/userSlice";

const Registration = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(register({ email, password, username }));
  };
  return (
    <>
      <div className="reg-container">
        <h1>Регистрация</h1>
        <p>
          Пожалуйста, заполните эту форму, чтобы зарегистрировать свой аккаунт
        </p>
        <hr />

        <form onSubmit={onSubmit}>
          <Stack>
            <TextInput
              label={"Email"}
              placeholder={"example@mail.com"}
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              type={"email"}
            />
            <TextInput
              label={"Имя"}
              placeholder={"Иван"}
              value={username}
              onChange={(e) => {
                setUsername(e.currentTarget.value);
              }}
            />

            <PasswordInput
              label={"Пароль"}
              placeholder={"Введите пароль"}
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />

            <Button color={"orange"} type={"submit"}>
              Зарегестрироватся
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
