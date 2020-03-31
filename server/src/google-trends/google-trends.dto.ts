export class AutocompleteQuery {
    query: string;
}

export class Options {
    keyword: string;
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    category: number = 0;
    property: string = "";
    resolution?: string;
    granularTimeResolution?: boolean;
}