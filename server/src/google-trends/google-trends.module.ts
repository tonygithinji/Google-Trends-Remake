import { Module } from '@nestjs/common';
import { controllers } from "./index";

@Module({
    imports: [],
    controllers: [...controllers]
})
export class GoogleTrendsModule { }
