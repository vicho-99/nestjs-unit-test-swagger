import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ListCarDto } from './dto/list-car.dto';


@ApiTags('cars')
@Controller('cars')
export class CarsController {

  constructor(private readonly carsService: CarsService) { }

  @Post()
  @ApiOperation({ summary: 'Crete new car' })
  @ApiResponse({ type: ListCarDto, isArray: false, description: 'Registered entity', status: 201 })
  @ApiResponse({ description: 'Bad request', status: 400 })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all cars' })
  @ApiResponse({ type: ListCarDto, isArray: true, description: '', status: 200 })
  @ApiResponse({ description: 'Bad request', status: 400 })
  async findAll() {
    return await this.carsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'List car by id' })
  @ApiResponse({ type: ListCarDto, isArray: false, status: 200 })
  @ApiResponse({ description: 'Bad request', status: 400 })
  @ApiResponse({ description: 'Not found entity by id parameter entered', status: 404 })
  async findOne(@Param('id') id: string) {
    return await this.carsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update car' })
  @ApiResponse({ description: 'Not found entity by id parameter entered', status: 404 })
  @ApiResponse({ description: 'Bad request', status: 400 })
  @ApiResponse({ type: UpdateCarDto, isArray: false, status: 200 })
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return await this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete car by id' })
  @HttpCode(204)
  @ApiResponse({ description: 'Deleted entity', status: 204 })
  @ApiResponse({ description: 'Not found entity by id parameter entered', status: 404 })
  @ApiResponse({ description: 'Bad request', status: 400 })
  async remove(@Param('id') id: string) {
    await this.carsService.remove(+id);
  }

}
