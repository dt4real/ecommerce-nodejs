import http from 'http';

import { Application, Request, Response, NextFunction, json, urlencoded } from 'express';
import { config } from '@users/config';
import hpp from 'hpp';
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { CustomError, IErrorResponse } from '@users/utils/error-handler';
import { StatusCodes } from 'http-status-codes';


const SERVER_PORT = 5000;

const start = (app: Application): void => {
    securityMiddleware(app);
    standardMiddleware(app);
    routesMiddleware(app);
    errorHandler(app);
    startServer(app);
};

const securityMiddleware = (app: Application): void => {
    app.set('trust proxy', 1);
    app.use(
        cookieSession({
          name: 'session',
          keys: [`${config.SECRET_KEY_ONE}`, `${config.SECRET_KEY_TWO}`],
          maxAge: 24 * 7 * 3600000,
          secure: config.NODE_ENV !== 'development',
          ...(config.NODE_ENV !== 'development' && {
            sameSite: 'none'
          })
        })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
};

const standardMiddleware = (app: Application): void => {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
};

const routesMiddleware = (app: Application): void => {
    console.log(app);
};

const errorHandler = (app: Application): void => {
    app.all('*', (req: Request, res: Response) => {
        res.status(StatusCodes.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
      });

    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      console.log('error', `GigService ${error.comingFrom}:`, error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    });
  };

const startServer = (app: Application): void => {
    try {
      const httpServer: http.Server = new http.Server(app);
      console.info(`server has started with process id ${process.pid}`);
      httpServer.listen(SERVER_PORT, () => {
        console.info(`server running on port ${SERVER_PORT}`);
      });
    } catch (error) {
        console.log('error', 'server startServer() method error:', error);
    }
  };

export { start };