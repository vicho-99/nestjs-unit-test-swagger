import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { ListCarDto } from './dto/list-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

describe('CarsController', () => {

  let carsController: CarsController;

  const mockCarsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [CarsService,
        {
          provide: CarsService,
          useValue: mockCarsService,
        },
      ],

    }).compile();

    carsController = module.get<CarsController>(CarsController);

  });

  it('should be defined', () => {
    expect(carsController).toBeDefined();
  });

  describe('create()', () => {

    it('should create a new car by a given data', async () => {

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

      // Para burlarnos del resultado devuelto por el método externo
      jest.spyOn(mockCarsService, 'create').mockReturnValue(car);
      // llamamos a la función que estamos probando dándole los datos simulados por spyon, también almacenamos su resultado.
      const result = await carsController.create(createCarDto);
      //verificamos si se ha llamado a la función simulada
      expect(mockCarsService.create).toHaveBeenCalled();
      // verificamos si se ha llamado con los datos correctos
      expect(mockCarsService.create).toHaveBeenCalledWith(createCarDto);
      //verificamos si el resultado es igual al valor simulado.
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

      // Para burlarnos del resultado devuelto por el método externo
      jest.spyOn(mockCarsService, 'findAll').mockReturnValue(cars);
      // llamamos a la función que estamos probando dándole los datos simulados por spyon, también almacenamos su resultado.
      const result = await carsController.findAll();
      //verificamos si el resultado es igual al valor simulado.
      expect(result).toEqual(cars);
      expect(mockCarsService.findAll).toHaveBeenCalled();

    });

  });

  describe('findOne()', () => {

    it('should find a car by a given id and return its data', async () => {

      const id = '2';

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

      jest.spyOn(mockCarsService, 'findOne').mockReturnValue(car);

      const result = await carsController.findOne(id);

      expect(result).toEqual(car);
      expect(mockCarsService.findOne).toHaveBeenCalled();
      expect(mockCarsService.findOne).toHaveBeenCalledWith(+id);

    });
  });

  describe('update()', () => {

    it('should find a car by a given id and update its data', async () => {

      const id = '1';

      const updateCarDto: UpdateCarDto = {
        brand: "Nissan",
        model: "Qashqai",
        year: 2023,
        color: "black",
        mileage: 0,
        price: 19490000,
        condition: "new"
      };

      const car = {
        brand: "Nissan",
        model: "Qashqai",
        year: 2023,
        color: "black",
        mileage: 0,
        price: 19490000,
        condition: "new"
      };

      jest.spyOn(mockCarsService, 'update').mockReturnValue(car);

      const result = await carsController.update(id, updateCarDto);

      expect(result).toEqual(car);
      expect(mockCarsService.update).toHaveBeenCalled();
      expect(mockCarsService.update).toHaveBeenCalledWith(+id, updateCarDto);
    });

  });

  describe('remove()', () => {

    it('should find a user by a given id, remove and then return undifined', async () => {

      const id = '1';

      const affected: number = 1;

      jest.spyOn(mockCarsService, 'remove').mockReturnValue(affected);

      const result = await carsController.remove(id);

      expect(result).toEqual(undefined);
      expect(mockCarsService.remove).toHaveBeenCalled();
      expect(mockCarsService.remove).toHaveBeenCalledWith(+id);

    });

  });

});
