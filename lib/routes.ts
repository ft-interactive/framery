/**
 * Koa 2 routes
 */

import * as Router from 'koa-router';
import { Request } from 'koa';
import * as chalk from 'chalk';
import * as glob from 'glob-promise';
import { join, relative } from 'path';

const router = new Router();

router.get('/', renderWrapper);

async function renderWrapper(ctx: any, next: any) {
  const jsFiles = await glob(join(process.cwd(), '**', '*.js'), {
    ignore: [
      join(process.cwd(), 'node_modules', '**', '*')
    ]
  });

  let d3Version: string | boolean;

  try {
    d3Version = ctx.cli.d3Version;
  } catch (e) {
    d3Version = false;
  }

  const d3Reg = /d3(?:-[0-9.]+)?(?:\.min)?\.js/;

  const mapped = jsFiles.filter(file => !d3Reg.test(file)) // Filter out D3
    .map(file => relative(process.cwd(), file));

  const d3Path = jsFiles.filter(file => d3Reg.test(file))
    .map(file => relative(process.cwd(), file)).shift();

  await ctx.render('wrapper', {
    js: mapped,
    d3_path: d3Path,
    d3_version: d3Version,
  });
}

export default router;
