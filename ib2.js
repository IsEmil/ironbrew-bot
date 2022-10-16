const cp = require("child_process");
const path = require("path");
const tmp = require("tmp");
const fs = require("fs");

/**
 * @param {String} src
 */
module.exports = (src) => {
    return new Promise((resolve, reject) => {
        const input = tmp.fileSync();
        const output = tmp.fileSync();

        fs.writeFileSync(input.name, src);

        const process = cp.spawn("dotnet", [path.join(__dirname, "/ib2/Source/IronBrew2 CLI.dll"), input.name, output.name], {
            cwd: path.join(__dirname, "/ib2/Source"),
            detached: true,
        });

        process.stderr.on("data", (data) => {
            const err = Buffer.from(data).toString("ascii");
            console.log(err);
        });

        process.on("error", (err) => reject(err));

        process.on("exit", (code) => {
            if (code !== 0) return reject(new Error("Unknown error"));

            let source = fs.readFileSync(output.name, "utf-8");

            input.removeCallback();
            output.removeCallback();

            return resolve(source);
        });
    });
}