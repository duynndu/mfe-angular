import {
  prepare,
  prepareWithSegments,
  layout,
  layoutNextLineRange,
  materializeLineRange,
  type LayoutCursor,
} from '@chenglou/pretext';

export interface MeasureOptions {
  text: string;
  font: string; // e.g. "16px 'Times New Roman'"
  width: number;
  lineHeight: number;
  indentFirstLine?: number; // pixel indent for the first line (e.g., label width)
  minRows?: number;
}

export interface MeasureResult {
  lineCount: number;
  height: number;
  lines?: string[];
}

/**
 * Tính toán chiều cao và số dòng của text cho textarea / ô nhập liệu
 * Hỗ trợ thụt đầu dòng (indentFirstLine) cho trường hợp có label phía trước
 */
export function measureTextareaLayout(options: MeasureOptions): MeasureResult {
  const {
    text,
    font,
    width,
    lineHeight = 20,
    indentFirstLine = 0,
    minRows = 1,
  } = options;

  if (!width || width <= 0) {
    const lines = Math.max(minRows, 1);
    return { lineCount: lines, height: lines * lineHeight };
  }

  // Nếu chuỗi rỗng
  if (!text) {
    const lines = Math.max(minRows, 1);
    return { lineCount: lines, height: lines * lineHeight, lines: [''] };
  }

  // Trường hợp không có thụt đầu dòng: dùng fast-path layout()
  if (!indentFirstLine || indentFirstLine <= 0) {
    const prepared = prepare(text, font, { whiteSpace: 'pre-wrap' });
    const result = layout(prepared, width, lineHeight);
    const finalLineCount = Math.max(minRows, result.lineCount);
    return {
      lineCount: finalLineCount,
      height: finalLineCount * lineHeight,
    };
  }

  // Trường hợp có thụt đầu dòng:
  // Dòng 1 dùng width: width - indentFirstLine
  // Dòng 2 trở đi dùng width: width
  const preparedWithSegs = prepareWithSegments(text, font, { whiteSpace: 'pre-wrap' });
  const lines: string[] = [];
  let cursor: LayoutCursor | null = { segmentIndex: 0, graphemeIndex: 0 };
  let isFirstLine = true;

  while (cursor) {
    const currentMaxWidth = isFirstLine
      ? Math.max(30, width - indentFirstLine)
      : width;

    const lineRange = layoutNextLineRange(preparedWithSegs, cursor, currentMaxWidth);
    if (!lineRange) break;

    // Ngăn chặn lặp vô hạn hoặc tạo dòng rỗng thừa ở cuối
    if (
      cursor.segmentIndex === lineRange.end.segmentIndex &&
      cursor.graphemeIndex === lineRange.end.graphemeIndex
    ) {
      break;
    }

    const line = materializeLineRange(preparedWithSegs, lineRange);
    lines.push(line.text);

    cursor = line.end;
    isFirstLine = false;

    // Kiểm tra xem cursor đã đi đến cuối toàn bộ văn bản chưa
    if (
      cursor.segmentIndex >= preparedWithSegs.segments.length ||
      (cursor.segmentIndex === preparedWithSegs.segments.length - 1 &&
        cursor.graphemeIndex >= (preparedWithSegs.segments[cursor.segmentIndex]?.length ?? 0))
    ) {
      break;
    }
  }

  const calculatedLineCount = Math.max(1, lines.length);
  const finalLineCount = Math.max(minRows, calculatedLineCount);

  return {
    lineCount: finalLineCount,
    height: finalLineCount * lineHeight,
    lines,
  };
}
