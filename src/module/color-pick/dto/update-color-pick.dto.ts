import { PartialType } from '@nestjs/swagger';
import { CreateColorPickDto } from './create-color-pick.dto';

export class UpdateColorPickDto extends PartialType(CreateColorPickDto) {}
