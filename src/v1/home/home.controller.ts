import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HomeService } from './home.service';

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private service: HomeService) {}

  @Get()
  appInfo() {
    return this.service.appInfo();
  }

  @Get('version')
  @Version('1')
  apiVersion() {
    return 'This is first version api ';
  }
}
