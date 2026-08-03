import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import SelectWithDesc from '@components/options/SelectWithDesc';
import { GetGroupsType } from '@components/options/ToolOptions';
import { CardExampleType } from '@components/examples/ToolExamples';
import { useTranslation } from 'react-i18next';
import { formatTotp } from './service';
import { InitialValuesType } from './types';

const initialValues: InitialValuesType = {
  digits: '6',
  period: '30'
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: '6-digit TOTP',
    description: 'Standard authenticator-app style 6-digit codes.',
    sampleText: 'JBSWY3DPEHPK3PXP',
    sampleResult: 'Code: 123456\nRemaining: 30s',
    sampleOptions: { digits: '6', period: '30' }
  },
  {
    title: '8-digit TOTP',
    description: 'Generate longer codes with an 8-digit setting.',
    sampleText: 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ',
    sampleResult: 'Code: 94287082\nRemaining: 1s',
    sampleOptions: { digits: '8', period: '30' }
  },
  {
    title: 'Custom period',
    description: 'Use a 60-second time step.',
    sampleText: 'JBSWY3DPEHPK3PXP',
    sampleResult: 'Code: 123456\nRemaining: 60s',
    sampleOptions: { digits: '6', period: '60' }
  }
];

export default function TotpGenerator({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [options, setOptions] = useState<InitialValuesType>(initialValues);
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      const text = await formatTotp(input, options);
      if (!cancelled) setResult(text);
    };
    void tick();
    const id = window.setInterval(() => void tick(), 1000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [input, options]);

  const compute = (values: InitialValuesType) => {
    setOptions(values);
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('totpGenerator.optionsTitle'),
      component: (
        <Box>
          <SelectWithDesc
            selected={values.digits}
            options={[
              { label: t('totpGenerator.digits6'), value: '6' },
              { label: t('totpGenerator.digits8'), value: '8' }
            ]}
            onChange={(value) => updateField('digits', value)}
            description={t('totpGenerator.digitsDescription')}
          />
          <TextFieldWithDesc
            description={t('totpGenerator.periodDescription')}
            value={values.period}
            onOwnChange={(val) => updateField('period', val)}
            type="number"
            inputProps={{ min: 1, max: 300 }}
          />
        </Box>
      )
    }
  ];

  return (
    <ToolContent
      title={title}
      input={input}
      inputComponent={
        <ToolTextInput
          value={input}
          onChange={setInput}
          title={t('totpGenerator.inputTitle')}
        />
      }
      resultComponent={
        <ToolTextResult value={result} title={t('totpGenerator.resultTitle')} />
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={getGroups}
      setInput={setInput}
      compute={compute}
      toolInfo={{
        title: t('totpGenerator.toolInfo.title'),
        description: longDescription
      }}
    />
  );
}
