import 'dotenv/config';
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';

class App{
	constructor(){
		this.server = express();

		mongoose.connect(process.env.MONGO_URI);
		
		this.middleware();
		this.routes();
	}

	middleware(){
		this.server.use(express.json());
	}

	routes(){
		this.server.use(routes);
	}
}
export default new App().server;