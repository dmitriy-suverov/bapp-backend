import { LoggerService } from '../logger.service';
import { Log } from '../log.entity.mongo';

export class TestLoggerService extends LoggerService {

  async log(logLikely: Partial<Log>): Promise<Log> {
    return new Log();
  }
}
