#!/usr/bin/env node
import * as cdk from "aws-cdk-lib/core";
import { SudokuCdkStack } from "../lib/sudoku-cdk-stack";

const app = new cdk.App();
const _ = new SudokuCdkStack(app, "SudokuCdkStack", {
  env: {
    account: "908027395698",
    region: "us-east-1"
  }
});
