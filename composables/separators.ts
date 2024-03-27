const EMPTY_SPACE = ' '
const modeSeparators = [
  {
    label: 'numbers',
    value: '<RANDOM_NUMBERS>',
    symbol: 'XX',
  },
  {
    label: 'custom',
    value: '<CUSTOM>',
    symbol: 'X',
  },
] as const

const spaceSeparators = [{
  label: 'space',
  value: 'space',
  symbol: EMPTY_SPACE,
}, {
  label: 'none',
  value: 'none',
  symbol: '',
}] as const

const symbolSeparators = [
  {
    label: 'dash',
    value: 'dash',
    symbol: '-',
  },
  {
    label: 'period',
    value: 'period',
    symbol: '.',
  },
  {
    label: 'comma',
    value: 'comma',
    symbol: ',',
  },
  {
    label: 'semicolon',
    value: 'semicolon',
    symbol: ';',
  },
  {
    label: 'color',
    value: 'color',
    symbol: ':',
  },
  {
    label: 'hash',
    value: 'hash',
    symbol: '#',
  },
  {
    label: 'asterisk',
    value: 'asterisk',
    symbol: '*',
  },
  {
    label: 'quotation mark',
    value: 'quotation-mark',
    symbol: '"',
  },
  {
    label: 'apostrophe',
    value: 'apostrophe',
    symbol: '\'\'',
  },
  {
    label: 'backtick',
    value: 'backtick',
    symbol: '`',
  },
  {
    label: 'at',
    value: 'at',
    symbol: '@',
  },
  {
    label: 'ampersand',
    value: 'ampersand',
    symbol: '&',
  },
  {
    label: 'percent',
    value: 'percent',
    symbol: '%',
  },
  {
    label: 'tilde',
    value: 'tilde',
    symbol: '~',
  },
  {
    label: 'dollar',
    value: 'usd-symbol',
    symbol: '$',
  },
  {
    label: 'euro',
    value: 'euro-symbol',
    symbol: '€',
  },
  {
    label: 'pound',
    value: 'gbp-symbol',
    symbol: '£',
  },
  {
    label: 'slash',
    value: 'slash',
    symbol: '/',
  },
  {
    label: 'backslash',
    value: 'backslash',
    symbol: '\'',
  },
  {
    label: 'pipe',
    value: 'pipe',
    symbol: '|',
  },
  {
    label: 'question',
    value: 'question-mark',
    symbol: '?',
  },
  {
    label: 'exclamation',
    value: 'exclamation-mark',
    symbol: '!',
  },
  {
    label: 'plus',
    value: 'plus',
    symbol: '+',
  },
  {
    label: 'equals',
    value: 'equals',
    symbol: '=',
  },
  {
    label: 'less than',
    value: 'less-than',
    symbol: '<',
  },
  {
    label: 'greater than',
    value: 'greater-than',
    symbol: '>',
  },
] as const

const separatorOptions = [
  ...spaceSeparators,
  ...modeSeparators,
  ...symbolSeparators,
] as const

export type SeparatorOption = typeof separatorOptions[number]

export type SeparatorValue = typeof separatorOptions[number]['value']

export const useSeparators = () => {
  return {
    EMPTY_SPACE,
    modeSeparators,
    spaceSeparators,
    symbolSeparators,
    separatorOptions,
  }
}
