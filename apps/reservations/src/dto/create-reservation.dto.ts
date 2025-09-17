import { Type } from 'class-transformer';
import { IsDate, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

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
  invoiceId: string;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
