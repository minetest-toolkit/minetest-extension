import * as vscode from "vscode";

import commands from "./commands";
import update_import_paths from "./utils/update_import_paths";
import diagnostic_deprecated_files from "./diagnostic_deprecated_files";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "minetest-toolkit" is now active!'
  );

  let settings = vscode.workspace.getConfiguration("minetest-toolkit");

  // Update import paths

  // Execute update_import_paths when the "context" configuration value changed in VSCode
  let updateOnChange = vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("minetest-toolkit")) {
      update_import_paths();
    }
  });

  context.subscriptions.push(
    ...commands,
    updateOnChange,
    ...diagnostic_deprecated_files()
  );
}

export function deactivate() {}
