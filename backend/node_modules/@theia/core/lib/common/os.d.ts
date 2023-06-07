export declare const isWindows: boolean;
export declare const isOSX: boolean;
export declare type CMD = [string, string[]];
export declare function cmd(command: string, ...args: string[]): CMD;
export declare namespace OS {
    /**
     * Enumeration of the supported operating systems.
     */
    enum Type {
        Windows = "Windows",
        Linux = "Linux",
        OSX = "OSX"
    }
    /**
     * Returns with the type of the operating system. If it is neither [Windows](isWindows) nor [OS X](isOSX), then
     * it always return with the `Linux` OS type.
     */
    function type(): OS.Type;
    const backend: {
        type: typeof type;
        isWindows: boolean;
        isOSX: boolean;
    };
}
//# sourceMappingURL=os.d.ts.map