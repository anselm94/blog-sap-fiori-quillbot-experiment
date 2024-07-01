sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onParaphraseContentAction: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        },
        onSummarizeContentAction: function() {
            MessageToast.show("Custom handler invoked.");
        },
        onTranslateContentAction: function() {
            MessageToast.show("Custom handler invoked.");
        },
        onSuggestContentAction: function() {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
