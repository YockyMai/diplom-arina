import React, { useEffect, useState } from "react";
import { Button, Select, SelectItem, Stack } from "@mantine/core";
import { UserApi } from "../../api/UserApi";
import { showNotification } from "@mantine/notifications";

const SetUserRole = () => {
  const [users, setUsers] = useState<SelectItem[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    if (refetch) {
      UserApi.findAll().then(({ data }) => {
        setUsers(
          data.users.map((el) => ({
            label: `${el.username}, ${el.role}`,
            value: el.id.toString(),
          }))
        );
      });
      setRefetch(false);
    }
  }, [refetch]);

  const onSubmit = () => {
    if (!selectedUser || !role) {
      showNotification({ color: "red", message: "Заполните все поля!" });
      return;
    }
    UserApi.changeRole(selectedUser, role)
      .then(() => {
        setSelectedUser(null);
        setRefetch(true);
        showNotification({ message: "Роль пользователя успешно изменена" });
      })
      .catch(() => {
        showNotification({
          color: "red",
          message: "Что то пошло не так, попробуйте позже",
        });
      });
  };

  return (
    <Stack style={{ height: 400 }}>
      <Select
        label={"Выберите пользователя у которого хотите изменить роль"}
        placeholder={"Нажмите для выбора"}
        data={users}
        value={selectedUser}
        onChange={setSelectedUser}
      />

      <Select
        label={"Выберите роль"}
        placeholder={"Нажмите для выбора"}
        data={[
          { value: "USER", label: "Обычный пользователь" },
          { value: "MASTER", label: "Мастер" },
          {
            value: "ADMIN",
            label: "Администратор",
          },
        ]}
        value={role}
        onChange={setRole}
      />

      <Button disabled={!role || !selectedUser} onClick={onSubmit}>
        Установить роль
      </Button>
    </Stack>
  );
};

export default SetUserRole;
