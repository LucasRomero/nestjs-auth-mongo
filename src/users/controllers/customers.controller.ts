import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/enum/roles.model';

import { RolesGuard } from '../../auth/guards/roles.guard';

@UseGuards(RolesGuard)
@Controller('customers')
export class CustomerController {
  constructor(private customersService: CustomersService) {}

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
