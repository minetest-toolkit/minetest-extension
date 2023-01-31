import * as vscode from "vscode";

import newGame from "./commands/new_game";
import update_import_paths from "./utils/update_import_paths";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "minetest-toolkit" is now active!'
  );

  let settings = vscode.workspace.getConfiguration("minetest-toolkit");

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "minetest-toolkit.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from Minetest Toolkit!"
      );
    }
  );

  // Execute update_import_paths when the "context" configuration value changed in VSCode
  vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("minetest-toolkit.context")) {
      update_import_paths();
    }
  });

  let enableGame = vscode.commands.registerCommand(
    "minetest-toolkit.toggleGame",
    () => {
      settings.update("context", "game");
      update_import_paths();

      vscode.window.showInformationMessage(
        "Minetest Toolkit Game Context Activated!"
      );
    }
  );

  let disable = vscode.commands.registerCommand(
    "minetest-toolkit.disable",
    () => {
      settings.update("context", "disabled");
      update_import_paths();

      vscode.window.showInformationMessage(
        "Minetest Toolkit Game Context Activated!"
      );
    }
  );

  context.subscriptions.push(disposable, enableGame, disable, newGame);
}

export function deactivate() {}
