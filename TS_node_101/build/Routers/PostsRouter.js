"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Post_1 = require("../models/Post");
var PostRouter = /** @class */ (function () {
    function PostRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    PostRouter.prototype.getPosts = function (req, res) {
        Post_1.default.find({})
            .then(function (data) {
            var status = res.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = res.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    PostRouter.prototype.createPosts = function (req, res) {
    };
    PostRouter.prototype.updatePosts = function (req, res) {
    };
    PostRouter.prototype.deletePosts = function (req, res) {
    };
    PostRouter.prototype.routes = function () {
        this.router.get('/posts', this.getPosts);
    };
    return PostRouter;
}());
// export
var postRoutes = new PostRouter(); // class created
postRoutes.routes(); // routers bound
exports.default = postRoutes.router; // routers exported
//# sourceMappingURL=PostsRouter.js.map