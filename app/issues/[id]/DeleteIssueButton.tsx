import { Button } from "@radix-ui/themes";

interface Props {
  issueId: number;
}

export const DeleteIssueButton = ({ issueId }: Props) => {
  return <Button color="red">Delete Issue</Button>;
};
