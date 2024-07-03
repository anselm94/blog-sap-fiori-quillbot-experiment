import cds from "@sap/cds";

class AiWriterService extends cds.ApplicationService {
  async init() {
    const { paraphraseContent } =
      require("#cds-models/AiWriterService") as typeof import("#cds-models/AiWriterService");

    this.on(paraphraseContent, async (req) => {
      const { content, frequency, mode } = req.data;

      return "hello";
    });
    return super.init();
  }
}

export default {
  AiWriterService: AiWriterService,
};
