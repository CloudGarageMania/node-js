const program = require('commander');
const prompts = require('prompts');
const path = require('path');
const {promisify} = require('util');
const request = require('superagent');
const config = require('./config');

const fs = require('fs');

program
  .option('-i, --id [clientId]', 'This is Client Id that you can get it on Dashboard at CloudGarage')
  .option('-s, --secret [clientSecret]', 'This is Client Secret that you can get it on Dashboard at CloudGarage')
  .option('-o, --output [configFilePath]', 'Output config file path. Default is ~/.cloudgarage.json', 
    `${process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]}/.cloudgarage.json`
  )
  .action(async (cmd, options) => {
    await confirmConfigFile(cmd.output);
    const params = {};
    if (!cmd.id) {
      params.clientId = await ask('What is your client ID?', 'clientId');
    }
    if (!cmd.secret) {
      params.clientSecret = await ask('What is your client secret?', 'clientSecret');
    }
    
    if (!params.clientId || !params.clientSecret) {
      console.log('Client ID and Client Secret are required.');
      process.exit(1);
    }
    try {
      const token = await getToken(params);
      
      await promisify(fs.writeFile)(cmd.output, JSON.stringify(token), {
        encoding: 'utf8',
        flag: 'w+'
      });
      console.log(`Write configuration to ${cmd.output}`);
      console.log('Done');
    } catch (e) {
      console.log('Error:');
      console.log(e);
    }
  });

const getToken = async (params) => {
  const response = await request
    .post(`${config.baseUrl}/tokens`)
    .send({
      client_id: params.clientId,
      client_secret: params.clientSecret
    });
  return response.body.token;
}

const confirmConfigFile = async (filePath) => {
  try {
    stat = await promisify(fs.stat)(filePath);
    const question = {
      type: 'confirm',
      name: "val",
      message: `Config file path '${filePath}' is exist. Are you overwrite it?`,
      initial: true
    };
    const answer = await prompts(question);
    if (answer.val) {
      return true;
    } else {
      console.log("Exited.");
      process.exit(0);
    }
  } catch (e) {
    return true;
  }
}
const ask = async (message, val) => {
  const question = {
    type: "text",
    name: val,
    message: message
  };
  const answer = await prompts(question);
  return answer[val];
}


program.parse(process.argv);
