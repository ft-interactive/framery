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
import * as compose from 'koa-compose';
import * as koaBS from 'koa-browser-sync';
import { resolve } from 'path';

import router from './routes';

function framery(opts: FrameryOptions) {
  const app = new Koa();
  const port = process.env.PORT || 5555;
  const viewsPath = resolve(__dirname, '../views');
  const pkg = require(resolve(__dirname, '../package.json'));

  const browserSync = convert(koaBS({
    init: true,
    logLevel: 'silent',
    files: resolve(process.env.PWD, '**/*'),
    notify: true,
    open: true,
    ui: false,
    ghostMode: true,
  }));

  const files = compose([
    serve(resolve(__dirname, '..', 'node_modules/', 'graphic-frame')),
    serve(process.cwd())
  ]);

  app.use(browserSync)
    .use(function(ctx: CliContext, next: any){
      ctx.cli = opts;

      return next();
    })
    .use(bodyParser())
    .use(views(viewsPath, {
      extension: 'njk',
      map: {
        njk: 'nunjucks',
        html: 'nunjucks',
      }
    }))
    .use(router.routes())
    .use(mount('/', files))
    .use(router.allowedMethods());

  const txt = chalk.black.bgGreen;
  const txtRed = chalk.red.bgGreen;
  const boldTxt = chalk.black.bgGreen.bold;

  return app.listen(port, () => {
    console.info(boldTxt(`»» Framery version ${pkg.version} ««`));
    console.info(`${txt('» Project being served @ ')}${txtRed('http://localhost:' + port)}`);
  });
}

interface FrameryOptions {
  'd3-version': string;
  'use-wrapper': boolean;
}

interface CliContext extends Koa.Context {
  cli: any;
}

module.exports = framery;
