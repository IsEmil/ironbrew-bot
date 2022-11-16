const cp = require("child_process");
const path = require("path");
const tmp = require("tmp");
const fs = require("fs");

/**
 * @param {String} src
 */
module.exports = (src) => {
    return new Promise((resolve, reject) => {
       // Input = Inputted file by user
        const input = tmp.fileSync();
        const output = tmp.fileSync();
        // Output = Obfuscated file returned by IronBrew

        fs.writeFileSync(input.name, src);
        
        // Spawns a process for IronBrew Client dll and parces the file name and output name

        const process = cp.spawn("dotnet", [path.join(__dirname, "/ib2/Source/IronBrew2 CLI.dll"), input.name, output.name], {
            cwd: path.join(__dirname, "/ib2/Source"), // Joins the Current Working dir of the js file with the source folder
            detached: true, // detaches
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
