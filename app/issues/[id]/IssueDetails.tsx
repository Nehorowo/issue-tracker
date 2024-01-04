import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

export const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Flex gap="3">
        <Heading as="h1">{issue.title}</Heading>
        <IssueStatusBadge status={issue.status} />
      </Flex>
      <Text>{issue.createdAt.toDateString()}</Text>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};
