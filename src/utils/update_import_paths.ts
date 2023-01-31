import * as vscode from "vscode";

/**
 * Update the import paths for the current context
 */
export default function () {
  console.log("Updating import paths");
  let settings = vscode.workspace.getConfiguration("minetest-toolkit");
  const extensionPath = vscode.extensions.getExtension(
    "minetest-toolkit.minetest-toolkit"
  )?.extensionPath;

  let context = settings.get<"game" | "mod" | "disabled">("context");

  // Get config for the language server
  const luaConfig = vscode.workspace.getConfiguration("Lua");

  const library: string[] =
    luaConfig.get("workspace.library") === undefined
      ? []
      : (luaConfig.get("workspace.library") as string[]);

  console.log(library && extensionPath);

  if (extensionPath) {
    // Determine the paths to use based on the context

    let paths: string[] = [];

    if (context === "game") {
      paths = [extensionPath + "/import"];
    } else if (context === "mod") {
      paths = [];
    } else {
      paths = [];
    }

    // Remove older paths if needed

    for (let i = library.length - 1; i >= 0; i--) {
      const el = library[i];
      const isSelfExtension = el.indexOf("minetest-toolkit") > -1;
      if (isSelfExtension) {
        library.splice(i, 1);
      }
    }

    // Add paths to the settings

    for (let i = paths.length - 1; i >= 0; i--) {
      if (!(library.indexOf(paths[i]) > -1)) {
        library.push(paths[i]);
      }
    }

    luaConfig.update("workspace.library", library);
  }
}
