import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('PORT'),
    },
  });
  app.useLogger(app.get(Logger));
  await app.listen(configService.get('PORT') ?? 3004);
  await app.startAllMicroservices();
  console.log(
    `Notifications service is running on port ${configService.get('PORT')}`,
  );
}
bootstrap();
