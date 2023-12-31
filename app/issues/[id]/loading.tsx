import { Skeleton } from "@/app/components";
import { Card, Flex } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  return (
    <Flex direction="column" gap="3">
      <Flex gap="3">
        <Flex direction="row" gap="2">
          <Skeleton width="8rem" />
          <Skeleton width="5rem" />
        </Flex>
      </Flex>
      <Skeleton width="5rem" />
      <Card className="prose mt-4">
        <Skeleton count={2} />
      </Card>
    </Flex>
  );
};

export default LoadingIssueDetailPage;
