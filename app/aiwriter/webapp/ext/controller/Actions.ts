import MessageToast from "sap/m/MessageToast";

export default {
  onParaphraseContentAction: function () {
    MessageToast.show("Custom handler invoked.");
  },
  onSummarizeContentAction: function () {
    MessageToast.show("Custom handler invoked.");
  },
  onTranslateContentAction: function () {
    MessageToast.show("Custom handler invoked.");
  },
  onSuggestContentAction: function () {
    MessageToast.show("Custom handler invoked.");
  },
};
