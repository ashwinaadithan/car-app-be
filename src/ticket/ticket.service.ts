import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TicketDocument } from './schema/ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { User } from './interface/user';


@Injectable()
export class TicketService {
    constructor(@InjectModel('Ticket') private readonly TicketModel: Model<TicketDocument>) { }

    async create(createTicketDto: CreateTicketDto, user: User) {
        const ticket = new this.TicketModel({ ...createTicketDto, user_id: user._id });
        return await ticket.save();
    }
}
