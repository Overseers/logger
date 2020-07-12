import { Config } from "./types";

class Logger {
    config: Config;
    constructor() {
        this.config = {
            prefix: {
                date: true
            },
            suffix: [],
            consoleOverrides: []
        };
        this.overrideConsole();
    }

    setConfigs = (config: Config) => {
        this.config = {
            ...this.config,
            ...config
        };
    };

    overrideConsole = () => {
        this.config.consoleOverrides.forEach(name => {
            let ref = console[name];
            let getRef = this;
            console[name] = function () {
                let args = Array.from(arguments);
                args.unshift(getRef.getSuffix());
                args.unshift(getRef.getPrefix());

                ref.apply(console, args);
            }.bind(this);
        });
    };

    getPrefix = (): string => {
        return 'test>';
    };

    getSuffix = (): string => {
        return 'test';
    };
}

export default new Logger();
