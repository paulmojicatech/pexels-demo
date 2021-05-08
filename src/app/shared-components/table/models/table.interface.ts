import { SafeUrl } from "@angular/platform-browser";

export interface TableMetadata {
    columns: TableColumnMetadata[];
    rows: TableRowMetadata[];
}

export interface TableColumnMetadata {
    id: string;
    label: string;
    position: number;
    colSpan?: number;
    isHidden?: boolean;
}

export interface TableRowMetadata {
    [key: string]: {
        id: string;
        dataType: TableRowDataType;
        displayValue: string | number | SafeUrl;
    };
}

export enum TableRowDataType {
    STRING = 'string',
    CURRENCY = 'currency',
    DATE = 'date',
    IMAGE = 'image'
}