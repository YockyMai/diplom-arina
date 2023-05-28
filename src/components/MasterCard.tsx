import React from "react";
import { Box, Image, Text, Title } from "@mantine/core";

type Props = {
  name: string;
  profession: string;
  image: string;
};

const MasterCard = ({ profession, name, image }: Props) => {
  return (
    <Box>
      <div style={{ height: 400, overflow: "hidden" }}>
        <Image sx={{ height: 400 }} h={400} fit={"cover"} src={image} />
      </div>
      <Title mt={"md"} mb={"sm"} align={"left"} order={2} color={"#B49284"}>
        {name}
      </Title>
      <Text color={"#B49284"} size={24}>
        {profession}
      </Text>
    </Box>
  );
};

export default MasterCard;
