/**
 * Koa 2 routes
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Router = require('koa-router');
const glob = require('glob-promise');
const path_1 = require('path');
const router = new Router();
router.get('/', renderWrapper);
function renderWrapper(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsFiles = yield glob(path_1.join(process.cwd(), '**', '*.js'), {
            ignore: [
                path_1.join(process.cwd(), 'node_modules', '**', '*')
            ]
        });
        let d3Version;
        try {
            d3Version = ctx.cli.d3Version;
        }
        catch (e) {
            d3Version = false;
        }
        const d3Reg = /d3(?:-[0-9.]+)?(?:\.min)?\.js/;
        const mapped = jsFiles.filter(file => !d3Reg.test(file)) // Filter out D3
            .map(file => path_1.relative(process.cwd(), file));
        const d3Path = jsFiles.filter(file => d3Reg.test(file))
            .map(file => path_1.relative(process.cwd(), file)).shift();
        yield ctx.render('wrapper', {
            js: mapped,
            d3_path: d3Path,
            d3_version: d3Version,
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=routes.js.map