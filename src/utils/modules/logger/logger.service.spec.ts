import { LoggerService } from './logger.service';
import { Repository } from 'typeorm';
import { Log } from './log.entity.mongo';

describe('LoggerService', () => {
  let loggerService: LoggerService;
  let loggerRepository: Repository<Log>;

  beforeEach(() => {
    loggerRepository = new Repository<Log>();
    loggerService = new LoggerService(loggerRepository);
  });

  describe('log', () => {
    it('save log data', async () => {
      const logLikely: Partial<Log> = {headers: {}, request: {}, response: {}, statusCode: 200, url: ''};
      const [newLog, savedLog] = [new Log(), new Log()];

      jest.spyOn(loggerRepository, 'create').mockReturnValue(newLog);
      jest.spyOn(loggerRepository, 'save').mockResolvedValue(savedLog);

      expect(await loggerService.log(logLikely)).toBe(savedLog);
      expect(loggerRepository.create).toBeCalledWith(logLikely);
      expect(loggerRepository.save).toBeCalledWith(newLog);
    });
  });
});
