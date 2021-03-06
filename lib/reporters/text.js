module.exports = (context, emphasized = [], marked = []) => {
  const contentHeader = context.messages.reporting.contentHeader;
  const gutterHeader = context.messages.reporting.gutterHeader.padStart(5);

  const gutterWidth = gutterHeader.length + 3;
  const columnsHeader = `  ${gutterHeader} | ${contentHeader}\n`;
  const omission = `${' '.repeat(gutterWidth - 5)}...\n`;

  let snippet = ''

  if(context.sourceLabel) {
    snippet += `${context.sourceLabel}\n`;
  }

  snippet += columnsHeader;

  let inOmission = false;

  for(let instruction of context.instructions) {
    const emphasize = emphasized.includes(instruction);
    const mark = marked.includes(instruction);
    let show = false;

    for(let shownInstruction of [...emphasized, ...marked]) {
      if(instruction.line >= shownInstruction.line - 2 &&
         instruction.line <= shownInstruction.line + 2) {
        show = true;
        break;
      }
    }

    if(show) {
      const line = context.input.substr(instruction.index, instruction.length);
      const lineNumber = (instruction.line + context.indexing).toString();

      if(emphasize) {
        snippet += ` >${lineNumber.padStart(gutterWidth - 3)} | ${line}\n`;
      } else if(mark) {
        snippet += ` *${lineNumber.padStart(gutterWidth - 3)} | ${line}\n`;
      } else {
        snippet += `${lineNumber.padStart(gutterWidth - 1)} | ${line}\n`;
      }

      inOmission = false;
    } else if(!inOmission) {
      snippet += omission;
      inOmission = true;
    }
  }

  return snippet;
};
