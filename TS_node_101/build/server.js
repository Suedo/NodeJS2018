"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var compression = require("compression");
var cors = require("cors");
var express = require("express");
var helmet = require("helmet");
var logger = require("morgan");
var mongoose = require("mongoose");
// import routers
var PostsRouter_1 = require("./Routers/PostsRouter");
// Server
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        // setup mongo
        var MONGO_URI = 'mongodb://localhost/ts_node_101';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI);
        // basic config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(cors());
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        this.app.use('/', router);
        this.app.use('api/v1/posts', PostsRouter_1.default);
    };
    return Server;
}());
exports.default = new Server().app;
//# sourceMappingURL=server.js.map