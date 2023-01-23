import Head from "next/head";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  FormError,
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer
} from "./styles";
import { Container, Header } from "../styles";

import { getWeekDays } from "../../../utils/get-week-days";
import { convertTimeStringInMinutes } from "../../../utils/convert-time-string-in-minutes";

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enable: z.boolean(),
        startTime: z.string(),
        endTime: z.string()
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((intervals) => intervals.enable))
    .refine((intervals) => intervals.length, {
      message: "Você precisa selecionar pelo menos um dia da semana!"
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringInMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringInMinutes(interval.endTime)
        };
      });
    })
});

type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>;

export default function TimeIntervals() {
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    resolver: zodResolver(timeIntervalsFormSchema),
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
          enable: false,
          startTime: "09:00",
          endTime: "18:00"
        }
      ]
    }
  });

  const intervals = watch("intervals");

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    control,
    name: "intervals"
  });

  function handleSetTimeIntervals(data: TimeIntervalsFormData) {
    console.log(data);
  }

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
                  <Controller
                    name={`intervals.${index}.enable`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        onCheckedChange={(checked) => {
                          field.onChange(checked === true);
                        }}
                        checked={field.value}
                      />
                    )}
                  />

                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>

                <IntervalInputs>
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={intervals[index].enable === false}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={intervals[index].enable === false}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            ))}
          </IntervalsContainer>

          {errors.intervals && (
            <FormError size="sm">{errors.intervals.message}</FormError>
          )}

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo <ArrowRight />
          </Button>
        </IntervalBox>
      </Container>
    </>
  );
}
