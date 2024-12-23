import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export default async directory => {
    return (await Promise.all(fs
        .readdirSync(directory)
        .filter(file => file !== 'index.js' && file.endsWith('.js'))
        .map(async file => {
            const module = await import(pathToFileURL(path.join(directory, file)).href)
            return { [file.replace('.js', '')]: module.default }
        }))
    ).reduce((acc, curr) => ({ ...acc, ...curr }), {});
};
