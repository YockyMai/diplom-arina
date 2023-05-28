import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Container, SimpleGrid, Title } from "@mantine/core";
import MasterCard from "../components/MasterCard";

const masters = [
  {
    name: "ДМИТРИЕВА ИРИНА",
    profession: "Визажист",
    image: "/1.jpg",
  },
  {
    name: "ПЕНЮКОВА ОЛЬГА",
    profession: "Мастер маникюра",
    image: "/2.jpg",
  },
  {
    name: "ЛАЗАРЕНКО АННА",
    profession: "Топ-мастер педикюра",
    image: "/3.jpg",
  },
  {
    name: "КУЧЕР ЕКАТЕРИНА",
    profession: "Топ-мастер маникюра и педикюра",
    image: "/4.jpg",
  },
  {
    name: "ТИХОНОВА АЛЕКСАНДРА",
    profession: "Топ-мастер маникюра и педикюра",
    image: "/5.jpg",
  },
  {
    name: "ЕРШОВА АННА",
    profession: "Лешмейкер",
    image: "/6.jpg",
  },
];

const MastersPage = () => {
  return (
    <MainLayout>
      <Container size={"xl"} my={150}>
        <Title color={"#B49284"} align={"center"}>
          Наши специалисты!
        </Title>
        <SimpleGrid
          cols={3}
          spacing={50}
          breakpoints={[
            { maxWidth: 550, cols: 1, spacing: 40 },
            { maxWidth: 1200, cols: 2, spacing: 40 },
          ]}
          style={{ marginTop: 30 }}
        >
          {masters.map(({ profession, name, image }) => (
            <MasterCard name={name} profession={profession} image={image} />
          ))}
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
};

export default MastersPage;
