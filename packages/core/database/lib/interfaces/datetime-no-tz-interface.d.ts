import { DatetimeInterface } from './datetime-interface';
export declare class DatetimeNoTzInterface extends DatetimeInterface {
    protected formatDateTimeToString(dateInfo: {
        year: string;
        month: string;
        day: string;
        hour?: string;
        minute?: string;
        second?: string;
    }): string;
    toValue(value: any, ctx?: any): Promise<any>;
    toString(value: any, ctx?: any): any;
}
