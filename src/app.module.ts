import { Module } from '@nestjs/common';
import { CarsModule } from './app/cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';

@Module({
  imports: [
    CarsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})

export class AppModule { }
