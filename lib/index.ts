/**
 * Koa 2 TypeScript Boilerplate
 *
 * 2016 Ændrew Rininsland
 */

import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as views from 'koa-views';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
import * as chalk from 'chalk';
import * as convert from 'koa-convert';
import * as koaBS from 'koa-browser-sync';
import { resolve } from 'path';

import router from './routes';

const app = new Koa();
const port = process.env.PORT || 5555;
const viewsPath = resolve(__dirname, '..', '/views');
const browserSync = convert(koaBS({
  init: true,
  logLevel: 'silent',
  files: resolve(process.env.PWD, '**/*'),
  notify: true,
  open: true,
  ui: true,
  ghostMode: true,
}));


app.use(browserSync)
  .use(bodyParser())
  .use(views(viewsPath, {
    extension: 'njk',
    map: {
      html: 'nunjucks'
    }
  }))
 .use(serve(resolve(__dirname, '..', 'node_modules/', 'graphic-frame')))
 .use(mount('project/', process.env.PWD))
 .use(router.routes())
 .use(router.allowedMethods());

app.listen(port, () => console.log(chalk.black.bgGreen.bold(`Listening on port ${port}`)));

export default app;
