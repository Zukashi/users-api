import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
