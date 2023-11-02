import React from 'react'

export const ParseText = (text) => {

  const lines = text.trim().split('\n');
  const result = {};
  let currentKey = '';
  let currentObj = {};

  for (let line of lines) {
    if (line.startsWith('## ')) {
      currentKey = line.substring(3);
      result[currentKey] = {};
      currentObj = result[currentKey];
    } else if (line.includes(' > ')) {
      const [key, value] = line.split(' > ');
      currentObj[key] = value;
    } else if (line.startsWith('- ')) {
      if (!currentObj.content) {
        currentObj.content = '';
      }
      currentObj.content += line + '\n';
    }
  }
  return result;
}

export default ParseText