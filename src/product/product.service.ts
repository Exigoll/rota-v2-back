import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  create(dto: CreateProductDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  async findOneBy(id: number) {
    const find = await this.repository.findOneBy({ id: id });

    if (!find) {
      throw new NotFoundException('Товар не найден');
    }

    return find;
  }

  async update(id: number, dto: UpdateProductDto) {
    const find = await this.repository.findOneBy({ id: id });

    if (!find) {
      throw new NotFoundException('Товар не найден');
    }
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    const find = await this.repository.findOneBy({ id: id });

    if (!find) {
      throw new NotFoundException('Товар не найден');
    }
    return this.repository.delete(id);
  }
}
