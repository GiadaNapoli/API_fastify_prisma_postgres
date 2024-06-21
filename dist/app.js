"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const path_1 = require("path");
const autoload_1 = __importDefault(require("@fastify/autoload"));
const fastify_1 = __importDefault(require("fastify"));
const user_rout_1 = require("./routes/user.rout");
function createApp(opts = {}) {
    const fastify = (0, fastify_1.default)(opts);
    // Place here your custom code!
    // Do not touch the following lines
    fastify.register(user_rout_1.userRoutes, { prefix: "/" });
    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, "plugins"),
        options: opts,
    });
    // This loads all plugins defined in routes
    // define your routes in one of these
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, "routes"),
        options: opts,
    });
    return fastify;
}
exports.App = {
    from: createApp,
};
