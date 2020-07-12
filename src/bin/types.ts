export type Config = {
    prefix?: {
        decorators?: {
            pre?: string,
            post?: string;
        };
        date?: boolean | string,
        includeConsoleFunctionName?: boolean,
        seperator?: string,
        custom?: string[];
    },
    suffix?: string[],
    suffixSeperator?: string,
    consoleOverrides?: string[];
};
