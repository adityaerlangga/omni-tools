import { Box } from '@mui/material';
import { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { GetGroupsType } from '@components/options/ToolOptions';
import { CardExampleType } from '@components/examples/ToolExamples';
import SelectWithDesc from '@components/options/SelectWithDesc';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import { unitConverter } from './service';
import { useTranslation } from 'react-i18next';
import {
  InitialValuesType,
  UNITS_BY_CATEGORY,
  UnitCategory
} from './types';

const initialValues: InitialValuesType = {
  category: 'length',
  fromUnit: 'm',
  toUnit: 'cm',
  precision: 2
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Meters to Centimeters',
    description: 'Convert length values from meters to centimeters.',
    sampleText: `1
2.5
10`,
    sampleResult: `100
250
1000`,
    sampleOptions: {
      category: 'length',
      fromUnit: 'm',
      toUnit: 'cm',
      precision: 0
    }
  },
  {
    title: 'Celsius to Fahrenheit',
    description: 'Convert temperatures from Celsius to Fahrenheit.',
    sampleText: `0
100
-40`,
    sampleResult: `32
212
-40`,
    sampleOptions: {
      category: 'temperature',
      fromUnit: 'C',
      toUnit: 'F',
      precision: 0
    }
  },
  {
    title: 'Kilograms to Pounds',
    description: 'Convert weight from kilograms to pounds.',
    sampleText: `1
5
10`,
    sampleResult: `2.2
11.02
22.05`,
    sampleOptions: {
      category: 'weight',
      fromUnit: 'kg',
      toUnit: 'lb',
      precision: 2
    }
  }
];

export default function UnitConverter({ title }: ToolComponentProps) {
  const { t } = useTranslation('number');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, inputValue: string) => {
    setResult(unitConverter(inputValue, values));
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => {
    const units = UNITS_BY_CATEGORY[values.category];
    return [
      {
        title: t('unitConverter.optionsTitle'),
        component: (
          <Box>
            <SelectWithDesc
              selected={values.category}
              options={(
                Object.keys(UNITS_BY_CATEGORY) as UnitCategory[]
              ).map((cat) => ({
                label: t(`unitConverter.categories.${cat}`),
                value: cat
              }))}
              onChange={(value) => {
                const nextUnits = UNITS_BY_CATEGORY[value];
                updateField('category', value);
                updateField('fromUnit', nextUnits[0]);
                updateField('toUnit', nextUnits[1] ?? nextUnits[0]);
              }}
              description={t('unitConverter.categoryDescription')}
            />
            <SelectWithDesc
              selected={values.fromUnit}
              options={units.map((u) => ({ label: u, value: u }))}
              onChange={(value) => updateField('fromUnit', value)}
              description={t('unitConverter.fromUnit')}
            />
            <SelectWithDesc
              selected={values.toUnit}
              options={units.map((u) => ({ label: u, value: u }))}
              onChange={(value) => updateField('toUnit', value)}
              description={t('unitConverter.toUnit')}
            />
            <TextFieldWithDesc
              type="number"
              value={values.precision}
              onOwnChange={(val) => updateField('precision', Number(val))}
              description={t('unitConverter.precision')}
            />
          </Box>
        )
      }
    ];
  };

  return (
    <ToolContent
      title={title}
      input={input}
      setInput={setInput}
      inputComponent={
        <ToolTextInput
          title={t('unitConverter.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('unitConverter.resultTitle')}
          value={result}
        />
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={getGroups}
      compute={compute}
      toolInfo={{
        title: t('unitConverter.toolInfo.title'),
        description: t('unitConverter.toolInfo.description')
      }}
    />
  );
}
