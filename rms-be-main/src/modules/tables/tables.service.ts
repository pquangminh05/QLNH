import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from './entities/table.entity';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(TableEntity)
    private readonly tableRepo: Repository<TableEntity>,
  ) {}

  async findAll(status?: string) {
    if (status && ['available', 'reserved', 'occupied'].includes(status)) {
      return this.tableRepo.find({
        where: { status: status as 'available' | 'reserved' | 'occupied' },
      });
    }
    return this.tableRepo.find();
  }

  async findOne(id: string) {
    return this.tableRepo.findOne({ where: { id } });
  }

  async create(dto: CreateTableDto) {
    const newTable = this.tableRepo.create(dto);
    return this.tableRepo.save(newTable);
  }

  async update(id: string, dto: UpdateTableDto) {
    await this.tableRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.tableRepo.delete(id);
  }
}
