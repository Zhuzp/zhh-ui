import {spawn} from "child_process";
import {projectRoot} from "./paths";

export const withTaskName = <T>(name: string, fn) => {
    Object.assign(fn, {displayName: name});
}

export const run = async (command: string) => {
    console.log(11)
    return new Promise((resolve) => {
        const [cmd, ...args] = command.split(" ");
        const app = spawn(cmd, args, {
            cwd: projectRoot,
            stdio: "inherit",
            shell: true
        })
        app.on('close', resolve)
    })

}