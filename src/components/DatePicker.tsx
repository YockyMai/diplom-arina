import { Alert, Box, Button, SimpleGrid, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Day, Time } from "../types/objects/service";
import { Dispatch, FC, SetStateAction, useState } from "react";
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
  const [times, setTimes] = useState<Time[]>(days[0].times);

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
    <Alert title={"Выберите дату для записи"} color={"indigo"}>
      <Box sx={{ maxWidth: 400 }}>
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
                onClick={() => onDayChange(day.id)}
                color={selectedDayId === day.id ? "indigo" : "gray"}
              >
                {dayjs(day.day).locale("ru").format("D MMMM")}
              </Button>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
      <Text align={"center"} mt={"xl"} color={"indigo"}>
        Выберите время
      </Text>
      <SimpleGrid p={"sm"} cols={3}>
        {times.map((timeObj) => (
          <Button
            key={timeObj.id}
            onClick={() => onTimeSelect(timeObj.id)}
            color={selectedTimeId === timeObj.id ? "indigo" : "gray"}
          >
            {timeObj.time}
          </Button>
        ))}
      </SimpleGrid>
    </Alert>
  );
};
