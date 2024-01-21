import { LatestIssues } from "./LatestIssues";
import { Pagination } from "./components";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div>
      <LatestIssues />
    </div>
  );
}
