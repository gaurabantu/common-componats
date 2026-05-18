export function feedbackCls(...chunks: Array<string | false | undefined>): string {
  return chunks.filter(Boolean).join(" ");
}
