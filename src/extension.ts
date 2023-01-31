import * as vscode from "vscode";

import commands from "./commands";
import update_import_paths from "./utils/update_import_paths";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "minetest-toolkit" is now active!'
  );

  let settings = vscode.workspace.getConfiguration("minetest-toolkit");

  // Update import paths
  update_import_paths();

  // Execute update_import_paths when the "context" configuration value changed in VSCode
  vscode.workspace.onDidChangeConfiguration((e) => {
    console.log("called");
    if (e.affectsConfiguration("minetest-toolkit.context")) {
      update_import_paths();
    }
  });

  context.subscriptions.push(...commands);
}

export function deactivate() {}
