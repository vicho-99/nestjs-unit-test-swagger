import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from '@nestjs/swagger';
import { CreateCarDto } from './create-car.dto';
import { IsString, IsNumber, IsNotEmpty, MaxLength, Min, Max, IsEnum } from "class-validator";
import { CarCondition } from "../../../core/enums/car-condition.enum";

export class UpdateCarDto extends PartialType(CreateCarDto) {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(55)
    brand: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    model: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(1886)
    @Max(2050)
    year: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    color: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    mileage: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsEnum(CarCondition)
    @ApiProperty({
        description: 'Car condition',
        enum: CarCondition
    })
    @IsNotEmpty()
    condition: string;
}
