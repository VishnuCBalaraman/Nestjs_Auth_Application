import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Change to 'mysql'
      host: 'localhost', // Hardcoded DB host
      port: 3306, // Default MySQL port
      username: 'root', // Hardcoded DB username
      password: 'root', // Hardcoded DB password
      database: 'sales', // Hardcoded DB name
      entities: [User],
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}