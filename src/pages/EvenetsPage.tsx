import React, { useEffect, useState } from "react";
import { Container, Grid, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ServiceApi } from "../api/ServiceApi";
import MainLayout from "../layouts/MainLayout";
import ServiceCard from "../components/ServiceCard";
import { IService } from "../types/objects/service";

const EventsPage = () => {
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    ServiceApi.getAll()
      .then(({ data }) => {
        setServices(data);
      })
      .catch(() => {
        showNotification({ color: "red", message: "Ошибка при получении" });
      });
  }, []);

  return (
    <MainLayout>
      <Container my={150} size={"xl"}>
        <Title mb={"xl"}>Наши услуги</Title>
        <Grid>
          {services.map((service) => (
            <Grid.Col span={4}>
              <ServiceCard
                description={service.description}
                price={service.price}
                image={service.img}
                title={service.name}
                id={service.id}
                key={service.id}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default EventsPage;
