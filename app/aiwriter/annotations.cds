using AiWriterService as service from '../../srv/services';

annotate service.Documents with @(UI: {
    HeaderInfo                         : {
        TypeName      : '{i18n>Document}',
        TypeNamePlural: '{i18n>Documents}',
        Title         : {Value: title, },
    },
    LineItem                           : [
        {
            Value            : title,
            ![@UI.Importance]: #High,
        },
        {Value: modifiedAt, },
        {Value: modifiedBy, },
        {Value: createdBy, },
    ],
    SelectionPresentationVariant #table: {
        PresentationVariant: {
            Visualizations: ['@UI.LineItem', ],
            SortOrder     : [{
                Property  : createdAt,
                Descending: true,
            }, ],
        },
        SelectionVariant   : {SelectOptions: [], },
    }
}, );
