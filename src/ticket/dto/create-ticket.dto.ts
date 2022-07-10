import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTicketDto {
    @ApiProperty()
    readonly title: string;
    @ApiPropertyOptional()
    readonly description?: string;
}