import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../libs/getImageUrl";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  id: number;
  price: string;
}

const ServiceCard: FC<ServiceCardProps> = ({
  title,
  image,
  id,
  description,
}) => {
  return (
    <Card
      sx={(theme) => ({ backgroundColor: theme.colors.gray[4] })}
      radius="md"
      p="md"
    >
      <Card.Section>
        <Image src={getImageUrl(image)} alt={title} height={280} />
      </Card.Section>

      <Card.Section mt="md">
        <Text align={"center"}>{title}</Text>
      </Card.Section>
      <Card.Section mt="md">
        <Box
          sx={(theme) => ({
            textOverflow: "ellipsis",
            lineClamp: 3,
            backgroundColor: theme.colors.gray[5],
          })}
          p={"xl"}
        >
          <Title order={4}>Описание :</Title>
          <Text>{description}</Text>
        </Box>
      </Card.Section>

      <Group mt="xl">
        <Button
          component={Link}
          to={`/events/${id}`}
          radius="md"
          style={{ flex: 1 }}
          color={"indigo"}
        >
          Подробнее
        </Button>
      </Group>
    </Card>
  );
};

export default ServiceCard;
