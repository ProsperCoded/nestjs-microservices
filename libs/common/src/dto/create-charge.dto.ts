import {
  IsDefined,
  IsEmail,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CardDto } from './card.dto';
import { Type } from 'class-transformer';

export class CreateChargeDto {
  @IsEmail()
  email: string;

  @IsNumber()
  amount: number;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;
}
