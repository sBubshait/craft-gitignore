import { statSync } from 'node:fs';
import linguist = require('linguist-js');


export default async (folderPath: string): Promise<String[]> => {
    let stats;

    try {
        stats = statSync(folderPath);
    } catch (err) {
        throw new Error(`Invalid Folder Path ${folderPath}`);
    }

    if (!stats.isDirectory()) {
        throw new Error(`The path ${folderPath} is not a folder.`);
    }
   
    let options = { keepVendored: false, quick: false };
    const { languages } = await linguist(folderPath, options);
    
    return Object.keys(languages.results).map((key) => key.replace(/ /g, '_'));
}