import * as express from "express";

import applyMiddleware from "./util/applyMiddleware";
import middleware from "./middlewares";
import { errorHandlers } from "./middlewares/errorHandlers";
import { Routes } from "./routes";
class App {
  public app: express.Application;
  public routePrv= Routes;
  constructor() {
    this.app = express();
    this._config();
  }

  private _config() {

    applyMiddleware(middleware, this.app);
    this.routePrv.routes(this.app);
    applyMiddleware(errorHandlers, this.app);
  }
}
export default new App().app;
