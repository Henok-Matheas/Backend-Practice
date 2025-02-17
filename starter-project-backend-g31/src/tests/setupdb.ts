import { MongoMemoryServer } from "mongodb-memory-server";
import { Profile } from '../models/profileModel';
const mongoose = require("mongoose");

let mongoServer: { getUri: () => any; stop: () => any };

export const connect = async () => {
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();
  const URI = await mongoServer.getUri();
  

  mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

export const clear = async () => {
  const collections = mongoose.connection.collections;

  await Profile.deleteMany();
};

export const disconnect = async () => {
  mongoose.disconnect();
  await mongoServer.stop();
};
