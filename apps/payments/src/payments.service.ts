import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    private readonly notificationsService: ClientProxy,
  ) {
    this.stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY') ?? '',
      {
        apiVersion: '2025-09-30.clover',
      },
    );
  }

  async createCharge({ card, amount, email }: CreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa', // TODO: Search for how add custom payment method
      amount: amount * 100,
      confirm: true,
      // payment_method_types: ['card'],
      currency: 'usd',
    });

    this.notificationsService.emit('notify_email', {
      email,
      text: `Your payment of $${amount} has completed successfully.`,
    });

    return paymentIntent;
  }
}
