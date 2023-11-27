import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  if (typeof Number(params.id) !== "number") notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });

  if (!issue) notFound();

  return (
    <Flex direction="column" gap="3">
      <Flex gap="3">
        <Heading as="h1">{issue.title}</Heading>
        <IssueStatusBadge status={issue.status} />
      </Flex>
      <Text>{issue.createdAt.toDateString()}</Text>
      <Card>
        <Text>{issue.description}</Text>
      </Card>
    </Flex>
  );
};

export default IssueDetailPage;
