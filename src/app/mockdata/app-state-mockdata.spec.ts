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
