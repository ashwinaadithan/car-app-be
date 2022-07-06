import Mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TicketDocument = Ticket & Document;

export const STATUS = ['ACTIVE', 'IN-PROGRESS', 'CLOSED'];
export const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Ticket {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop()
    images: string[];

    @Prop({ type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user_id: string;

    @Prop({ enum: STATUS, required: true, uppercase: true, default: 'active' })
    status: string;

    @Prop({ enum: PRIORITIES, uppercase: true })
    priority: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);