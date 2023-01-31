import * as fs from "fs";
import * as path from "path";
import root_path from "./root_path";

/**
 * Create folders in the workspace
 * @param folders List of folders to create
 */
export default function (folders: Array<string>) {
  for (const folder of folders) {
    const fullpath = path.join(root_path(), folder);
    if (!fs.existsSync(fullpath)) {
      fs.mkdirSync(fullpath);
    }
  }
}
