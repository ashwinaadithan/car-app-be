import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TicketDocument } from './schema/ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { User } from './interface/user';
import { S3 } from 'aws-sdk';
import { randomBytes } from 'crypto';


@Injectable()
export class TicketService {
    constructor(@InjectModel('Ticket') private readonly TicketModel: Model<TicketDocument>) { }

    async create(createTicketDto: CreateTicketDto, user: User) {
        const ticket = new this.TicketModel({ ...createTicketDto, user_id: user._id });
        return await ticket.save();
    }

    async addImages(id: string, images: Express.Multer.File[]) {
        const imageUrls = await this.uploadImages(images);
        const ticket = await this.TicketModel.findById(id);

        ticket.images.concat(imageUrls);
        return await ticket.save();
    }

    async deleteImage(id: string, url: string) {
        const ticket = await this.TicketModel.findById(id);

        ticket.images = ticket.images.filter(image => image !== url);
        return await ticket.save();
    }

    async uploadImages(images: Express.Multer.File[]) {
        const imageUrls = [];
        for (let image of images) {
            const [type, ext] = image.mimetype.split('/');
            if (type === 'image') {
                const fileName = randomBytes(16).toString('hex') + '.' + ext;
                const res = await this.uploadToS3(image.buffer, fileName);
                imageUrls.push(res['Location']);
            }
        }

        return imageUrls;
    }

    async uploadToS3(fileBuffer: Buffer, fileName: string) {
        const s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
        const params: S3.PutObjectRequest = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: fileBuffer,
        };

        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }
}
