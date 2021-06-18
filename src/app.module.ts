import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, OwnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
