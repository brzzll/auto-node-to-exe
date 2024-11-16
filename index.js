var chalk = require_source();
var path = require("path");
var fs = require("node:fs");
var { exec } = require("node:child_process");
var readline = require("node:readline");
var { stdin: input, stdout: output } = require("node:process");
var rl = readline.createInterface({ input, output });
function banner() {
  console.clear();
  console.log(chalk.white(`
        _          
     __|_|___      
    (  _____/              _          ${chalk.greenBright(`           _     `)}    _                       
    | (|_|__       ___ _ _| |_ ___ ___${chalk.greenBright(` ___ ___ _| |___ `)}___| |_ ___ ___${chalk.cyan(` ___ _ _ ___ `)}
    (_____  )     | .'| | |  _| . |___${chalk.greenBright(`|   | . | . | -_|`)}___|  _| . |___${chalk.cyan(`| -_|_'_| -_|`)}
    /\\|_|)  |     |__,|___|_| |___|   ${chalk.greenBright(`|_|_|___|___|___|`)}   |_| |___|   ${chalk.cyan(`|___|_,_|___|`)}
    \\_______) 
       |_|        ${chalk.greenBright(`V2 ~ by ZenX-Team`)} | discord.gg/zCQ8jQ2GBf

    `));
}
var directorio_node = "";
var directorio_dependencias = "";
function step1() {
  banner();
  rl.question(`${chalk.greenBright(`> Directorio del proyecto node: `)}`, (directory) => {
    fs.stat(directory, (err, stats) => {
      if (err) {
        if (err.code === "ENOENT") {
          rl.question(`${chalk.red(`[x]`)} Directorio inexistente.`, (a) => {
            step1();
          });
        } else {
          rl.question(`${chalk.yellow(`[i]`)} Ocurri\xF3 un error al verificar el directorio:
${err}`, (a) => {
            step1();
          });
        }
      } else {
        if (stats.isDirectory()) {
          directorio_node = directory;
          console.log(`${chalk.greenBright(`[Directorio]`)}: ${directory}`);
          fs.readdir(directory, (err2, files) => {
            if (err2) {
              console.error(err2);
              return;
            }
            ;
            let counter = 0;
            files.forEach((file) => {
              console.log(`${chalk.greenBright(`-`)} ${file}`);
              counter++;
              if (files.length <= counter) {
                step2();
              }
            });
          });
        } else {
          rl.question(`${chalk.red(`[x]`)} La ruta especificada no es un directorio.`, (a) => {
            step1();
          });
        }
      }
    });
  });
}
function step2() {
  console.log(``);
  function getnamexd(ruta) {
    const name = path.basename(ruta);
    return name;
  }
  let namee = getnamexd(directorio_dependencias);
  dependecias_name = namee;
  rl.question(`${chalk.greenBright(`> Quieres quitar la advertencia (ExperimentalWarning) de node al crear el ejecutable? (y/n): `)}`, (opt) => {
    if (opt === "y") {
      let nuevoTextoJSON = JSON.stringify({
        main: path.join(directorio_node, "indexf.js"),
        output: path.join(directorio_node, "output.blob"),
        disableExperimentalSEAWarning: true
      });
      fs.writeFileSync(path.join(directorio_node, "COMPILER_CONFIG.json"), nuevoTextoJSON);
      console.log(`${chalk.greenBright(`[Dependencias]`)} Nuevos valores agregados.`);
      console.log(``);
      step3();
    } else if (opt === "..") {
      step2();
    } else {
      let nuevoTextoJSON = JSON.stringify({
        main: path.join(directorio_node, "indexf.js"),
        output: path.join(directorio_node, "output.blob")
      });
      fs.writeFileSync(path.join(directorio_node, "COMPILER_CONFIG.json"), nuevoTextoJSON);
      console.log(`${chalk.greenBright(`[Dependencias]`)} Nuevos valores agregados.`);
      console.log(``);
      step3();
    }
  });
}
function step3() {
  console.log(`${chalk.greenBright(`[Ejecutable]`)} Modificando archivo...`);
  const xc = exec(`npx esbuild "${path.join(directorio_node, "index.js")}" --platform=node --bundle --outfile="${path.join(directorio_node, "indexf.js")}"`);
  xc.on("exit", () => {
    console.log(`${chalk.greenBright(`[Ejecutable]`)} Archivo modificado.`);
    console.log(`${chalk.greenBright(`[Ejecutable]`)} Creando configuraci\xF3n del ejecutable...`);
    const proceso = exec("node.exe --experimental-sea-config " + path.join(directorio_node, "COMPILER_CONFIG.json"));
    proceso.on("exit", () => {
      console.log(`${chalk.greenBright(`[Ejecutable]`)} Configuraci\xF3n del ejecutable creado.`);
      step4();
    });
  });
}
function step4() {
  console.log(`${chalk.greenBright(`[Ejecutable]`)} Generando archivo 'output.exe'...`);
  const procesowtf = exec(`node -e "require('fs').copyFileSync(process.execPath, 'output.exe')"`);
  procesowtf.on("exit", () => {
    console.log(`${chalk.greenBright(`[Ejecutable]`)} Archivo 'output.exe' creado.`);
    step5();
  });
}
function step5() {
  console.log(`${chalk.greenBright(`[Ejecutable]`)} Inyectando c\xF3digo al archivo 'output.exe'...`);
  const procesoultimowatafak = exec(`npx postject output.exe NODE_SEA_BLOB "${path.join(directorio_node)}/output.blob" --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b` + `2`);
  procesoultimowatafak.on("exit", () => {
    console.log(`${chalk.greenBright(`[Ejecutable]`)} Inyectado.`);
    fs.renameSync("output.exe", path.join(directorio_node) + "\\output.exe");
    console.log(`${chalk.greenBright(`>`)} Puedes cerrar el programa, archivo "output.exe" creado en la carpeta: "${directorio_node}" .`);
  });
}
function checkject() {
  if (!fs.existsSync(path.join(process.env.appdata, "npm", "postject"))) {
    const abug = exec("npm install postject -g");
    abug.on("exit", () => {
      checkes();
    });
  } else {
    checkes();
  }
}
function checkes() {
  if (!fs.existsSync(path.join(process.env.appdata, "npm", "esbuild"))) {
    const bbug = exec("npm install esbuild -g");
    bbug.on("exit", () => {
      step1();
    });
  } else {
    step1();
  }
}
console.clear();
console.log(chalk.yellowBright("Installing dependencies, please wait..."));
if (!fs.existsSync(path.join(process.env.appdata, "npm", "npm"))) {
  const antibugxd = exec("npm install npm -g");
  antibugxd.on("exit", () => {
    checkject();
  });
} else {
  checkject();
}
