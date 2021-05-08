import { TestResult } from "./model/nunitTests";
import { BaseTests, Test, TestsGroup, TestClass } from "../model/baseTests";

/*
export function convertToBaseTests(xmlModel: TestResult) {
  var testsReturn: Test[] = [];
  var Test: BaseTests = {};

  Test.Counters = xmlModel.TestRun.ResultSummary.Counters;

  for (var testEntry of xmlModel.TestRun.TestEntries.TestEntry) {
    var testReturn: Test = {};
    testReturn.executionId = testEntry.executionId;
    testReturn.testId = testEntry.testId;

    var unitTestResult = xmlModel.TestRun.Results.UnitTestResult.find(function(
      element
    ) {
      return element.testId === testReturn.testId;
    });
    var unitTest = xmlModel.TestRun.TestDefinitions.UnitTest.find(function(
      element
    ) {
      return element.id === testReturn.testId;
    });

    testReturn.nameSpace = unitTest.TestMethod.className.substring(
      0,
      unitTest.TestMethod.className.lastIndexOf(".")
    );
    testReturn.classname = unitTest.TestMethod.className.substring(
      unitTest.TestMethod.className.lastIndexOf(".") + 1
    );

    testReturn.startTime = new Date(unitTestResult.startTime);

    testReturn.testname = unitTest.name;

    if (unitTestResult.Output) {
      if (unitTestResult.Output.ErrorInfo)
        testReturn.errorInfo =
          unitTestResult.Output.ErrorInfo.Message +
          unitTestResult.Output.ErrorInfo.StackTrace;

      if (unitTestResult.Output.StdOut)
        testReturn.output = unitTestResult.Output.StdOut;
    }

    if (unitTestResult.outcome == "Passed") testReturn.outcome = true;
    else testReturn.outcome = false;

    testsReturn.push(testReturn);
  }

  Test.Tests = testsReturn;
  return Test;
}
*/
export function convertToBaseTests(xmlModel: TestResult): BaseTests {
  var testsBase: BaseTests = {};
  testsBase.Counters = xmlModel.TestRun.ResultSummary.Counters;
  testsBase.date = xmlModel.TestRun.Times.start.substring(
    0,
    xmlModel.TestRun.Times.start.lastIndexOf(".")
  );
  //Filter tests by namespace

  //get all namespaces
  var namespaces: string[] = [];
  xmlModel.TestRun.TestDefinitions.UnitTest.forEach(e => {
    namespaces.push(
      e.TestMethod.className.substring(
        0,
        e.TestMethod.className.lastIndexOf(".")
      )
    );
  });
  namespaces = [...new Set(namespaces)];

  var testsByNamespace: {
    namespace?: string;
    tests?: {
      id?: string[];
      class?: string;
    }[];
  }[] = [];

  for (var nameSpace of namespaces) {
    var tests: {
      namespace?: string;
      tests?: {
        id?: string[];
        class?: string;
      }[];
    } = {};

    var test: {
      id?: string[];
      class?: string;
    }[] = [];

    tests.namespace = nameSpace;

    //Get all classes for namespace
    var classes: string[] = [];
    xmlModel.TestRun.TestDefinitions.UnitTest.filter(function(element) {
      return element.TestMethod.className.includes(nameSpace);
    }).forEach(e => {
      classes.push(
        e.TestMethod.className.substring(
          e.TestMethod.className.lastIndexOf(".") + 1
        )
      );
    });
    classes = [...new Set(classes)];

    //get all id for class
    for (var clas of classes) {
      var ids: string[] = [];
      xmlModel.TestRun.TestDefinitions.UnitTest.filter(function(element) {
        return element.TestMethod.className.includes(clas);
      }).forEach(e => {
        ids.push(e.id);
      });
      test.push({
        id: ids,
        class: clas
      });
    }
    tests.tests = test;
    testsByNamespace.push(tests);
  }

  var testGroups: TestsGroup[] = [];
  // tests' information
  for (var testbynamespace of testsByNamespace) {
    var testGroup: TestsGroup = { outcome: true };
    var tclasses: TestClass[] = [];

    for (var testclass of testbynamespace.tests) {
      var tclass: TestClass = { outcome: true };
      var testsReturn: Test[] = [];

      for (var testid of testclass.id) {
        var testReturn: Test = {};
        testReturn.testId = testid;

        var unitTestResult = xmlModel.TestRun.Results.UnitTestResult.find(
          function(element) {
            return element.testId === testReturn.testId;
          }
        );
        var unitTest = xmlModel.TestRun.TestDefinitions.UnitTest.find(function(
          element
        ) {
          return element.id === testReturn.testId;
        });

        testReturn.startTime = new Date(unitTestResult.startTime);

        testReturn.testname = unitTest.name;

        if (unitTestResult.Output) {
          if (unitTestResult.Output.ErrorInfo)
            testReturn.errorInfo =
              unitTestResult.Output.ErrorInfo.Message +
              unitTestResult.Output.ErrorInfo.StackTrace;

          if (unitTestResult.Output.StdOut)
            testReturn.output = unitTestResult.Output.StdOut;
        }

        if (unitTestResult.outcome == "Passed") testReturn.outcome = true;
        else {
          testReturn.outcome = false;
          tclass.outcome = false;
          testGroup.outcome = false;
        }

        testsReturn.push(testReturn);
      }
      testsReturn.sort(function(a, b) {
        return a.startTime.getTime() - b.startTime.getTime();
      });
      tclass.classname = testclass.class;
      tclass.tests = testsReturn;
      tclasses.push(tclass);
    }

    testGroup.nameSpace = testbynamespace.namespace;
    testGroup.testsclass = tclasses;
    testGroups.push(testGroup);
  }
  testsBase.TestsGroups = testGroups;
  return testsBase;
}
