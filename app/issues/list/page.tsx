import prisma from "@/prisma/client";
import { Box, Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link, Pagination } from "@/app/components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sortDirection: "asc" | "desc";
    page: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const page = parseInt(searchParams?.page) || 1;
  const pageSize = 10;

  const orderBy = columns
    .map(({ value }) => value)
    .includes(searchParams?.orderBy)
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
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(({ label, value, className }) => (
              <Table.ColumnHeaderCell key={value} className={className}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: value,
                      sortDirection:
                        searchParams.orderBy === value &&
                        searchParams.sortDirection === "asc"
                          ? "desc"
                          : "asc",
                    },
                  }}
                >
                  {label}
                </NextLink>
                {value === searchParams?.orderBy &&
                  (searchParams?.sortDirection === "asc" ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  ))}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Box mt="5">
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemsCount={issuesCount}
        />
      </Box>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
