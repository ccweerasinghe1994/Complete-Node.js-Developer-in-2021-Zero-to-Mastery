import express, { json, static as staticFileServer } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import morgan from 'morgan'

import { planetRouter } from './routes/planets/planets.router.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express({
  origin: 'http://localhost:3000',
});
app.use(cors());
app.use(morgan('combined'))
app.use(json());
app.use(staticFileServer(path.join(__dirname,'..','public')));
app.use(planetRouter);
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'..','public','index.html'))
})
export { app };
