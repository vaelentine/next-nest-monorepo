import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthzController } from '../healthz/healthz.controller';
import { ExampleController } from '../example/example.controller';
import { ExampleService } from '../example/example.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Example } from '../example/example.entity';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/providers/db/dabase.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (dataSource) => dataSource.options,
      inject: ['DATA_SOURCE'],
    }),
    TypeOrmModule.forFeature([Example]),
  ],
  controllers: [AppController, HealthzController, ExampleController],
  providers: [AppService, ExampleService],
})
export class AppModule {}
