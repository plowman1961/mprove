/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';

import { Nack, AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { api } from 'src/barrels/api';

@Injectable()
export class RabbitService {
  constructor(private amqpConnection: AmqpConnection) {}

  async sendToDisk(item: {
    routingKey: string;
    message: any;
  }): Promise<string> {
    const response = await this.amqpConnection.request<string>({
      exchange: api.M_DISK,
      routingKey: item.routingKey,
      payload: item.message
    });

    return response;
  }

  async sendToBlockml(item: {
    routingKey: string;
    message: any;
  }): Promise<string> {
    const response = await this.amqpConnection.request<string>({
      exchange: api.M_BLOCKML,
      routingKey: item.routingKey,
      payload: item.message
    });

    return response;
  }
}