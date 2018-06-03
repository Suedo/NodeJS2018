import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as logger from "morgan";
import * as mongoose from "mongoose";

// import routers
import PostsRouter from './Routers/PostsRouter';

// Server
class Server {
 
    // define types
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(){

        // setup mongo
        const MONGO_URI = 'mongodb://localhost/ts_node_101'
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI);

        // basic config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(cors());

    }

    public routes(){

        let router: express.Router;
        router = express.Router();

        this.app.use('/', router);
        this.app.use('api/v1/posts', PostsRouter)

    }
}

export default new Server().app;


