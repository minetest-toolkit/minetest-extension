import * as vscode from "vscode";
import update_import_paths from "../../utils/update_import_paths";

export default vscode.commands.registerCommand(
  "minetest-toolkit.enableGame",
  () => {
    let settings = vscode.workspace.getConfiguration("minetest-toolkit");

    settings.update("context", "game");
    update_import_paths();

    vscode.window.showInformationMessage(
      "Minetest Toolkit Game Context Activated!"
    );
  }
);
