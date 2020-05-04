import { HttpModule as CoreHttpModule, HttpService, Logger, Module } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { LoggerModule } from '../logger/logger.module';
import Axios from 'axios';

@Module({
  imports: [
    CoreHttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
      }),
      imports: [LoggerModule],
      extraProviders: [
        {
          provide: HttpService,
          useFactory: async (loggerService: LoggerService) => {
            const axiosInstance = Axios.create();
            axiosInstance.interceptors.response.use(response => {
              loggerService.log({
                request: response.config.data,
                response: response.data,
                statusCode: response.status,
                headers: response.config.headers,
                url: `${response.config.method.toUpperCase()} ${response.config.url}`,
              }).catch(logError => Logger.log(logError));
              return response;
            }, responseError => {
              const config = responseError.config;
              loggerService.log({
                request: config.data || {},
                response: responseError.response.data,
                statusCode: responseError.response.status,
                headers: config.headers,
                url: `${config.method.toUpperCase()} ${config.url}`,
              }).catch(error => Logger.log(error));
            });
            return new HttpService(axiosInstance);
          },
          inject: [LoggerService],
        },
      ],
    }),
  ],
})
export class HttpModule {
}
