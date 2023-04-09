import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from '../config/app.config';
import appConfigSchema from '../config/app.config.schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: appConfigSchema,
    }),
  ],
})
export class CommonModule {}
