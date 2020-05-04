// tslint:disable:no-console
import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  Injectable,
} from '@nestjs/common';
import { LoggerService } from '../modules/logger/logger.service';
import { TelegramService } from '../telegram/telegram.service';
import { now } from '../helpers';

@Injectable()
@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logService: LoggerService,
    private readonly telegramService: TelegramService,
  ) {}

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const message = exception.message;
    if (status === 500) {
      console.log(exception);
      if (process.env.NODE_ENV !== 'test') {
        const formatted = `\`\`\`${exception.stack}\`\`\``;
        this.telegramService
          .sendMessage(formatted)
          .catch(error => console.log(error.message));
      }
    }
    const response = host.switchToHttp().getResponse();
    if (process.env.NODE_ENV === 'test') {
      response.status(status).json({ error: message });
      return;
    }
    const data = { success: false, error: message, time: now() };
    response.status(status).json(data);

    const request = host.switchToHttp().getRequest();
    this.logService
      .log({
        url: `${request.method} ${request.url}`,
        headers: request.headers,
        request: request.body,
        response: data,
        statusCode: response.statusCode,
      })
      .catch(error => console.log(error));
  }
}
