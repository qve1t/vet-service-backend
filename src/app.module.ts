import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OwnerModule } from './owner/owner.module';
import { PetModule } from './pet/pet.module';
import { VisitModule } from './visit/visit.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    OwnerModule,
    PetModule,
    VisitModule,
    AuthModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
