import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { DatabaseModule } from './database/database.module.js';
import { ResidentsModule } from './residents/residents.module.js';
import { DeliveriesModule } from './deliveries/deliveries.module.js';
import { observeModule } from './observe.module.js';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    ResidentsModule,
    DeliveriesModule,
    observeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
