import { Controller, Get, Post, Body, HttpCode } from "@nestjs/common";
import * as dto from "./google-trends.dto";
import googleTrends = require('google-trends-api');

@Controller("api")
export class GoogleTrendsAPI {
    @Post("autocomplete")
    @HttpCode(200)
    async autocomplete(@Body() autocompleteQuery: dto.AutocompleteQuery) {
        try {
            const result = await googleTrends.autoComplete({ keyword: autocompleteQuery.query });
            const data = JSON.parse(result);
            return { status: "ok", data: data.default.topics };
        } catch (error) {
            console.log("ERROR :: ", error);
            return { status: "error" };
        }
    }

    @Post("interest-over-time")
    @HttpCode(200)
    async interestOverTime(@Body() body: dto.Options) {
        try {
            body.startTime = new Date(body.startTime);
            body.endTime = new Date(body.endTime);
            const result = await googleTrends.interestOverTime({ ...body });
            const data = JSON.parse(result);
            return { status: "ok", data: data.default.timelineData, averages: data.default.averages };
        } catch (error) {
            console.log("ERROR :: ", error);
            console.log('error message', error.message);
            console.log('request body', error.requestBody);
            return { status: "error" };
        }
    }
}