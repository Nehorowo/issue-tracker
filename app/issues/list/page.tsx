import prisma from "@/prisma/client";
import { Box, Flex } from "@radix-ui/themes";
import { Pagination } from "@/app/components";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import { IssueQuery, IssueTable, columnNames } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const page = parseInt(searchParams?.page) || 1;
  const pageSize = 10;

  const orderBy = columnNames.includes(searchParams?.orderBy)
    ? { [searchParams?.orderBy]: searchParams.sortDirection || "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" justify="center" gap="5">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemsCount={issuesCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
