import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @Transform(({value}) => Number(value))
    @IsNumber()
    @Min(0)
    price: number;

    @Transform(({value}) => Number(value))
    @IsNumber()
    @Min(0)
    stock: number;
}