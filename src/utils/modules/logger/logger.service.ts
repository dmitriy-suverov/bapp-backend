import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './log.entity.mongo';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(Log) private readonly logRepository: Repository<Log>,
  ) { }

  async log(logLikely: Partial<Log>) {
    const log = this.logRepository.create(logLikely);
    return this.logRepository.save(log);
  }
}
