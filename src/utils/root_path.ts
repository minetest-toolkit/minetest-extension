import * as vscode from "vscode";

export default () =>
  vscode.workspace.workspaceFolders !== undefined
    ? vscode.workspace.workspaceFolders[0].uri.fsPath
    : "";
