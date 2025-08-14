import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { Repository } from 'typeorm';
import { CreateMenuItemDto } from '../dtos/create-menu.dto';
import { UpdateMenuItemDto } from '../dtos/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItemEntity)
    private readonly menuRepo: Repository<MenuItemEntity>,
  ) {}

  findAll() {
    return this.menuRepo.find();
  }

  findOne(id: string) {
    return this.menuRepo.findOneBy({ id });
  }

  create(dto: CreateMenuItemDto) {
    const item = this.menuRepo.create(dto);
    return this.menuRepo.save(item);
  }

  update(id: string, dto: UpdateMenuItemDto) {
    return this.menuRepo.update(id, dto);
  }

  remove(id: string) {
    return this.menuRepo.delete(id);
  }
}
