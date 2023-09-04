import fs from 'node:fs';
import { Config } from './types.js';
import  languagesMixer from './languagesMixer.js';
import dirname from './dirname.js';
import { resolve } from 'node:path';

export default async (languages: Array<String>, config: Config) => {
    let resultFileContent = '';

    if (config.includeAcknowledgement) {
        resultFileContent = '# Created By craft-gitignore (https://github.com/sBubshait/craft-gitignore)\n';
    }

    resultFileContent += await languagesMixer(languages);
    
    if (config.includeOperatingSystems) {
        resultFileContent += '\n\n### OS Specific ###\n\n';
        resultFileContent += fs.readFileSync(resolve(dirname, `./lib/general/AllOS.gitignore`), 'utf8');
    }

    if (config.includeArchives) {
        resultFileContent += '\n\n### Archives ###\n\n';
        resultFileContent += fs.readFileSync(resolve(dirname, `./lib/general/Archives.gitignore`), 'utf8');
    }

    if (config.includeBackups) {
        resultFileContent += '\n\n### Backups ###\n\n';
        resultFileContent += fs.readFileSync(resolve(dirname, `./lib/general/Backup.gitignore`), 'utf8');
    }

    if (config.includeTextEditors) {
        resultFileContent += '\n\n### Text Editors ###\n\n';
        resultFileContent += fs.readFileSync(resolve(dirname, `./lib/general/TextEditors.gitignore`), 'utf8');
    }
    
    if (config.includeImages) {
        resultFileContent += '\n\n### Images ###\n\n';
        resultFileContent += fs.readFileSync(resolve(dirname, `./lib/general/images.gitignore`), 'utf8');
    }

    return resultFileContent;
}