import fs from 'fs';
import path from 'path';

export const loadTemplate = (filePath: string, variables: { [key: string]: string }): string => {
  let template = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    template = template.replace(regex, value);
  }

  return template;
};