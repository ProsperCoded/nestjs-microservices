import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from 'apps/reservations/src/reservations.repository';
import { UserDto } from '@app/common';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}
  create(createReservationDto: CreateReservationDto, user: UserDto) {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      startDate: new Date(createReservationDto.startDate),
      endDate: new Date(createReservationDto.endDate),
      userId: user._id,
    });
  }

  findAll() {
    return this.reservationsRepository.find({});
  }

  findOne(id: string) {
    return this.reservationsRepository.findOne({ _id: id });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id: id },
      updateReservationDto,
    );
  }

  remove(id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id: id });
  }
}
