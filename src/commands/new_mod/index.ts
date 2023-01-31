import * as vscode from "vscode";
//import create_folders from "../../utils/create_folders";

export default vscode.commands.registerCommand(
  "minetest-toolkit.newMod",
  () => {
    vscode.window.showWarningMessage("Not Implemented");
    //create_folders(["menu", "mods"]);
  }
);
