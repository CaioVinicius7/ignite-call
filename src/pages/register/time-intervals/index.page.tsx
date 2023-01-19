import Head from "next/head";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput
} from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";

import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer
} from "./styles";
import { Container, Header } from "../styles";
import { getWeekDays } from "../../../utils/get-week-days";

export default function TimeIntervals() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      intervals: [
        {
          weekDay: 0,
          enable: false,
          startTime: "09:00",
          endTime: "18:00"
        },
        {
          weekDay: 1,
          enable: true,
          startTime: "09:00",
          endTime: "18:00"
        },
        {
          weekDay: 2,
          enable: true,
          startTime: "09:00",
          endTime: "18:00"
        },
        {
          weekDay: 3,
          enable: true,
          startTime: "09:00",
          endTime: "18:00"
        },
        {
          weekDay: 4,
          enable: true,
          startTime: "09:00",
          endTime: "18:00"
        },
        {
          weekDay: 5,
          enable: true,
          startTime: "09:00",
          endTime: "18:00"
        },
        {
          weekDay: 6,
          enable: true,
          startTime: "09:00",
          endTime: "18:00"
        }
      ]
    }
  });

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    control,
    name: "intervals"
  });

  function handleSetTimeIntervals(data: any) {}

  return (
    <>
      <Head>
        <title> Ignite Call | Registro </title>
      </Head>
      <Container>
        <Header>
          <Heading as="strong">Quase lá</Heading>
          <Text>
            Defina o intervalo de horários que você está disponível em cada dia
            da semana.
          </Text>

          <MultiStep size={4} currentStep={3} />
        </Header>

        <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
          <IntervalsContainer>
            {fields.map((field, index) => (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Checkbox />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>

                <IntervalInputs>
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            ))}
          </IntervalsContainer>

          <Button type="submit">
            Próximo passo <ArrowRight />
          </Button>
        </IntervalBox>
      </Container>
    </>
  );
}
