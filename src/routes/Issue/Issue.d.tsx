import { RouteComponentProps } from "react-router";

interface IMatchParams {
  issueId: string;
}

export interface IIssueProps extends RouteComponentProps<IMatchParams> {}
