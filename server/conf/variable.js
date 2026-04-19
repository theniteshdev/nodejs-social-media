import { configDotenv } from 'dotenv';
configDotenv();

const variable = {
  port: process.env.PORT,
  mongo_url: process.env.MONGODB_URL,
  hostname: process.env.HOSTNAME,
  secret: process.env.SECRET,
};
export default variable