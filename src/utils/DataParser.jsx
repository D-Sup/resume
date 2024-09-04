export default function DataParser(text) {
  const lines = text.trim().split("\n");
  const result = {};
  let currentKey = "";
  let currentObj = {};

  function isListKey(key) {
    return key === "Projects" || key === "Experience" || key === "Education" || key === "Completion" || key === "Skills";
  }


  for (let line of lines) {

    if (line.startsWith("## ")) {
      currentKey = line.substring(3);
      result[currentKey] = isListKey(currentKey) ? [] : {};
      currentObj = result[currentKey];
    }

    else if (line.includes(" > ")) {
      const [key, value] = line.split(" > ");
      if (isListKey(currentKey)) {
        const lastIndex = currentObj.length - 1;
        currentObj[lastIndex] && !currentObj[lastIndex][key] ?
          currentObj[lastIndex][key] = value :
          currentObj.push({ [key]: value });
      } else {
        currentObj[key] = value;
      }
    }

    else if (line.startsWith("- ") || line.length > 0) {
      if (isListKey(currentKey)) {
        currentObj[currentObj.length - 1].content += line + "\n";
      } else {
        currentObj.introduction += line + "\n";
      }
    }
  }

  return result;
}
