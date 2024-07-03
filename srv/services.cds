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

    type ImproveFrequency : String enum {
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

    entity Documents as projection on aiwriter.Documents
        actions {
            action suggestContent(instruction : String(100), cursorPos : Integer) returns Documents;
        };

    action paraphraseContent(content : String, mode: ParaphraseMode, frequency : ImproveFrequency) returns String;
    action summarizeContent(content : String, type : SummarizeType, length : ContentLength) returns String;
    action translateContent(content : String, langCode : String(3)) returns String;
}

annotate AiWriterService.Documents with @odata.draft.enabled;
