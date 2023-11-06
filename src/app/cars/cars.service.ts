import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { promises } from 'dns';


@Injectable()
export class CarsService {

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) { }

  async create(createCarDto: CreateCarDto): Promise<CreateCarDto> {
    return await this.carRepository.save(createCarDto);
  }

  async findAll(): Promise<CreateCarDto[]> {
    return await this.carRepository.find();
  }

  async findOne(id: number): Promise<CreateCarDto> {

    const car = await this.carRepository.findOneBy({ id });

    if (!car) {
      throw new NotFoundException('Car no found');
    }

    return car;

  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<UpdateCarDto> {

    const { affected } = await this.carRepository.update(id, updateCarDto);

    if (!affected)
      throw new NotFoundException('Car no found');

    return updateCarDto;

  }

  async remove(id: number): Promise<number> {

    const { affected } = await this.carRepository.delete(id);

    if (!affected)
      throw new NotFoundException('Car no found');

    return affected;

  }

}
