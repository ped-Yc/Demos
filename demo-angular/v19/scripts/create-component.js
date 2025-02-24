const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const componentName = process.argv[2];

let componentPath = path.join("src/app/components");
// Angular CLI不支持路径中的反斜杠（\）不友好，因此将其替换为正斜杠（/）
componentPath = componentPath.replace(/\\/g, "/");

if (!componentName) {
  console.error("Please provide a component name.");
  process.exit(1);
}

try {
  execSync(`ng generate component ${componentName} --path=${componentPath}`, {
    stdio: "inherit",
  });
  console.log(`Component created!`);
} catch (error) {
  console.error(`Error creating component: ${error}`);
  process.exit(1);
}
