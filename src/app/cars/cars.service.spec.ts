import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { ListCarDto } from './dto/list-car.dto';

describe('CarsService', () => {

  let carsService: CarsService;

  const mockCarRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getRepositoryToken(Car),
          useValue: mockCarRepository,
        },
      ],
    }).compile();

    carsService = module.get<CarsService>(CarsService);

  });

  it('should be defined', () => {
    expect(carsService).toBeDefined();
  });

  describe('create()', () => {

    it('create => Should create a new user and return its data', async () => {

      const createCarDto: CreateCarDto = {
        brand: "Nissan",
        model: "Qashqai",
        year: 2023,
        color: "White",
        mileage: 0,
        price: 19490000,
        condition: "new"
      }

      const car = {
        id: 1,
        brand: "Nissan",
        model: "Qashqai",
        year: 2023,
        color: "White",
        mileage: 0,
        price: 19490000,
        condition: "new"
      } as CreateCarDto

      jest.spyOn(mockCarRepository, 'save').mockReturnValue(car);
      const result = await carsService.create(createCarDto);
      expect(mockCarRepository.save).toHaveBeenCalled();
      expect(mockCarRepository.save).toHaveBeenCalledWith(createCarDto);
      expect(result).toEqual(car);

    });

  });

  describe('findAll()', () => {

    it('should return an array of car', async () => {

      const cars: ListCarDto[] = [
        {
          id: 1,
          brand: "Nissan",
          model: "Qashqai",
          year: 2023,
          color: "Black",
          mileage: 0,
          price: 19490000,
          condition: "new"
        },
        {
          id: 2,
          brand: "Nissan",
          model: "Sentra",
          year: 2023,
          color: "White",
          mileage: 0,
          price: 14490000,
          condition: "new"
        },
      ]

      jest.spyOn(mockCarRepository, 'find').mockReturnValue(cars);
      const result = await carsService.findAll();
      expect(result).toEqual(cars);
      expect(mockCarRepository.find).toHaveBeenCalled();

    });

  });

  describe('findOne()', () => {

    it('should find a car by a given id and return its data', async () => {

      const id = 2;

      const car = {
        id: 2,
        brand: "Nissan",
        model: "Sentra",
        year: 2023,
        color: "White",
        mileage: 0,
        price: 14490000,
        condition: "new"
      };

      jest.spyOn(mockCarRepository, 'findOneBy').mockReturnValue(car);
      const result = await carsService.findOne(id);
      expect(result).toEqual(car);
      expect(mockCarRepository.findOneBy).toHaveBeenCalled();
      expect(mockCarRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('remove()', () => {

    it('should find a user by a given id, remove and then return undifined', async () => {
      const id = 10;
      const affected: number = 1;
      jest.spyOn(mockCarRepository, 'delete').mockReturnValue({ affected });
      const result = await carsService.remove(id);
      expect(result).toEqual(1);
      expect(mockCarRepository.delete).toHaveBeenCalled();
      expect(mockCarRepository.delete).toHaveBeenCalledWith(id);

    });

  });

});
