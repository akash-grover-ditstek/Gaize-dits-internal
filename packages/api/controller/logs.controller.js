import Joi from 'joi';
import * as Time from '../utils/time'
import LogStore from '../stores/logStore';
import StatusCodes from '../utils/StatusCodes';
import ApiResponse from '../utils/apiResponse';
import controller from './controller'
const Storage = new LogStore();
export default class LogController {

    async create(request, res) {
      const {
        error,
        value
      } = Joi.object().keys({
        userId: Joi.string().required(),
        deviceId: Joi.string().required(),
        action: Joi.any().required(),
        message: Joi.object().required(),
      }).validate(request.body);
  
      if (error) {
        return ApiResponse.error(res, StatusCodes.BAD_REQUEST, error);
      }
      const {
        userId,
        deviceId,
        action,
        message,
        createdAt
      } = value;
  
      const attributes = {
        userId,
        deviceId,
        action,
        message,
        createdAt: Time.now(),
      };
      let log;
      try {
        log = await Storage.createLog(attributes);
      } catch (e) {
        return ApiResponse.error(res, StatusCodes.BAD_REQUEST, e);
      }
      return ApiResponse.success(res, {
        log,
      });
    }
  }
  


