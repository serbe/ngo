import React from 'react';

export const filterArrayString = (values: string[]): string[] => {
  return values.filter((value: string) => value !== '');
};

export const filterArrayNumber = (values: string[]): number[] => {
  return values.map((value: string) => Number(value)).filter((value: number) => value !== 0);
};

export const latrus = (str: string): string => {
  const lat = '`qwertyuiop[]asdfghjkl;\'zxcvbnm,.~QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>';
  const rus = 'ёйцукенгшщзхъфывапролджэячсмитьбюЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ';
  let word = '';
  for (let i = 0, L = str.length; i < L; i++) {
    const letter = str[i];
    const pos = lat.indexOf(letter);
    if (i === 0 && pos === -1) {
      return '';
    }
    word += pos === -1 ? letter : rus[pos];
  }
  return word;
};

// export const stringNoNull = (value?: string): string => {
//   return value || '';
// };

// export const numberNoNull = (value?: number): number => {
//   return value || 0;
// };

export const addEmptyString = (values?: string[]): string[] => {
  let list: string[] = [];
  if (values) {
    list = values.filter((value) => value !== '');
  }
  list.push('');
  return list;
};

export const numberToString = (values?: number[]): string[] => {
  let list: string[] = [];
  if (values) {
    list = values.map((value) => value.toString());
  }
  return list;
};

export const splitStrings = (items?: string[]): JSX.Element => (
  <>
    {items &&
      items.map((arrayItem: string, index: number) => <div key={`div${index}`}>{arrayItem}</div>)}
  </>
);

export const splitNumbers = (items?: number[]): JSX.Element => (
  <>
    {items &&
      items.map((arrayItem: number, index: number) => <div key={`div${index}`}>{arrayItem}</div>)}
  </>
);

const diffMonth = (month: number, date?: Date): Date => {
  const newDate = date || new Date();
  newDate.setMonth(newDate.getMonth() - month);
  return newDate;
};

export const trClass = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (date < new Date()) {
    return 'tr-green';
  }
  const newDate = diffMonth(1);
  if (date < newDate) {
    return 'tr-red';
  }
  return 'tr-yellow';
};

export const tinyDate = (date: string): string => {
  if (date.length === 10) {
    return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(2, 4)}`;
  }
  return date;
};