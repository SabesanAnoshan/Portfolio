const fs = require("fs");
const chokidar = require("chokidar");
const JavaScriptObfuscator = require("javascript-obfuscator");

const input = "main.js";
const output = "app.min.js";

function obfuscate() {
    try {
        const code = fs.readFileSync(input, "utf8");

        const result = JavaScriptObfuscator.obfuscate(code, {
            compact: true,
            controlFlowFlattening: true,
            stringArray: true,
            stringArrayEncoding: ["base64"]
        });

        fs.writeFileSync(
            output,
            result.getObfuscatedCode()
        );

        console.log("✅ app.min.js updated");
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

obfuscate();

chokidar.watch(input).on("change", () => {
    console.log("🔄 app.js changed...");
    obfuscate();
});
