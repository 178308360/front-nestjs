import { Injectable } from '@nestjs/common';
import { CreateColorPickDto } from './dto/create-color-pick.dto';
import { UpdateColorPickDto } from './dto/update-color-pick.dto';

@Injectable()
export class ColorPickService {
  create(createColorPickDto: CreateColorPickDto) {
    return 'This action adds a new colorPick';
  }

  findAll() {
    return `This action returns all colorPick`;
  }

  findOne(id: number) {
    return `This action returns a #${id} colorPick`;
  }

  update(id: number, updateColorPickDto: UpdateColorPickDto) {
    return `This action updates a #${id} colorPick`;
  }

  remove(id: number) {
    return `This action removes a #${id} colorPick`;
  }
}
