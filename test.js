const { Logger } = require('./dist/index');
const { name, version } = require('./package.json');

// Logger.setConfigs({
//     prefix: {
//         name: 'testProj'
//     },
//     consoleOverrides: [
//         'log'
//     ]
// });

Logger.setConfigs({
    prefix: {
        decorators: {
            pre: '[',
            post: ']>'
        },
        date: true,
        seperator: ' : ',
        includeConsoleFunctionName: true,
        custom: [
            name,
            version
        ]
    },
    suffix: [],
    consoleOverrides: ['log', 'warn', 'error']
});

console.log('test');
console.warn('warn');
console.error('error');
setTimeout(() => {
    console.log('delay');
}, 1000);
