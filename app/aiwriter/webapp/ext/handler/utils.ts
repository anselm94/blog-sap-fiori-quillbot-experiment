import type { Editor as TinyMceEditor } from "tinymce";

/**
 * Gets the current selection range of text in the editor.
 * In case of just caret position without selection, the start and end will be the same
 */
export function getSelectionRangeFromEditor(editor: TinyMceEditor) {
  const htmlContent = editor.getContent({ format: "html" });
  const range = editor.selection.getRng();

  const startPos = getAbsoluteCursorPositionInHTML(
    htmlContent,
    range.startContainer,
    range.startOffset
  );
  const endPos = getAbsoluteCursorPositionInHTML(
    htmlContent,
    range.endContainer,
    range.endOffset
  );

  return { startPos, endPos };
}

/**
 * Gets the absolute cursor position in HTML content, based on the node containing
 * the start/end selection and the offset within the node
 */
function getAbsoluteCursorPositionInHTML(
  htmlContent: string,
  node: Node,
  offset: number
): number {
  let containerHTML: string;

  if (node.nodeType === Node.TEXT_NODE) {
    containerHTML = node.nodeValue || "";
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    containerHTML = (node as Element).outerHTML || "";
  } else {
    containerHTML = "";
  }

  const nodePosition = htmlContent.indexOf(containerHTML);
  let absolutePosition = nodePosition;

  if (node.nodeType === Node.TEXT_NODE) {
    absolutePosition += offset;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element;
    const openingTagEnd = element.outerHTML.indexOf(element.innerHTML);
    absolutePosition += openingTagEnd + offset;
  }

  return absolutePosition;
}
