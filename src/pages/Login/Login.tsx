import React, { useState } from "react";
import "../Registration.css";
import { Link } from "react-router-dom";
import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  return (
    <>
      <div className="reg-container">
        <h1>Вход</h1>
        <p>Пожалуйста, заполните эту форму, чтобы войти в свой аккаунт</p>
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

            <PasswordInput
              label={"Пароль"}
              placeholder={"Введите пароль"}
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              type={"password"}
            />

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
