import { Router, Request, Response, NextFunction } from 'express';
import Post from '../models/Post';

class PostRouter {

    router: Router;
    constructor() {
        this.router = Router();
        this.routes()
    }


    public getPosts(req: Request, res: Response): void {

        Post.find({})
            .then(data => {
                const status = res.statusCode;
                res.json({
                    status,
                    data
                })
            })
            .catch(err => {
                const status = res.statusCode;
                res.json({
                    status,
                    err
                })
            })

    }
    public createPosts(req: Request, res: Response): void {

    }
    public updatePosts(req: Request, res: Response): void {

    }
    public deletePosts(req: Request, res: Response): void {

    }

    public routes() {
        this.router.get('/posts', this.getPosts);
    }
}

// export
const postRoutes = new PostRouter();        // class created
postRoutes.routes();                        // routers bound

export default postRoutes.router;           // routers exported