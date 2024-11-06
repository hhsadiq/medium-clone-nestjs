import { Clap } from '@src/claps/domain/clap';

export abstract class ClapAbstractRepository {
  abstract createOrIncrement(articleId: string, userId: number): Promise<Clap>;

  abstract getTotalClaps(articleId: string): Promise<number>;
}
