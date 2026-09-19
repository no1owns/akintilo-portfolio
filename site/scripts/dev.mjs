import {spawn} from 'node:child_process';
const cms=spawn(process.execPath,['node_modules/decap-server/dist/index.js'],{stdio:'inherit',env:{...process.env,BIND_HOST:'127.0.0.1'}});
const vite=spawn(process.execPath,['node_modules/vite/bin/vite.js',...process.argv.slice(2)],{stdio:'inherit'});
const stop=()=>{cms.kill();vite.kill();};
process.on('SIGINT',stop);process.on('SIGTERM',stop);
vite.on('exit',code=>{cms.kill();process.exitCode=code||0;});
