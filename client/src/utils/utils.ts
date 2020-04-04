import moment from "moment";

export class Utils {
    static calculateDateRange(dateRange: string) {
        let startDate: Date;
        let endDate: Date;

        switch (dateRange) {
            case "past_12_months":
                startDate = moment().subtract(12, "months").toDate();
                endDate = moment().toDate();
                break;
            default:
                startDate = moment().subtract(12, "months").toDate();
                endDate = moment().toDate();
        }

        return { startDate, endDate };
    }
}