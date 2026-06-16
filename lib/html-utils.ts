export function extractMovementIdsFromHtml(html: string): string[] {
  if (!html) return [];

  const movementIds: string[] = [];
  const regex = /data-id="([^"]+)"/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    movementIds.push(match[1]);
  }

  return movementIds;
}
