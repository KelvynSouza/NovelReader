export class TestsGroup {
  testsclass?: TestClass[];
  nameSpace?: string = "";
  outcome?:boolean = true;
  show?:boolean = false;
}

export class TestClass {
  classname?: string = "";
  tests?:Test[];
  outcome?:boolean = true;
  show?:boolean = false;
}

export class Test
{
  executionId?: string = "";
  testId?: string = "";
  startTime?: Date;
  testname?: string = "";
  output?: string = "";
  outcome?: boolean;
  errorInfo?: string = "";
}
export class Counters {
  total?: string = "";
  executed?: string = "";
  passed?: string = "";
  failed?: string = "";
  error?: string = "";
  timeout?: string = "";
  aborted?: string = "";
  inconclusive?: string = "";
  passedButRunAborted?: string = "";
  notRunnable?: string = "";
  notExecuted?: string = "";
  disconnected?: string = "";
  warning?: string = "";
  completed?: string = "";
  inProgress?: string = "";
  pending?: string = "";
}
export class BaseTests {
  Counters?: Counters;
  TestsGroups?: TestsGroup[];
  date?:string;
}
