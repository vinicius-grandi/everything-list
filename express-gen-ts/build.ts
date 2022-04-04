/**
 * Remove old files, copy front-end ones.
 */

import fs from 'fs-extra';
import logger from 'jet-logger';
import childProcess from 'child_process';

function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    fs.remove(loc, (err) => (err ? rej(err) : res()));
  });
}

function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    fs.copy(src, dest, (err) => (err ? rej(err) : res()));
  });
}

function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
      if (stdout) {
        logger.info(stdout);
      }
      if (stderr) {
        logger.warn(stderr);
      }
      return err ? rej(err) : res();
    });
  });
}

(async () => {
  try {
    // Remove current build
    await remove('./dist/');
    // Copy front-end files
    await copy('./src/public', './dist/public');
    await copy('./src/views', './dist/views');
    // Copy production env file
    await copy(
      './src/pre-start/env/production.env',
      './dist/pre-start/env/production.env',
    );
    // Copy back-end files
    await exec('tsc --build tsconfig.prod.json', './');
  } catch (err) {
    logger.err(err);
  }
})();
