import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Stack,
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

const ServiceCard: FC<ServiceCardProps> = ({ title, image, id, price }) => {
  return (
    <Card>
      <Card.Section>
        <Image
          src={getImageUrl(image)}
          sx={{ overflow: "hidden", borderRadius: "0.5em" }}
          alt={title}
          height={350}
        />
      </Card.Section>

      <Card.Section mt={"xl"}>
        <Text weight={200} size={28} color={"#B49284"}>
          {title}
        </Text>
      </Card.Section>
      <Card.Section mt="md">
        <Text weight={200} size={28} color={"#B49284"}>
          {price}руб.
        </Text>
        <Button
          mt={"sm"}
          component={Link}
          to={`/events/${id}`}
          radius={0}
          size={"xl"}
          mb={10}
          style={{ flex: 1, borderColor: "#B49284" }}
          sx={{ color: "#B49284", width: "100%" }}
          variant={"outline"}
        >
          Подробнее
        </Button>
      </Card.Section>
    </Card>
  );
};

export default ServiceCard;
