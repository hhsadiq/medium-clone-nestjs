import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, MoreThan, Not, Repository } from 'typeorm';

import { UserDevice } from '@src/auth_biometric/domain/user-device';
import { EnableBiometricDto } from '@src/auth_biometric/dtos/enable-biometric-payload.dto';
import { VerifyBiometricDto } from '@src/auth_biometric/dtos/verify-biometric.dto';
import { AuthBiometricAbstractRepository } from '@src/auth_biometric/infrastructure/persistence/auth-biometric.abstract.repository';
import { BiometricChallengeEntity } from '@src/auth_biometric/infrastructure/persistence/relational/entities/biometric-challenge.entity';
import { UserDeviceEntity } from '@src/auth_biometric/infrastructure/persistence/relational/entities/user-device.entity';
import { UserDeviceMapper } from '@src/auth_biometric/infrastructure/persistence/relational/mappers/user-device.mapper';
import { User } from '@src/users/domain/user';
import { NullableType } from '@src/utils/types/nullable.type';

@Injectable()
export class AuthBiometricRelationalRepository
  implements AuthBiometricAbstractRepository
{
  constructor(
    @InjectRepository(UserDeviceEntity)
    private readonly userDevicesRepository: Repository<UserDeviceEntity>,
    @InjectRepository(BiometricChallengeEntity)
    private readonly biometricChallengeRepository: Repository<BiometricChallengeEntity>,
  ) {}

  async enable(
    userDevice: UserDevice,
    enableBiometricDto: EnableBiometricDto,
  ): Promise<NullableType<UserDeviceEntity>> {
    try {
      const updatedUserDevice = await this.userDevicesRepository.save(
        this.userDevicesRepository.create(
          UserDeviceMapper.toPersistence({
            ...userDevice,
            user: { id: Number(enableBiometricDto.userId) } as User,
            biometricPublicKey: enableBiometricDto.biometricPublicKey,
          }),
        ),
      );
      return updatedUserDevice;
    } catch (error) {
      throw error;
    }
  }

  async disable(
    userDevice: UserDevice,
  ): Promise<NullableType<UserDeviceEntity>> {
    try {
      const updatedUserDevice = await this.userDevicesRepository.save(
        this.userDevicesRepository.create(
          UserDeviceMapper.toPersistence({
            ...userDevice,
            biometricPublicKey: '',
          }),
        ),
      );
      return updatedUserDevice;
    } catch (error) {
      throw error;
    }
  }

  async getChallenge(
    payload: BiometricChallengeEntity,
  ): Promise<string | null | undefined> {
    const currentDate = new Date();
    try {
      const biometricChallenge =
        await this.biometricChallengeRepository.findOne({
          where: {
            user_device: { id: payload.user_device.id },
            expires_at: MoreThan(currentDate),
            challenge: Not(IsNull()),
          },
        });

      if (biometricChallenge) return biometricChallenge.challenge;

      const newBiometricChallenge =
        await this.biometricChallengeRepository.save(
          this.biometricChallengeRepository.create(payload),
        );

      return newBiometricChallenge ? newBiometricChallenge.challenge : null;
    } catch (error) {
      throw error;
    }
  }

  async findChallenge(
    id: UserDevice['id'],
  ): Promise<string | null | undefined> {
    const currentDate = new Date();
    try {
      const biometricChallenge =
        await this.biometricChallengeRepository.findOne({
          where: {
            user_device: { id },
            expires_at: MoreThan(currentDate),
          },
        });

      return biometricChallenge ? biometricChallenge.challenge : null;
    } catch (error) {
      throw error;
    }
  }

  async verify(
    verifyBiometricDto: VerifyBiometricDto,
  ): Promise<NullableType<BiometricChallengeEntity>> {
    const currentDate = new Date();
    try {
      const entityChallenge = await this.biometricChallengeRepository.findOne({
        where: {
          user_device: { device_id: verifyBiometricDto.deviceId },
          expires_at: MoreThan(currentDate),
          challenge: verifyBiometricDto.challenge,
        },
      });
      return entityChallenge;
    } catch (error) {
      throw error;
    }
  }

  async findByUserIdAndDeviceId(
    id: User['id'],
    deviceId: UserDevice['deviceId'],
  ): Promise<NullableType<UserDevice>> {
    try {
      const entity = await this.userDevicesRepository.findOne({
        where: {
          user: { id: Number(id) },
          device_id: deviceId,
        },
      });

      return entity ? UserDeviceMapper.toDomain(entity) : null;
    } catch (error) {
      throw error;
    }
  }

  async addUserDevice(userDevice: UserDevice): Promise<UserDevice> {
    try {
      const persistenceModel = UserDeviceMapper.toPersistence(userDevice);
      const newEntity = await this.userDevicesRepository.save(
        this.userDevicesRepository.create(persistenceModel),
      );
      return UserDeviceMapper.toDomain(newEntity);
    } catch (error) {
      throw error;
    }
  }
}
