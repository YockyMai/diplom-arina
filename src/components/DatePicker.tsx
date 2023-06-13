import { Alert, Box, Button, SimpleGrid, Text, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Day, Time } from "../types/objects/service";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
  const sortedTime = days[0].times.sort((a, b) => {
    const timeA = a.time.split(":"); // Разделяем строку по двоеточию
    const timeB = b.time.split(":");

    const hourA = parseInt(timeA[0]); // Преобразуем часы в число
    const hourB = parseInt(timeB[0]);

    const minuteA = parseInt(timeA[1]); // Преобразуем минуты в число
    const minuteB = parseInt(timeB[1]);

    // Сравниваем часы
    if (hourA !== hourB) {
      return hourA - hourB;
    }

    // Если часы равны, сравниваем минуты
    return minuteA - minuteB;
  });
  const [times, setTimes] = useState<Time[]>(sortedTime);

  useEffect(() => {
    const selectedDay = days.find((day) => day.id === selectedDayId) || days[0];
    const sortedTime = selectedDay.times.sort((a, b) => {
      const timeA = a.time.split(":"); // Разделяем строку по двоеточию
      const timeB = b.time.split(":");

      const hourA = parseInt(timeA[0]); // Преобразуем часы в число
      const hourB = parseInt(timeB[0]);

      const minuteA = parseInt(timeA[1]); // Преобразуем минуты в число
      const minuteB = parseInt(timeB[1]);

      // Сравниваем часы
      if (hourA !== hourB) {
        return hourA - hourB;
      }

      // Если часы равны, сравниваем минуты
      return minuteA - minuteB;
    });
    setTimes(sortedTime);
  }, [selectedDayId]);

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
          height={50}
          initialSlide={1}
          slideSize="33.333333%"
          mx="auto"
          px={30}
        >
          {days.map((day) => (
            <Carousel.Slide key={day.id}>
              <Button
                size={"md"}
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
            size={"md"}
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
