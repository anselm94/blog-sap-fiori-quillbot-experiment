using {com.example.aiwriter} from '../db/schema';

@path    : 'aiwriter'
@requires: ['authenticated-user']
service AiWriterService {
    entity Documents as projection on aiwriter.Documents
        actions {
            action paraphraseContent(tone : String(20), selectionRange : many Integer);

            action summarizeContent(type : String(20), selectionRange : many Integer);

            action translateContent(langCode : String(3), selectionRange : many Integer);

            action suggestContent(instruction : String(100), cursorPos : Integer);
        };
}

annotate AiWriterService.Documents with @odata.draft.enabled;
