import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PassThrough } from 'stream';
import { now } from '../helpers';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T> | PassThrough> {
    return next.handle().pipe(map(data => {
      const request = context.switchToHttp().getRequest();
      if (data instanceof PassThrough || request.originalUrl.indexOf('/v1/devices/') !== -1) {
        return data;
      }
      return { success: true, data, time: now() };
    }));
  }
}
