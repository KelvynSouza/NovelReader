
   
         export class Times
         {
             creation?: string = "";
             queuing?: string = "";
             start?: string = "";
             finish?: string = "";
         }
 
          export class Deployment
         {
             runDeploymentRoot?: string = "";
         }
 
          export class TestSettings
         {
             Deployment?: Deployment;
             name?: string = "";
             id?: string = "";
         }
 
          export class ErrorInfo
         {
             Message?: string = "";
             StackTrace?: string = "";
         }
 
          export class Output
         {
             ErrorInfo?: ErrorInfo;
             StdOut?: string = "";
         }
 
          export class UnitTestResult
         {
             Output?: Output;
             executionId?: string = "";
             testId?: string = "";
             testName?: string = "";
             computerName?: string = "";
             duration?: string = "";
             startTime?: string = "";
             endTime?: string = "";
             testType?: string = "";
             outcome?: string = "";
             testListId?: string = "";
             relativeResultsDirectory?: string = "";
         }
 
          export class Results
         {
             UnitTestResult?: UnitTestResult[];
         }
 
          export class Execution
         {
             id?: string = "";
         }
 
          export class TestMethod
         {
             codeBase?: string = "";
             adapterTypeName?: string = "";
             className?: string = "";
             name?: string = "";
         }
 
          export class UnitTest
         {
             Execution?: Execution;
             TestMethod?: TestMethod;
             name?: string = "";
             storage?: string = "";
             id?: string = "";
         }
 
          export class TestDefinitions
         {
             UnitTest?: UnitTest[];
         }
 
          export class TestEntry
         {
             testId?: string = "";
             executionId?: string = "";
             testListId?: string = "";
         }
 
          export class TestEntries
         {
             TestEntry?: TestEntry[];
         }
 
          export class TestList
         {
             name?: string = "";
             id?: string = "";
         }
 
          export class TestLists
         {
             TestList?: TestList[];
         }
 
          export class Counters
         {
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
 
         export class ResultSummary
         {
             Counters?: Counters;
             Output?: Output;
             outcome?: string = "";
         }
 
         export class TestRun
         {
             Times?: Times;
             TestSettings?: TestSettings;
             Results?: Results;
             TestDefinitions?: TestDefinitions;
             TestEntries?: TestEntries;
             TestLists?: TestLists;
             ResultSummary?: ResultSummary;
             id?: string = "";
             name?: string = "";
             runUser?: string = "";
             xmlns?: string =  "";
         }
 
         export class TestResult{
             TestRun?: TestRun;
         }
 
     
 
 
 