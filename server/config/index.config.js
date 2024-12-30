require('dotenv').config({path: "./.env"})

const PORT                        = process.env.PORT || 5111;

const REDIS_URI                        = process.env.REDIS_URI || "redis://127.0.0.1:6379";
const REDIS_PORT                       = process.env.REDIS_PORT || 6379;
const REDIS_HOST                       = process.env.REDIS_HOST || "127.0.0.1";

const MONGO_URI                        = process.env.MONGO_URI || `mongodb://localhost:27017/sm`;

const JWT_SECRET                       = process.env.JWT_SECRET || null;

if(!JWT_SECRET || !PORT || !MONGO_URI){
    throw Error('missing .env variables check index.config');
}

config = {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    REDIS_URI,
    REDIS_PORT,
    REDIS_HOST
}

module.exports = config;