namespace com.example.aiwriter;

using {managed} from '@sap/cds/common';

@title: 'Documents'
entity Documents : managed {
    key documentId : UUID;
        title      : String(100) not null;
        content    : LargeString;
}
