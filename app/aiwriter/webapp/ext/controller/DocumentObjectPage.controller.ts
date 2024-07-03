import BaseControllerExtension from "sap/fe/core/controllerextensions/BaseControllerExtension";
import Dialog from "sap/m/Dialog";
import MessageToast from "sap/m/MessageToast";
import UI5Element from "sap/ui/core/Element";
import RichTextEditor from "sap/ui/richtexteditor/RichTextEditor";
import type { Editor as TinyMceEditor } from "tinymce";
import * as utils from "../handler/utils";
import ExtensionAPI from "sap/fe/templates/ObjectPage/ExtensionAPI";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import type { ParaphraseMode, SynonymUsage } from "#cds-models/AiWriterService";

type ModelDialogData = {
  busy: boolean;
  paraphrase: {
    paraphraseMode: ParaphraseMode;
    synonymUsage: SynonymUsage;
  };
};

/**
 * @namespace aiwriter.ext.controller
 * @controller
 */
export default class DocumentObjectPage extends BaseControllerExtension {
  declare base: {
    getExtensionAPI(): ExtensionAPI;
  };

  private dialogContentParaphrase: Dialog;

  static overrides = {
    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf aiwriter.ext.controller.DocumentObjectPage
     */
    onInit(this: DocumentObjectPage) {
      this.getView().setModel(this.createDialogDataModel(), "dialog");
    },
  };

  /////////////////////////
  //// PRIVATE HELPERS ////
  /////////////////////////

  private createDialogDataModel() {
    return new JSONModel({
      busy: false,
      paraphrase: {
        paraphraseMode: "standard",
        synonymUsage: "fewer",
      },
    } as ModelDialogData);
  }

  private getRichTextEditor() {
    // this.byId("rteContent"); is not working. May be FEv4 not adding dependents somewhere in the chain higher?
    return UI5Element.getElementById("rteContent") as RichTextEditor;
  }

  private getTinyMceEditor() {
    return this.getRichTextEditor().getNativeApi() as TinyMceEditor;
  }

  private getSelectionRangeFromEditor() {
    return utils.getSelectionRangeFromEditor(this.getTinyMceEditor());
  }

  private getTextFromSelection() {
    return this.getTinyMceEditor().selection.getContent({
      format: "html",
    });
  }

  private setTextOnSelection(content: string) {
    // replace the selected text with the new content
    this.getTinyMceEditor().selection.setContent(content);

    // then notify the rich text editor wrapper about the text change (this doesn't happen automatically)
    // so it gets persisted to draft
    this.getRichTextEditor().setValue(this.getTinyMceEditor().getContent());
  }

  /////////////////////////
  //// ACTION HANDLERS ////
  /////////////////////////

  async onParaphraseContentAction() {
    this.dialogContentParaphrase = (await this.base
      .getExtensionAPI()
      .loadFragment({
        name: "aiwriter.ext.fragment.DialogContentParaphrase",
        id: "dialogcontentparaphrase",
        controller: this,
      })) as Dialog;
    this.dialogContentParaphrase.open();
  }

  onSummarizeContentAction() {
    MessageToast.show("Custom handler invoked.");
  }

  onTranslateContentAction() {
    MessageToast.show("Custom handler invoked.");
  }

  onSuggestContentAction() {
    MessageToast.show("Custom handler invoked.");
  }

  /////////////////////////////////
  //// DIALOG ACTION CALLBACKS ////
  /////////////////////////////////

  async onDialogParaphraseActionPress() {
    const dialogModel = this.getView().getModel("dialog") as JSONModel;
    const dialogData = dialogModel.getProperty("/") as ModelDialogData;

    dialogModel.setProperty("/busy", true);
    const resData = (await this.base
      .getExtensionAPI()
      .getEditFlow()
      .invokeAction("paraphraseContent", {
        model: this.getView().getModel() as ODataModel,
        skipParameterDialog: true,
        parameterValues: [
          {
            name: "content",
            value: this.getTextFromSelection(),
          },
          {
            name: "paraphraseMode",
            value: dialogData.paraphrase.paraphraseMode,
          },
          {
            name: "synonymUsage",
            value: dialogData.paraphrase.synonymUsage,
          },
        ],
      })) as { value: string };
    dialogModel.setProperty("/busy", false);

    this.setTextOnSelection(resData.value);

    this.dialogContentParaphrase.close();
    this.dialogContentParaphrase.destroy();
  }

  onDialogParaphraseCancelPress() {
    this.dialogContentParaphrase.close();
    this.dialogContentParaphrase.destroy();
  }

  onDialogSummarizeActionPress() {}
}
