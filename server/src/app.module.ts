import { Module } from '@nestjs/common';
import { GoogleTrendsModule } from "./google-trends/google-trends.module";

@Module({
  imports: [GoogleTrendsModule]
})
export class AppModule { }
