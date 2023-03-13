import { Button, Card, Divider, Group, Image, Text } from "@mantine/core";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../libs/getImageUrl";

interface ServiceCardProps {
  image: string;
  title: string;
  id: number;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, image, id }) => {
  return (
    <Card withBorder radius="md" p="md">
      <Card.Section>
        <Image src={getImageUrl(image)} alt={title} height={180} />
      </Card.Section>

      <Card.Section mt="md">
        <Text align={"center"}>{title}</Text>
      </Card.Section>

      <Divider py={"sm"} />

      <Group mt="xs">
        <Button
          component={Link}
          to={`/events/${id}`}
          radius="md"
          style={{ flex: 1 }}
          color={"pink"}
        >
          Подробнее
        </Button>
      </Group>
    </Card>
  );
};

export default ServiceCard;
