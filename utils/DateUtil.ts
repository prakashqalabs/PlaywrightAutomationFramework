export class DateUtil {

    static getCurrentDate(): string {
        return new Date().toISOString().split("T")[0];
    }

    static getCurrentTimestamp(): string {
        return Date.now().toString();
    }

    static getFormattedDate(): string {
        return new Date().toLocaleDateString("en-IN");
    }
}

// usage example in test file

/*
import { DateUtil } from '../utils/DateUtil';
console.log(DateUtil.getCurrentDate());
console.log(DateUtil.getCurrentTimestamp());
console.log(DateUtil.getFormattedDate());
*/