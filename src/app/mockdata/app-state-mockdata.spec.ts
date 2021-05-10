import { AppViewModel } from '../models/app.interface';
import {
    TableMetadata,
    TableRowDataType
} from '../shared-components/table/models/table.interface';

export const MOCK_GRID_ITEMS: TableMetadata = {
    columns: [
        {
            id: 'photo',
            label: 'Photo',
            position: 1
        },
        {
            id: 'photographer',
            label: 'Photographer',
            position: 2,
            isHidden: true
        }
    ],
    rows: [
        {
            Photo: {
                id: `${1}`,
                dataType: TableRowDataType.IMAGE,
                displayValue: 'b'
            },
            Photographer: {
                id: 'Paul',
                dataType: TableRowDataType.STRING,
                displayValue: 'Paul'
            }
        }
    ]
};

export const MOCK_VIEW_MODEL: AppViewModel = {
    searchQuery: 'a',
    currentPage: 1,
    nextPageUrl: 'a',
    totalResults: 1,
    photos: [
        {
            id: 1,
            url: 'a',
            photographer: 'b',
            src: {
                original: 'a',
                tiny:'b',
                landscape: 'c',
                portrait: 'd',
                large: 'e',
                large2x: 'f',
                medium: 'g',
                small: 'h'
            }
        }
    ],
    tableMetadata: MOCK_GRID_ITEMS,
    isLoading: false

}