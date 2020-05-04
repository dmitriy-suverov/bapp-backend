import { NestInterceptor, ExecutionContext, Injectable, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PassThrough } from 'stream';
import { LoggerService } from './logger.service';
import { Log } from './log.entity.mongo';

export interface Response<T> {
  data: T;
}

@Injectable()
export class LogInterceptor<T> implements NestInterceptor {
  constructor(
    private readonly logService: LoggerService,
  ) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      tap((data) => {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const log = new Log();
        log.url = `${request.method} ${request.url}`;
        log.headers = request.headers;
        log.request = request.body;
        log.response = data instanceof PassThrough ? null : data;
        log.statusCode = response.statusCode;
        this.logService.log(log).catch(error => Logger.error(error));
      }),
    );
  }
}
