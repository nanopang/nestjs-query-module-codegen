const { camelCase, paramCase, pascalCase } = require("change-case");
const fs = require("fs");
const pluralize = require("pluralize");

const basePath = "src/modules";

const fileNames = process.argv.slice(2, process.argv.length);

fileNames.forEach((fileName) => {
  if (!fileName) throw Error("Invalid Name");
  const modulePath = `${basePath}/${fileName}`;

  //Create Folders
  if (!fs.existsSync(modulePath)) {
    fs.mkdirSync(modulePath);
  }
  if (!fs.existsSync(modulePath + "/entity")) {
    fs.mkdirSync(modulePath + "/entity");
  }
  if (!fs.existsSync(modulePath + "/dto")) {
    fs.mkdirSync(modulePath + "/dto");
  }

  //Module
  fs.readFile(
    "scripts/nestjs-codegen/template/template.module",
    "utf-8",
    function (err, data) {
      if (err) throw err;
      data = data.replace(/Template/g, pascalCase(fileName));
      data = data.replace(/template/g, paramCase(fileName));
      fs.writeFileSync(
        `${modulePath}/${paramCase(fileName)}.module.ts`,
        data,
        "utf-8"
      );
    }
  );

  //Service
  fs.readFile(
    "scripts/nestjs-codegen/template/template.service",
    "utf-8",
    function (err, data) {
      if (err) throw err;
      data = data.replace(/Template/g, pascalCase(fileName));
      fs.writeFileSync(
        `${modulePath}/${paramCase(fileName)}.service.ts`,
        data,
        "utf-8"
      );
    }
  );

  //DTO
  fs.readFile(
    "scripts/nestjs-codegen/template/template.gql.dto",
    "utf-8",
    function (err, data) {
      if (err) throw err;
      data = data.replace(/Template/g, pascalCase(fileName));
      fs.writeFileSync(
        `${modulePath}/dto/${paramCase(fileName)}.gql.dto.ts`,
        data,
        "utf-8"
      );
    }
  );

  //Entity
  fs.readFile(
    "scripts/nestjs-codegen/template/template.entity",
    "utf-8",
    function (err, data) {
      if (err) throw err;
      data = data.replace(/Template/g, pascalCase(fileName));
      data = data.replace(/templates/g, pluralize(camelCase(fileName)));
      fs.writeFileSync(
        `${modulePath}/entity/${paramCase(fileName)}.entity.ts`,
        data,
        "utf-8"
      );
    }
  );

  //DTO Index
  fs.readFile(
    "scripts/nestjs-codegen/template/template.dto.index",
    "utf-8",
    function (err, data) {
      if (err) throw err;
      data = data.replace(/template/g, paramCase(fileName));
      fs.writeFileSync(`${modulePath}/dto/index.ts`, data, "utf-8");
    }
  );
});
