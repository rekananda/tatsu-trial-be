import { forwardRef, Module } from '@nestjs/common';
import { MagicEdenService } from './magic-eden.service';
import { MagicEdenController } from './magic-eden.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  providers: [MagicEdenService],
  controllers: [MagicEdenController],
  exports: [MagicEdenService],
})
export class MagicEdenModule {}
