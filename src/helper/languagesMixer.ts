import fs from 'node:fs';
import {resolve} from 'node:path';
import dirname from './dirname.js';

export default (languagesList: Array<String>) => {
    let resultFileContent = '\n';
    languagesList.forEach(element => {
        let filePath = resolve(dirname, `./lib/languages/${element}.gitignore`);
        if (fs.existsSync(filePath)) {
            resultFileContent += `\n\n### ${element} ###\n\n`
            resultFileContent += fs.readFileSync(filePath, 'utf8');
        }
    });
    return resultFileContent;
};