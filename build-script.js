var replace = require('replace-in-file');
var moment = require('moment');

// Escribe las variables donde sea necesario
function writeFileConfig(oData) {

  const options = {
    files: [
      'src/app/config-default.json',
    ],
    from: [
      /"appVersionFramework": "(.*)"/g,
      /"appVersionCordovaPluginLib": "(.*)"/g,
      /"compilationDate": "(.*)"/g,
      /"isDebug": (.*),/g
    ],
    to: [
      '"appVersionFramework": "' + oData.appVersionFramework + '"',
      '"appVersionCordovaPluginLib": "' + oData.appVersionCordovaPluginLib + '"',
      '"compilationDate": "' + oData.compilationDate + '"',
      '"isDebug": ' + oData.isDebug + ',',
    ],
    allowEmptyPaths: false,
  };

  try {
    let changedFiles = replace.sync(options);
    if (changedFiles == 0) {
      throw "Comprueba que  '" + options.files + "' tiene las propiedades necesarias";
    }
    let compilationDateFormatted = moment().format('D/MM/YYYY, hh:mm:ss')
    console.log('***Fecha compilación: ' + compilationDateFormatted);
    console.log('***Is debug: ' + oData.isDebug);
  }
  catch (error) {
    console.error('***Ha ocurrido un error: ', error);
    throw error
  }
}

// Obtenemos las versiones de las librerias de mova y cordova-plugin-lib
try {
 var movaVersion = require('./node_modules/@mova/components/package.json').version;
 var cordovaPluginLibVersion = require('./node_modules/@lib/cordova-plugin-lib/package.json').version;
}
catch (e) {
 console.log('***Comprueba que tienes instaladas las dependencias (npm install)');
 return;
}
// Obtenemos fecha de compilacion
var timeStamp = moment(new Date());
// Obtenemos si es debug/release
var isDebug = (process.argv[2] == 'debug') ? true : false;

let oData = {};
oData.isDebug = isDebug;
oData.compilationDate = timeStamp;
oData.appVersionFramework = movaVersion;
oData.appVersionCordovaPluginLib = cordovaPluginLibVersion;

// Lanzamos la escritura de las variables
writeFileConfig(oData);
