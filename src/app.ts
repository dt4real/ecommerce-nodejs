import express, { Express } from 'express';
import { config } from '@users/config';
import { start } from '@users/server';
import { databaseConnection } from '@users/database';

const initialize = (): void => {
    config.cloudinaryConfig();
    databaseConnection();
    const app: Express = express();
    start(app);
};

initialize();