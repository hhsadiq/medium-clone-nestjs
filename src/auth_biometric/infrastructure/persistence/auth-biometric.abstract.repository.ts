import { UserDevice } from '@src/auth_biometric/domain/user-device';
import { EnableBiometricDto } from '@src/auth_biometric/dtos/enable-biometric-payload.dto';
import { VerifyBiometricDto } from '@src/auth_biometric/dtos/verify-biometric.dto';
import { BiometricChallengeEntity } from '@src/auth_biometric/infrastructure/persistence/relational/entities/biometric-challenge.entity';
import { UserDeviceEntity } from '@src/auth_biometric/infrastructure/persistence/relational/entities/user-device.entity';
import { User } from '@src/users/domain/user';
import { NullableType } from '@src/utils/types/nullable.type';

export abstract class AuthBiometricAbstractRepository {
  abstract enable(
    userDevice: Omit<
      UserDevice,
      'id' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'biometricPublicKey'
    >,
    enableBiometricDto: EnableBiometricDto,
  ): Promise<NullableType<UserDeviceEntity>>;

  abstract disable(
    userDevice: UserDevice,
  ): Promise<NullableType<UserDeviceEntity>>;

  abstract getChallenge(payload): Promise<string | null | undefined>;

  abstract verify(
    verifyBiometricDto: VerifyBiometricDto,
  ): Promise<NullableType<BiometricChallengeEntity>>;

  abstract findChallenge(
    id: UserDevice['id'],
  ): Promise<string | null | undefined>;

  abstract findByUserIdAndDeviceId(
    id: User['id'],
    deviceId: UserDevice['deviceId'],
  ): Promise<NullableType<UserDevice>>;

  abstract addUserDevice(
    data: Omit<
      UserDevice,
      'id' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'biometricPublicKey'
    >,
  ): Promise<UserDevice>;
}
