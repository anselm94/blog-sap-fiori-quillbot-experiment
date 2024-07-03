using com.example.aiwriter as schema from '../db/schema';

annotate schema.Documents with {
    documentId @UI.Hidden;
    title      @title: '{i18n>Title}';
    content    @UI.AdaptationHidden  @title: '{i18n>Content}' @Common.FieldControl : #Mandatory;
};
