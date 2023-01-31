import * as vscode from "vscode";
import create_folders from "../../utils/create_folders";

export default vscode.commands.registerCommand(
  "minetest-toolkit.newGame",
  () => {
    vscode.window.showInformationMessage("Hello World!");
    create_folders(["menu", "mods"]);
  }
);
