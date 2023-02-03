import * as vscode from "vscode";
import * as path from "path";

const deprecatedFiles: Array<{ file: string; replace: string }> = [
  { file: "depends.txt", replace: "mod.conf" },
  { file: "description.txt", replace: "mod.conf" },
];

function updateDiagnostics(
  document: vscode.TextDocument,
  collection: vscode.DiagnosticCollection
) {
  if (document) {
    for (const e in deprecatedFiles) {
      if (path.basename(document.uri.fsPath) === deprecatedFiles[e].file) {
        collection.set(document.uri, [
          {
            code: "deprecated-file",
            message: `${deprecatedFiles[e].file} is deprecated, use ${deprecatedFiles[e].replace} instead`,
            range: document.validateRange(
              new vscode.Range(
                new vscode.Position(0, 0),
                new vscode.Position(document.lineCount, 100)
              )
            ),
            severity: vscode.DiagnosticSeverity.Warning,
            source: "Minetest Toolkit",
          },
        ]);
      }
    }
  } else {
    collection.clear();
  }
}

export default function () {
  const collection = vscode.languages.createDiagnosticCollection(
    "minetest-configuration-files"
  );

  if (vscode.window.activeTextEditor) {
    updateDiagnostics(vscode.window.activeTextEditor.document, collection);
  }

  // TODO: load diagnostics on workspace load
  // TODO: provide code action to remove files (and move content to right files?)

  return [
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        updateDiagnostics(editor.document, collection);
      }
    }),
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (e?.document) {
        updateDiagnostics(e.document, collection);
      }
    }),
  ];
}
