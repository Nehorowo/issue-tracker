import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  sortDirection: "asc" | "desc";
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

export const IssueTable = ({ searchParams, issues }: Props) => (
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
);

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map(({ value }) => value);
