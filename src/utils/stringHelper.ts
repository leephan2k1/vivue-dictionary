//ref: https://www.tunglt.com/2018/11/bo-dau-tieng-viet-javascript-es6
export function removeAccents(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

//example: https://codesandbox.io/s/k20x3ox31o?file=/src/index.js
//@ts-ignore
export const findChunksAtBeginningOfWords = ({ searchWords, textToHighlight }) => {
  //@ts-ignore
  const chunks = [];
  const textLow = textToHighlight.toLowerCase();
  // Match at the beginning of each new word
  // New word start after whitespace or - (hyphen)
  const sep = /[-\s]+/;

  // Match at the beginning of each new word
  // New word start after whitespace or - (hyphen)
  const singleTextWords = textLow.split(sep);

  // It could be possible that there are multiple spaces between words
  // Hence we store the index (position) of each single word with textToHighlight
  let fromIndex = 0;
  //@ts-ignore
  const singleTextWordsWithPos = singleTextWords.map((s) => {
    const indexInWord = textLow.indexOf(s, fromIndex);
    fromIndex = indexInWord;
    return {
      word: s,
      index: indexInWord
    };
  });

  // Add chunks for every searchWord
  //@ts-ignore
  searchWords.forEach((sw) => {
    const swLow = sw.toLowerCase();
    // Do it for every single text word
    //@ts-ignore
    singleTextWordsWithPos.forEach((s) => {
      if (s.word.startsWith(swLow)) {
        const start = s.index;
        const end = s.index + swLow.length;
        chunks.push({
          start,
          end
        });
      }
    });

    // The complete word including whitespace should also be handled, e.g.
    // searchWord='Angela Mer' should be highlighted in 'Angela Merkel'
    if (textLow.startsWith(swLow)) {
      const start = 0;
      const end = swLow.length;
      chunks.push({
        start,
        end
      });
    }
  });

  //@ts-ignore
  return chunks;
};
