import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export default async (directory) => {
  const files = fs
    .readdirSync(directory)
    .filter(file => file !== 'index.js' && file.endsWith('.js'));

  const modules = await Promise.all(
    files.map(file =>
      import(pathToFileURL(path.join(directory, file)).href)
        .then(module => {
          return {
            [file.replace('.js', '')]: module.default,
          };
        })
    )
  );

  return modules.reduce((acc, curr) => ({ ...acc, ...curr }), {});
};
