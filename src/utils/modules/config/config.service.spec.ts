import { ConfigService } from './config.service';
import * as Joi from 'joi';
import { ConfigException } from './config.exception';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
  });

  describe('load', () => {
    it('should load configuration', () => {
      jest.spyOn(configService, 'loadFile').mockReturnValue({TEST_VARIABLE: 'true'});
      jest.spyOn(configService, 'schema', 'get').mockReturnValue({TEST_VARIABLE: Joi.boolean().required()});
      configService.load();
      expect(configService.getValue('TEST_VARIABLE')).toBeTruthy();
    });
  });

  describe('validateInput', () => {
    it('should validate configuration', () => {
      jest.spyOn(configService, 'schema', 'get').mockReturnValue({TEST_VARIABLE: Joi.boolean().required()});
      expect(configService.validateInput({TEST_VARIABLE: 'true'})).toEqual({TEST_VARIABLE: true});
    });

    it('should throw exception', () => {
      jest.spyOn(configService, 'schema', 'get').mockReturnValue({TEST_VARIABLE: Joi.boolean().required()});
      expect(() => configService.validateInput({})).toThrow(ConfigException);
    });
  });
});
