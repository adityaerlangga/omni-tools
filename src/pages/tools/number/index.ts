import { tool as numberRandomPortGenerator } from './random-port-generator/meta';
import { tool as numberRandomNumberGenerator } from './random-number-generator/meta';
import { tool as numberSum } from './sum/meta';
import { tool as numberGenerate } from './generate/meta';
import { tool as numberArithmeticSequence } from './arithmetic-sequence/meta';
import { tool as numberByteConverter } from './byte-converter/meta';
import { tool as numberColorConverter } from './color-converter/meta';
import { tool as numberContrastChecker } from './contrast-checker/meta';
import { tool as numberUnitConverter } from './unit-converter/meta';
import { tool as numberChmodCalculator } from './chmod-calculator/meta';
import { tool as numberHttpStatusCodes } from './http-status-codes/meta';
import { tools as genericCalcTools } from './generic-calc/meta';

export const numberTools = [
  numberSum,
  numberGenerate,
  numberArithmeticSequence,
  numberRandomPortGenerator,
  numberRandomNumberGenerator,
  numberByteConverter,
  numberColorConverter,
  numberContrastChecker,
  numberUnitConverter,
  numberChmodCalculator,
  numberHttpStatusCodes,
  ...genericCalcTools
];
