'use strict';

import * as vscode from 'vscode';

import { copy } from 'copy-paste';
import * as open from 'open';

export function activate(context: vscode.ExtensionContext) {
    console.log('"hola-code" is now active!');

    let openCVSBrowseDisposable = vscode.commands.registerTextEditorCommand('hola.openCVSBrowse', editor => {
        let document = editor.document;
        let path = vscode.workspace.asRelativePath(document.uri);
        let line = editor.selection.active.line + 1;
        let url = `http://web.hola.org/cvs/zon/${path}#line=${line}`;
        open(url);
    });

    context.subscriptions.push(openCVSBrowseDisposable);

    let copySlackSnippetDisposable = vscode.commands.registerTextEditorCommand('hola.copySlackSnippet', editor => {
        let document = editor.document;
        let path = vscode.workspace.asRelativePath(document.uri);
        let line = editor.selection.active.line + 1;
        let text = `/snippet zon/${path}:${line}`;
        copy(text, error => {
            if (error) {
                vscode.window.showErrorMessage(error.message);
            }
        });
    });

    context.subscriptions.push(copySlackSnippetDisposable);
}

export function deactivate() { }
