import cds from "@sap/cds";

class AiWriterService extends cds.ApplicationService {
  async init() {
    const { paraphraseContent, summarizeContent, translateContent, Document } =
      require("#cds-models/AiWriterService") as typeof import("#cds-models/AiWriterService");

    this.on(paraphraseContent, async (req) => {
      const { content, synonymUsage, paraphraseMode } = req.data;

      return "paraphrased content";
    });

    this.on(summarizeContent, async (req) => {
      const { content, summarizeType, contentLength } = req.data;

      return "summarized content";
    });

    this.on(translateContent, async (req) => {
      const { content, langCode } = req.data;

      return "translated content";
    });

    this.on(Document.actions.suggestContent, async (req) => {
      const { instruction, cursorPos } = req.data;
    });

    return super.init();
  }
}

export default {
  AiWriterService: AiWriterService,
};
