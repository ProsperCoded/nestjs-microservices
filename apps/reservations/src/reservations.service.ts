import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from 'apps/reservations/src/reservations.repository';
import { UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENTS_SERVICE } from '@app/common';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsClient: ClientProxy,
  ) {}
  async create(createReservationDto: CreateReservationDto, user: UserDto) {
    const paymentIntent = this.paymentsClient
      .send('create_charge', {
        amount: createReservationDto.charge.amount,
        card: createReservationDto.charge.card,
        email: user.email,
      })
      .pipe(
        map((res) => {
          return this.reservationsRepository.create({
            ...createReservationDto,
            timestamp: new Date(),
            startDate: new Date(createReservationDto.startDate),
            endDate: new Date(createReservationDto.endDate),
            userId: user._id,
            invoiceId: res.id,
          });
        }),
      );

    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      startDate: new Date(createReservationDto.startDate),
      endDate: new Date(createReservationDto.endDate),
      userId: user._id,
      invoiceId: paymentIntent.id,
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
