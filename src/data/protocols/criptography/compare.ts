export interface Compare {
  compare: (data: string, dataToCompare: string) => Promise<boolean>
}
