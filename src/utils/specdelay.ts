export const delay = (milisec: number) => new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milisec);
})


// const reverseLogic = (arr: ReadonlyArray<TString>): ReadonlyArray<TString> => {
//   const length = arr.length;
//   const arrNew = [...arr];
//   let startIndex = 0;
//   let endIndex = length - 1;
//   while (startIndex <= endIndex) {
//     console.log(`${startIndex} --- ${endIndex}`);
//     const tempElement = arrNew[startIndex];
//     arrNew[startIndex] = arrNew[endIndex];
//     arrNew[endIndex] = tempElement;
//     startIndex++;
//     endIndex--;
//   }

//   return arrNew;
// }

export {};