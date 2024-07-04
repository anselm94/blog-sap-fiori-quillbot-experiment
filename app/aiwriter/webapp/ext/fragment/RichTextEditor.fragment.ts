import ExtensionAPI from "sap/fe/templates/ObjectPage/ExtensionAPI";
import Button from "sap/m/Button";
import FormattedText from "sap/m/FormattedText";
import HBox from "sap/m/HBox";
import Input from "sap/m/Input";
import Popover from "sap/m/Popover";
import SelectList from "sap/m/SelectList";
import VBox from "sap/m/VBox";
import { PlacementType } from "sap/m/library";
import Icon from "sap/ui/core/Icon";
import ListItem from "sap/ui/core/ListItem";
import RichTextEditor from "sap/ui/richtexteditor/RichTextEditor";
import { EditorType } from "sap/ui/richtexteditor/library";
import DocumentObjectPage from "../controller/DocumentObjectPage.controller";

type DocumentObjectPageExtensionAPI = {
  extension: {
    aiwriter: {
      ext: { controller: { DocumentObjectPage: DocumentObjectPage } };
    };
  };
};

/**
 * Creates a popover containing instructions for AI to suggest new content.
 * @param fnInstructionSelect callback which gets called when an instruction is selected
 * @returns AI Suggestions Popover
 */
function createSuggestContentPopover(
  fnInstructionSelect: (instruction: string) => Promise<void>
) {
  let contentInstruction = "";

  const suggestContentPopover = new Popover({
    placement: PlacementType.Bottom,
    showHeader: false,
    content: [
      new SelectList({
        items: [
          new ListItem({
            icon: "sap-icon://lightbulb",
            text: "Generate Ideas",
          }),
          new ListItem({
            icon: "sap-icon://increase-line-height",
            text: "Complete Paragraph",
          }),
          new ListItem({
            icon: "sap-icon://text-align-justified",
            text: "Start New Paragraph",
          }),
          new ListItem({
            icon: "sap-icon://example",
            text: "Add Example",
          }),
          new ListItem({
            icon: "sap-icon://grid",
            text: "Add Counterexample",
          }),
          new ListItem({
            icon: "sap-icon://resize-horizontal",
            text: "Offer New Viewpoint",
          }),
        ],
        selectionChange(event) {
          contentInstruction = event.getParameter("selectedItem").getText();
          suggestContentPopover.close();
        },
      }),
      new HBox({
        alignItems: "Center",
        items: [
          new Icon({
            src: "sap-icon://user-edit",
          }).addStyleClass("sapUiTinyMarginEnd"),
          new Input({
            placeholder: "Enter custom instructions",
            liveChange(event) {
              contentInstruction = event.getParameter("value");
            },
          }),
        ],
      }).addStyleClass("sapUiSmallMarginBeginEnd"),
    ],
    afterClose(this: Popover) {
      fnInstructionSelect(contentInstruction);
      this.destroy();
    },
  });
  return suggestContentPopover;
}

export default {
  /**
   * JS Fragment semantic. `createContent` is called from the enclosing view's controller.
   * Here it is the the `DocumentObjectPage.controller.ts` which is an controller extension.
   */
  createContent(controller: ExtensionAPI & DocumentObjectPageExtensionAPI) {
    return new VBox({
      items: [
        // Read only mode
        new FormattedText({
          htmlText: "{content}",
          visible: "{= ${ui>/editMode} !== 'Editable'}",
        }),
        // Edit mode
        new RichTextEditor({
          id: "rteContent",
          value: "{content}",
          editorType: EditorType.TinyMCE6,
          customToolbar: true,
          visible: "{= ${ui>/editMode} === 'Editable'}",
          ready(this: RichTextEditor) {
            this.addCustomButton(
              new Button({
                icon: "sap-icon://ai",
                text: "AI Suggestions",
                press(this: Button) {
                  const suggestContentPopover = createSuggestContentPopover(
                    controller.extension.aiwriter.ext.controller
                      .DocumentObjectPage.onFragmentSuggestContentAction
                  );
                  controller.addDependent(suggestContentPopover);
                  suggestContentPopover.openBy(this);
                },
              })
            );
            this.invalidate(); // to trigger render when sometimes not rendered properly
          },
        }),
      ],
    });
  },
};
