import { ApiModelProperty } from '@nestjs/swagger';

export class CreatePicDto {
    @ApiModelProperty()
    address: string;
}