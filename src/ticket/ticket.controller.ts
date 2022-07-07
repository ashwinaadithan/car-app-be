import { Controller, Post, Body, Req, UseInterceptors, Param, UploadedFiles, Delete } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketService } from './ticket.service';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @Req() req: Request) {
    return this.ticketService.create(createTicketDto, req['user']);
  }

  @Post(':id/image')
  @UseInterceptors(FilesInterceptor('images'))
  addImages(@Param('id') id: string, @UploadedFiles() images: Express.Multer.File[]) {
    return this.ticketService.addImages(id, images);
  }

  @Delete(':id/image/:image')
  deleteImage(@Param('id') id: string, @Param('image') image: string) {
    return this.ticketService.deleteImage(id, image);
  }
}
