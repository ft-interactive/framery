/**
 * Koa 2 routes
 */

import * as Router from 'koa-router';
import { Request } from 'koa';
import * as chalk from 'chalk';
import * as glob from 'glob-promise';
import { join } from 'path';

const router = new Router();

router.get('/', renderWrapper);

async function renderWrapper(ctx: any, next: any) {
  const jsFiles = await glob(join(process.env.PWD, '**', '*.js'));
  await ctx.render('wrapper', {
    js: jsFiles,
  });
}

export default router;
