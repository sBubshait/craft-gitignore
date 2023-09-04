import languagesMixer from './helper/languagesMixer.js';
import mixer from './helper/mixer.js';
import { writeFileSync } from 'node:fs'; // Import necessary modules for writing to files
import inquirer from 'inquirer';
import analyse from './helper/analyse.js';
import { statSync } from 'node:fs';
import path from 'path';
import { promises as fsPromises } from 'fs';
import dirname from './helper/dirname.js';

const args = process.argv.slice(2);
let folderPath = args[0] && args[0].length > 0 ? path.resolve(args[0]) : process.cwd();

let stats;
try {
    stats = statSync(folderPath);
} catch (err) {
    throw new Error(`Invalid Folder Path ${folderPath}`);
}

if (!stats.isDirectory()) {
    throw new Error(`The path ${folderPath} is not a folder.`);
}

inquirer.prompt([
    {
        type: 'checkbox',
        name: 'config',
        message: 'In addition to the programming languages specific gitignore, would you like to ignore any of the following?',
        choices: [
            'Operating Systems',
            'Archives',
            'Backups',
            'Text Editors',
            'Images and PDFs'
        ],
        default: [
            'Operating Systems',
            'Text Editors',
        ]
    }
]).then(async (answers) => {
    let languages = await analyse(folderPath);

    let config = {
        includeOperatingSystems: answers.config.includes('Operating Systems'),
        includeArchives: answers.config.includes('Archives'),
        includeBackups: answers.config.includes('Backups'),
        includeTextEditors: answers.config.includes('Text Editors'),
        includeImages: answers.config.includes('Images and PDFs'),
        includeAcknowledgement: true
    }

    let resultFileContent = await mixer(languages, config);

    try {
        await fsPromises.writeFile('.gitignore', resultFileContent, 'utf8');
    } catch (err) {
        throw new Error(`Error writing to file ${err}`);
    }

    console.log('Done!');
});