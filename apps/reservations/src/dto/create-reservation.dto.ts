import { CardDto, CreateChargeDto } from '@app/common';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

// Reservation creation DTO
export class CreateReservationDto {
  // @IsISO8601() // Ensure startDate is a valid ISO8601 string
  @IsDate()
  @Type(() => Date)
  startDate: string;

  // @IsISO8601() // Ensure endDate is a valid ISO8601 string
  @IsDate()
  @Type(() => Date)
  endDate: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  amount: number;
}
