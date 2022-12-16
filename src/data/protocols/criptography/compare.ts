export interface Compare {
  compare: (value: string, valueToCompare: string) => Promise<boolean>
}