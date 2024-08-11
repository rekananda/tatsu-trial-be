import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SolanaModule } from './solana/solana.module';
import { MagicEdenModule } from './magic-eden/magic-eden.module';

@Module({
  imports: [PrismaModule, AuthModule, SolanaModule, MagicEdenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
