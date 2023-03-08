import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { Avatar, Heading, Text } from "@ignite-ui/react";

import { ScheduleForm } from "./ScheduleForm";

import { Container, UserHeader } from "./styles";

import { prisma } from "../../../lib/prisma";

interface ScheduleProps {
  user: {
    name: string;
    bio: string;
    avatarUrl: string;
  };
}

export default function Schedule({ user }: ScheduleProps) {
  const userFirstName = user.name.split(" ").at(0);

  return (
    <>
      <Head>
        <title> Ignite Call | {userFirstName} </title>
      </Head>
      <Container>
        <UserHeader>
          <Avatar src={user.avatarUrl} alt="" />

          <Heading>{user.name}</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>

        <ScheduleForm />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username);

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  });

  if (!user) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url
      }
    },
    revalidate: 60 * 60 * 24 // 24 Hours
  };
};
