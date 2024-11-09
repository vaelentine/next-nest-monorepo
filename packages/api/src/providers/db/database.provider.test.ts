import { databaseProvider } from './database.provider';
import { DataSource } from 'typeorm';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

describe('databaseProvider', () => {
  let configService: ConfigService;

  beforeEach(() => {
    configService = {
      get: jest.fn().mockReturnValue('data/database.sqlite'),
    } as unknown as ConfigService;
  });

  it('should provide a DATA_SOURCE', async () => {
    const dataSource = await databaseProvider.useFactory(configService);
    expect(dataSource).toBeInstanceOf(DataSource);
    expect(dataSource.options.type).toBe('sqlite');
    expect(dataSource.options.database).toBe(
      path.resolve(__dirname, '../../../..', 'data/database.sqlite'),
    );
  });

  it('should initialize the DataSource', async () => {
    const dataSource = await databaseProvider.useFactory(configService);
    expect(dataSource.isInitialized).toBe(true);
  });
});
