import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { join } from 'node:path';

export default join(dirname(fileURLToPath(import.meta.url)), '../../');