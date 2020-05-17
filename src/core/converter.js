import lodash from "lodash";

export function convertTimeToString(numToConvert) {
  const splitString = numToConvert.toString().split("");
  while (splitString.length < 8) {
    splitString.unshift("0");
  }
  const chunkedArray = lodash.chunk(splitString, 2);
  const remadeNumber = chunkedArray
    .map((num, index) => {
      if (index === 3) {
        return `${lodash.flatten(num)}`;
      }
      if (index === 2) {
        return `${lodash.flatten(num)}.`;
      }
      return `${lodash.flatten(num)}:`;
    })
    .join("")
    .replace(/,/gi, "");
  return remadeNumber;
}

export function convertStringTime(stringToConver) {
  return parseInt(stringToConver.split(/[.:]/).join("")) || 0;
}
