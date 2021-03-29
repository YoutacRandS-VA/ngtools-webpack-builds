"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileCache = void 0;
const paths_1 = require("./paths");
class SourceFileCache extends Map {
    constructor() {
        super(...arguments);
        this.angularDiagnostics = new Map();
    }
    invalidate(fileTimestamps, buildTimestamp) {
        const changedFiles = new Set();
        for (const [file, timeOrEntry] of fileTimestamps) {
            if (timeOrEntry === 'ignore') {
                continue;
            }
            let time;
            if (typeof timeOrEntry === 'number') {
                time = timeOrEntry;
            }
            else if (timeOrEntry) {
                time = timeOrEntry.safeTime;
            }
            if (!time || time >= buildTimestamp) {
                // Cache stores paths using the POSIX directory separator
                const normalizedFile = paths_1.normalizePath(file);
                const sourceFile = this.get(normalizedFile);
                if (sourceFile) {
                    this.delete(normalizedFile);
                    this.angularDiagnostics.delete(sourceFile);
                }
                changedFiles.add(normalizedFile);
            }
        }
        return changedFiles;
    }
    updateAngularDiagnostics(sourceFile, diagnostics) {
        if (diagnostics.length > 0) {
            this.angularDiagnostics.set(sourceFile, diagnostics);
        }
        else {
            this.angularDiagnostics.delete(sourceFile);
        }
    }
    getAngularDiagnostics(sourceFile) {
        return this.angularDiagnostics.get(sourceFile);
    }
}
exports.SourceFileCache = SourceFileCache;
