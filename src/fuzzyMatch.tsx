export default function fuzzyMatch(searchString: string, input: string) {
  var cleanedSearchString = searchString.replace(/\s/g,'').toLowerCase();
  var cleanedInput = input.trim().toLowerCase();
  var searchArr = cleanedSearchString.split('');
  var inputArr = cleanedInput.split('');
  var searchIndex = 0;
  var inputIndex = 0;
  var letterMatchMap = [];
  var hasMatch = false;
  while (searchIndex < searchArr.length) {
    var searchLetter = searchArr[searchIndex];
    while (inputIndex < inputArr.length) {
      var inputLetter = inputArr[inputIndex];
      if (searchLetter === inputLetter) {
        hasMatch = true;
        letterMatchMap.push(inputIndex);
        inputIndex += 1;
        break;
      }
      inputIndex += 1;
    }
    searchIndex += 1;
  }
  return {hasMatch, letterMatchMap, matchCount: letterMatchMap.length || 0};
}