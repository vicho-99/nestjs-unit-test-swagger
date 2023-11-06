import { ApiProperty } from "@nestjs/swagger";
import { CarCondition } from "../../../core/enums/car-condition.enum";
import { IsString, IsNumber, IsEnum } from "class-validator";

export class ListCarDto {

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()

    brand: string;

    @ApiProperty()
    @IsString()
    model: string;

    @ApiProperty()
    @IsNumber()
    year: number;

    @ApiProperty()
    @IsString()
    color: string;

    @ApiProperty()
    @IsNumber()
    mileage: number;

    @ApiProperty()
    @IsNumber()
    price: number;

    @IsEnum(CarCondition)
    @ApiProperty({
        description: 'Car condition',
        enum: CarCondition
    })
    condition: string;

}
