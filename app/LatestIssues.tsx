import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

export const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(
            ({ id, title, status, assignedToUserId, assignedToUser }) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <Flex justify="between">
                    <Flex direction="column" align="start" gap="2">
                      <Link href={`/issues/${id}`}>{title}</Link>
                      <IssueStatusBadge status={status} />
                    </Flex>
                    {assignedToUserId && (
                      <Avatar
                        src={assignedToUser?.image!}
                        fallback="?"
                        size="2"
                        radius="full"
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};
