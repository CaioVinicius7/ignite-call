import { GetServerSideProps } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea
} from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";

import { FormAnnotation, ProfileBox } from "./styles";
import { Container, Header } from "../styles";

import { buildNextAuthOptions } from "../../api/auth/[...nextauth].api";

const updateProfileSchema = z.object({
  bio: z.string()
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema)
  });

  const session = useSession();

  async function handleUpdateProfile(data: UpdateProfileData) {}

  return (
    <>
      <Head>
        <title> Ignite Call | Registro </title>
      </Head>
      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={4} />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text size="sm">Foto de perfil</Text>
            <Avatar src={session.data?.user.avatar_url} />
          </label>

          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register("bio")} />

            <FormAnnotation size="sm">
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  return {
    props: {
      session
    }
  };
};
