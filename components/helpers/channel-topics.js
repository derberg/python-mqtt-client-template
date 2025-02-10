import filenamify from 'filenamify';

/**
 * Converts a channel address into a safe filename.
 * - Splits the address by '/' and formats each part to lowercase.
 * - Uses `filenamify` to remove invalid filename characters.
 * 
 * @param {string} channelAddress - The original channel address.
 * @returns {string} A sanitized and formatted filename.
 */

export function convertChannelToFilename(channelAddress) {
  if (!channelAddress) return '';

  const formatted = channelAddress
    .split('/').map(word => word.charAt(0).toLowerCase() + word.slice(1)).join('');

  return filenamify(formatted, { replacement: '-', maxLength: 255 });
}
