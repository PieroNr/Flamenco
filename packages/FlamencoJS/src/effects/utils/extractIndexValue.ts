export function extractIndexValue({index, elementNumber, data} : {index:number, elementNumber: number, data: Uint8Array}) {
  return data[index * Math.round(127 / elementNumber)];
}