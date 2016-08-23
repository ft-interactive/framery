/**
 * Koa 2 TypeScript Boilerplate
 *
 * 2016 Ændrew Rininsland
 */
"use strict";
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const mount = require('koa-mount');
const serve = require('koa-static');
const chalk = require('chalk');
const convert = require('koa-convert');
const compose = require('koa-compose');
const koaBS = require('koa-browser-sync');
const path_1 = require('path');
const routes_1 = require('./routes');
function framery(opts) {
    const app = new Koa();
    const port = process.env.PORT || 5555;
    const viewsPath = path_1.resolve(__dirname, '../views');
    const pkg = require(path_1.resolve(__dirname, '../package.json'));
    const browserSync = convert(koaBS({
        init: true,
        logLevel: 'silent',
        files: path_1.resolve(process.env.PWD, '**/*'),
        notify: true,
        open: true,
        ui: false,
        ghostMode: true,
    }));
    const files = compose([
        serve(path_1.resolve(__dirname, '..', 'node_modules/', 'graphic-frame')),
        serve(process.cwd())
    ]);
    app.use(browserSync)
        .use(function (ctx, next) {
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
        .use(routes_1.default.routes())
        .use(mount('/', files))
        .use(routes_1.default.allowedMethods());
    const txt = chalk.black.bgGreen;
    const txtRed = chalk.red.bgGreen;
    const boldTxt = chalk.black.bgGreen.bold;
    return app.listen(port, () => {
        console.info(boldTxt(`»» Framery version ${pkg.version} ««`));
        console.info(`${txt('» Project being served @ ')}${txtRed('http://localhost:' + port)}`);
    });
}
module.exports = framery;
//# sourceMappingURL=index.js.map