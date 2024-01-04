import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { EditIssueButton } from "./EditIssueButton";
import { IssueDetails } from "./IssueDetails";
import { DeleteIssueButton } from "./DeleteIssueButton";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue?.id.toString()} />
          <DeleteIssueButton issueId={issue?.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
