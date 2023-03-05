import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { generateDocument } from './doc';

declare const module: any;

async function bootstrap() {
  
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  })

  generateDocument(app)

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}
bootstrap();
