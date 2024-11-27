import { Module } from '@nestjs/common';

import { AuthModule } from '@src/auth/auth.module';
import { AuthBiometricController } from '@src/auth_biometric/auth-biometric.controller';
import { AuthBiometricService } from '@src/auth_biometric/auth-biometric.service';
import { RelationalAuthBiometricPersistenceModule } from '@src/auth_biometric/infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '@src/users/users.module';

@Module({
  imports: [RelationalAuthBiometricPersistenceModule, AuthModule, UsersModule],
  controllers: [AuthBiometricController],
  providers: [AuthBiometricService],
  exports: [AuthBiometricService],
})
export class AuthBiometricModule {}
