import Head from "next/head";
import {
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput
} from "@ignite-ui/react";

import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer
} from "./styles";
import { Container, Header } from "../styles";

export default function TimeIntervals() {
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

        <IntervalBox as="form">
          <IntervalsContainer>
            <IntervalItem>
              <IntervalDay>
                <Checkbox />
                <Text>Segunda-feira</Text>
              </IntervalDay>

              <IntervalInputs>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInputs>
            </IntervalItem>

            <IntervalItem>
              <IntervalDay>
                <Checkbox />
                <Text>Terça-feira</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInputs>
            </IntervalItem>

            <IntervalItem>
              <IntervalDay>
                <Checkbox />
                <Text>Quarta-feira</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInputs>
            </IntervalItem>

            <IntervalItem>
              <IntervalDay>
                <Checkbox />
                <Text>Quinta-feira</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInputs>
            </IntervalItem>

            <IntervalItem>
              <IntervalDay>
                <Checkbox />
                <Text>Sexta-feira</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInputs>
            </IntervalItem>

            <IntervalItem>
              <IntervalDay>
                <Checkbox />
                <Text>Sábado</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInputs>
            </IntervalItem>

            <IntervalItem>
              <IntervalDay>
                <Checkbox />
                <Text>Domingo</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInputs>
            </IntervalItem>
          </IntervalsContainer>
        </IntervalBox>
      </Container>
    </>
  );
}
