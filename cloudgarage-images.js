const program = require('commander');
const prompts = require('prompts');
const path = require('path');
const {promisify} = require('util');
const request = require('superagent');
const config = require('./config');

const fs = require('fs');

program
  .option('-c, --config [configFilePath]', 'Config file path. Default is ~/.cloudgarage.json', 
    `${process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]}/.cloudgarage.json`
  )
  .option('-t, --type [type]', 'Filtering image type. [OS, APPLICATION, PRIVATE]')
  .action(async (cmd, options) => {
    await checkConfigfile(cmd.config);
    const str = await promisify(fs.readFile)(cmd.config, 'utf8');
    const token = JSON.parse(str).id;
    const images = await getImages(token);
    const ary = [];
    for (let image of images) {
      // Filtering by image type
      if (!cmd.type || image.image_type === cmd.type.toUpperCase()) {
        ary.push({
          Id: image.image_id,
          Type: image.image_type,
          Name: image.image_name
        })
      }
    }
    console.table(ary);
  });

const getImages = async (token) => {
  const response = await request
    .get(`${config.baseUrl}/images`)
    .set('X-Auth-Token', token)
    .send()
  return response.body.images;
}

const checkConfigfile = async (filePath) => {
  try {
    stat = await promisify(fs.stat)(filePath);
    return true;
  } catch (e) {
    console.log(`Config file is nothing. Path is ${filePath}`);
    process.exit(1);
  }
}

program.parse(process.argv);
