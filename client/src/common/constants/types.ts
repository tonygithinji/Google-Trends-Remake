export class Options {
    keyword: string = "";
    period: string = "past_12_months";
    geo?: string;
    category: number = 0;
    googleProperty: string = "";
    resolution?: string;
    granularTimeResolution?: boolean;
}

export class QueryOptions {
    keyword: string = "";
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    category: number = 0;
    property: string = "";
    resolution?: string;
    granularTimeResolution?: boolean;
}