import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Button, Container, Modal, Stack, Title } from "@mantine/core";
import CreateService from "../components/Admin/CreateService";
import DeleteService from "../components/Admin/DeleteService";
import EditService from "../components/Admin/EditService";
import SetUserRole from "../components/Admin/SetUserRole";

const AdminPage = () => {
  const [createServiceModal, setCreateServiceModal] = useState(false);
  const [editServiceModal, setEditServiceModal] = useState(false);
  const [deleteServiceModal, setDeleteServiceModal] = useState(false);

  const [userRoleModal, setUserRoleModal] = useState(false);

  const closeCreateServiceModal = () => {
    setCreateServiceModal(false);
  };
  const closeEditServiceModal = () => {
    setEditServiceModal(false);
  };
  const closeDeleteServiceModal = () => {
    setDeleteServiceModal(false);
  };

  const closeUserRoleModal = () => {
    setUserRoleModal(false);
  };

  return (
    <MainLayout>
      <Container size={"xl"}>
        <Title>Панель администратора</Title>

        <Container mt={"xl"} size={"xs"}>
          <Stack>
            <Button
              onClick={() => {
                setCreateServiceModal(true);
              }}
              color={"green"}
            >
              Добавить услугу
            </Button>
            <Button
              onClick={() => {
                setEditServiceModal(true);
              }}
              color={"blue"}
            >
              Редактировать услугу
            </Button>
            <Button
              onClick={() => {
                setDeleteServiceModal(true);
              }}
              color={"red"}
            >
              Удалить услугу
            </Button>
            <Button
              onClick={() => {
                setUserRoleModal(true);
              }}
              mt={"xl"}
            >
              Назначить роль пользователю
            </Button>
          </Stack>
        </Container>
      </Container>
      <Modal
        title={"Создание услуги"}
        size={"lg"}
        opened={createServiceModal}
        onClose={closeCreateServiceModal}
      >
        <CreateService />
      </Modal>
      <Modal
        title={"Редактирование услуги"}
        size={"lg"}
        opened={editServiceModal}
        onClose={closeEditServiceModal}
      >
        <EditService />
      </Modal>
      <Modal
        title={"Удаление услуги"}
        size={"lg"}
        opened={deleteServiceModal}
        onClose={closeDeleteServiceModal}
      >
        <DeleteService />
      </Modal>
      <Modal
        title={"Назначить роль"}
        size={"lg"}
        opened={userRoleModal}
        onClose={closeUserRoleModal}
      >
        <SetUserRole />
      </Modal>
    </MainLayout>
  );
};

export default AdminPage;
