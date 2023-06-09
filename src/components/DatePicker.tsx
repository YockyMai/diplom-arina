import { Alert, Box, Button, SimpleGrid, Text, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Day, Time } from "../types/objects/service";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";

type Props = {
  days: Day[];
  selectedDayId: number;
  setSelectedDayId: Dispatch<SetStateAction<number | null>>;
  selectedTimeId: number | null;
  setSelectedTimeId: Dispatch<SetStateAction<number | null>>;
};

export const MyDatePicker: FC<Props> = ({
  days,
  setSelectedDayId,
  selectedDayId,
  setSelectedTimeId,
  selectedTimeId,
}) => {
  const sortedTime = days[0].times.sort((curr, prev) =>
    Number(curr.time.replace(":", "")) > Number(prev.time.replace(":", ""))
      ? 1
      : -1
  );
  const [times, setTimes] = useState<Time[]>(sortedTime);

  const onDayChange = (dayId: number) => {
    setSelectedTimeId(null);
    const selectedDay = days.find((day) => day.id === dayId);
    if (!selectedDay) return;

    setSelectedDayId(selectedDay.id);
    setTimes(selectedDay.times);
  };

  const onTimeSelect = (timeId: number) => {
    setSelectedTimeId(timeId);
  };

  return (
    <Box
      sx={{ backgroundColor: "rgba(180,146,132,0.2)", borderRadius: "0.3em" }}
      p={"xl"}
    >
      <Title py={"sm"} order={5} color={"#B49284"}>
        Выберите дату для записи
      </Title>
      <Box sx={{ maxWidth: 400, margin: "0 auto" }}>
        <Carousel
          height={40}
          initialSlide={2}
          slideSize="33.333333%"
          mx="auto"
          px={50}
        >
          {days.map((day) => (
            <Carousel.Slide key={day.id}>
              <Button
                radius={0}
                style={{
                  flex: 1,
                  borderColor: "#B49284",
                  color: selectedDayId === day.id ? "#FFF" : "#B49284",
                  backgroundColor:
                    selectedDayId === day.id ? "#B49284" : "#FFF",
                }}
                sx={{
                  color: "#B49284",
                  width: "100%",
                  transition: "0.3s",
                  ":hover": {
                    backgroundColor: "#B49284 !important",
                    color: "#FFF !important",
                    transition: "0.3s",
                  },
                }}
                onClick={() => onDayChange(day.id)}
              >
                {dayjs(day.day).locale("ru").format("D MMMM")}
              </Button>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
      <Text color={"#B49284"} align={"center"} mt={"xl"}>
        Выберите время
      </Text>
      <SimpleGrid p={"sm"} cols={3}>
        {times.map((timeObj) => (
          <Button
            key={timeObj.id}
            onClick={() => onTimeSelect(timeObj.id)}
            radius={0}
            style={{
              flex: 1,
              borderColor: "#B49284",
              color: selectedTimeId === timeObj.id ? "#FFF" : "#B49284",
              backgroundColor:
                selectedTimeId === timeObj.id ? "#B49284" : "#FFF",
            }}
            sx={{
              color: "#B49284",
              width: "100%",
              transition: "0.3s",
              ":hover": {
                backgroundColor: "#B49284 !important",
                color: "#FFF !important",
                transition: "0.3s",
              },
            }}
          >
            {timeObj.time}
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
};
