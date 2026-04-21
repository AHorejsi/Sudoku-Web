#!/usr/bin/env node
import * as cdk from "aws-cdk-lib/core";
import { SudokuCdkStack } from "../lib/sudoku-cdk-stack";

const app = new cdk.App();
const _ = new SudokuCdkStack(app, "SudokuCdkStack", {
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_REGION
  }
});
