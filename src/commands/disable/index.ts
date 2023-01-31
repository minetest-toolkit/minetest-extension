import * as vscode from "vscode";
import update_import_paths from "../../utils/update_import_paths";

export default vscode.commands.registerCommand(
  "minetest-toolkit.disable",
  () => {
    let settings = vscode.workspace.getConfiguration("minetest-toolkit");

    settings.update("context", "disabled");
    update_import_paths();

    vscode.window.showInformationMessage("Minetest Toolkit Context Disabled!");
  }
);
