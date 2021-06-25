import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { OwnerModule } from './owner/owner.module';
import { PetModule } from './pet/pet.module';
import { VisitModule } from './visit/visit.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, OwnerModule, PetModule, VisitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
