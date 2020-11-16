/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ts from 'typescript';
import { InputFileSystem } from 'webpack';
export declare class NgccProcessor {
    private readonly propertiesToConsider;
    private readonly compilationWarnings;
    private readonly compilationErrors;
    private readonly basePath;
    private readonly tsConfigPath;
    private readonly inputFileSystem;
    private readonly symlinks;
    private _processedModules;
    private _logger;
    private _nodeModulesDirectory;
    private _resolver;
    constructor(propertiesToConsider: string[], compilationWarnings: (Error | string)[], compilationErrors: (Error | string)[], basePath: string, tsConfigPath: string, inputFileSystem: InputFileSystem, symlinks: boolean | undefined);
    /** Process the entire node modules tree. */
    process(): void;
    /** Process a module and it's depedencies. */
    processModule(moduleName: string, resolvedModule: ts.ResolvedModule | ts.ResolvedTypeReferenceDirective): void;
    invalidate(fileName: string): void;
    /**
     * Try resolve a package.json file from the resolved .d.ts file.
     */
    private tryResolvePackage;
    private findNodeModulesDirectory;
}
