import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketController } from './ticket.controller';
import { TicketSchema } from './schema/ticket.schema';
import { TicketService } from './ticket.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }])],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule { }
