using {com.example.aiwriter} from '../db/schema';

@path    : 'aiwriter'
@requires: ['authenticated-user']
service AiWriterService {
    type ParaphraseMode     : String enum {
        standard;
        fluency;
        formal;
        academic;
        simple;
        creative;
        expand;
        shorten;
    }

    type SynonymUsage : String enum {
        fewer;
        more;
    }

    type SummarizeType : String enum {
        keysentences;
        paragraph;
    }

    type ContentLength : String enum {
        short;
        medium;
        long;
    }

    type ISOLanguageCode : String(3);

    entity Documents as projection on aiwriter.Documents
        actions {
            action suggestContent(instruction : String(100), cursorPos : Integer) returns Documents;
        };

    action paraphraseContent(content : String, paraphraseMode: ParaphraseMode, synonymUsage : SynonymUsage) returns String;
    action summarizeContent(content : String, summarizeType : SummarizeType, contentLength : ContentLength) returns String;
    action translateContent(content : String, langCode : ISOLanguageCode) returns String;
}

annotate AiWriterService.Documents with @odata.draft.enabled;
