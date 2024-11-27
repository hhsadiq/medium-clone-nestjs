import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthBiometricAbstractRepository } from '@src/auth_biometric/infrastructure/persistence/auth-biometric.abstract.repository';
import { BiometricChallengeEntity } from '@src/auth_biometric/infrastructure/persistence/relational/entities/biometric-challenge.entity';
import { UserDeviceEntity } from '@src/auth_biometric/infrastructure/persistence/relational/entities/user-device.entity';
import { AuthBiometricRelationalRepository } from '@src/auth_biometric/infrastructure/persistence/relational/repositories/auth-biometric.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDeviceEntity, BiometricChallengeEntity]),
  ],
  providers: [
    {
      provide: AuthBiometricAbstractRepository,
      useClass: AuthBiometricRelationalRepository,
    },
  ],
  exports: [AuthBiometricAbstractRepository],
})
export class RelationalAuthBiometricPersistenceModule {}
