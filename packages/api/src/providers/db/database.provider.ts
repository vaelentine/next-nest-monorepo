import { DataSource } from 'typeorm';
import * as path from 'path';
import { Example } from 'src/example/example.entity';
import { ConfigService } from '@nestjs/config';

export const databaseProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async (configService: ConfigService) => {
    const databasePath = configService.get<string>('DATABASE_PATH') || '';
    const dataSource = new DataSource({
      type: 'sqlite',
      database: path.resolve(__dirname, '../../../..', databasePath),
      entities: [Example],
      synchronize: true,
    });

    return dataSource.initialize();
  },
  inject: [ConfigService],
};
