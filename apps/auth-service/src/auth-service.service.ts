import { KAFKA_SERVICE, KAFKA_TOPICS } from '@app/kafka';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthServiceService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    //Connect to Kafka when module initializes
    await this.kafkaClient.connect();
  }

  getHello(): string {
    return 'Buenos Diaz';
  }

  simulateUserRegistration(email: string) {
    //Publish event to Kafka
    this.kafkaClient.emit(KAFKA_TOPICS.USER_REGISTERED, {
      email: email,
      timestamp: new Date().toISOString(),
    });

    return { message: `User with E-mail ${email} has been registered` };
  }
}
