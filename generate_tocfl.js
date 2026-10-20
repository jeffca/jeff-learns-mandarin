console.log("begin")
const fs = require('fs');
const cedict = require('cc-cedict');

console.log("hi")

const sampleWords = [
  { trad: '我', level: 1 },
  { trad: '你', level: 1 },
  { trad: '台北', level: 1 },
  { trad: '台北101', level: 1 },
  { trad: '計程車', level: 1 },
  { trad: '飯店', level: 1 },
  { trad: '公車', level: 1 },
  { trad: '捷運', level: 1 },
  { trad: '夜市', level: 1 },
  { trad: '珍珠奶茶', level: 1 }
];

let csvContent = "Traditional,Pinyin,English,Level\n";

sampleWords.forEach(w => {
  const match = cedict.getByTraditional(w.trad);
  let pinyin = '';
  let english = '';

  if (match && match.length > 0) {
    pinyin = match[0].pinyin;
    english = match[0].english.join('; ').replace(/"/g, '""');
  }

  csvContent += `"${w.trad}","${pinyin}","${english}","${w.level}"\n`;
});

fs.writeFileSync('vocab.csv', csvContent, 'utf8');
console.log('Created vocab.csv successfully!');