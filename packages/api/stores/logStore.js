import { Schema, model } from 'mongoose';
import LogMongo from '../models/Log';

export const LogSchema = new Schema(LogMongo);
export const Log = model('Log', LogSchema);

export default class LogStore {
  async createLog(attributes) { 
    const {
        userId,
        deviceId,
        action,
        message,
      createdAt
    } = attributes;


    const newLogFields = {
        userId,
        deviceId,
        action,
        message,
      createdAt
    };

    let savedLog;
    const log = new Log(newLogFields);
    try {
        savedLog = await log.save();
    } catch (e) {
      console.error(e);
      return Promise.reject(new LogStore.OPERATION_UNSUCCESSFUL());
    }

    return savedLog;

  }

}

LogStore.OPERATION_UNSUCCESSFUL = class extends Error {
  constructor() {
    super('An error occured while processing the request.');
  }
};