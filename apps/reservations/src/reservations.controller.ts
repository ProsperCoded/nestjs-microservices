import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from '@app/common';
import { CurrentUser } from '@app/common';
import type { UserDto } from '@app/common';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: UserDto,
  ) {
    const _user = await this.reservationsService.create(
      createReservationDto,
      user,
    );
    console.log(_user);
    return _user;
  }

  @Get()
  async findAll() {
    const _user = await this.reservationsService.findAll();
    console.log(_user);
    return _user;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const _user = await this.reservationsService.findOne(id);
    console.log(_user);
    return _user;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    const _user = await this.reservationsService.update(
      id,
      updateReservationDto,
    );
    console.log(_user);
    return _user;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    await this.reservationsService.remove(id);
    return { message: 'Reservation deleted successfully' };
  }
}
