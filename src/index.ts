import { Config } from "./bin/types";
import moment from 'moment';

class logger {
    config: Config;
    constructor() {
    }

    setConfigs = (config: Config) => {
        this.config = config;
        this.overrideConsole();
    };

    overrideConsole = () => {
        this.config.consoleOverrides.forEach(name => {
            let ref = console[name];
            console[name] = function () {
                ref.apply(console, [this.getPrefix(), this.getSuffix(), ...Array.from(arguments)]);
            }.bind(this);
        });
    };

    getPrefix = (funcName): string => {
        let stringBuilder: string[] = [];
        //build prefix

        if (this.config.prefix.custom && Array.isArray(this.config.prefix.custom)) {
            this.config.prefix.custom.forEach(customPrefix => {
                stringBuilder.push(this.generateBuilderAddon(customPrefix));
            });
        }

        if (this.config.prefix.date) {
            if (typeof this.config.prefix.date === "boolean") {
                stringBuilder.push(this.generateBuilderAddon(moment().format('MM-DD-YYYY hh:mm:ss A')));
            } else if (typeof this.config.prefix.date === "string") {
                stringBuilder.push(this.generateBuilderAddon(moment().format(this.config.prefix.date)));
            }
        }

        if (this.config.prefix.includeConsoleFunctionName) {
            stringBuilder.push(this.generateBuilderAddon(funcName));
        }
        let filtered = stringBuilder.filter(val => val && val !== '');
        return this.generateBuilderAddon(this.config.prefix.decorators.pre) + filtered.join(this.config.prefix.seperator || '') + this.generateBuilderAddon(this.config.prefix.decorators.post);
    };

    getSuffix = (): string => {
        return this.config.suffix.join(this.config.suffixSeperator || ' ');
    };

    generateBuilderAddon = (affix: any) => {
        return affix && affix !== '' ? affix : '';
    };
}

export const Logger = new logger();
