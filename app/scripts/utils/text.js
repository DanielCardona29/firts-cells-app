export function normalizeUriString(string) {
  let result;
  const map = {
    '-': '_',
    'a': 'á|à|ã|â|À|Á|Ã|Â',
    'e': 'é|è|ê|É|È|Ê',
    'i': 'í|ì|î|Í|Ì|Î',
    'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
    'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
    'c': 'ç|Ç',
    'n': 'ñ|Ñ',
  };

  result = string.toLowerCase().replace(/[/|\\]/g, '-').replace(/ /g, '-');

  for (const pattern in map) {
    if (Object.prototype.hasOwnProperty.call(map, pattern)) {
      result = result.replace(new RegExp(map[pattern], 'g'), pattern);
    }
  }

  return result;
}
