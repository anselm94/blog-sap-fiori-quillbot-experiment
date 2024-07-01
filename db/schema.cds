namespace com.example.aiwriter;

using {managed} from '@sap/cds/common';

@title: 'Documents'
entity Documents : managed {
    key documentId : UUID;

        @readonly
        title      : String(100) default '';
        content    : LargeString;
}
