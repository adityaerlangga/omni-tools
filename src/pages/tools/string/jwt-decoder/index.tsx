import React, { useState } from 'react';
import { Box } from '@mui/material';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import CheckboxWithDesc from '@components/options/CheckboxWithDesc';
import { GetGroupsType } from '@components/options/ToolOptions';
import { CardExampleType } from '@components/examples/ToolExamples';
import { useTranslation } from 'react-i18next';
import { decodeJwt } from './service';
import { InitialValuesType } from './types';

const sampleHeader = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '');
const samplePayload = btoa(
  JSON.stringify({ sub: '1234567890', name: 'John Doe', iat: 1516239022 })
)
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '');
const sampleJwt = `${sampleHeader}.${samplePayload}.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;

const initialValues: InitialValuesType = {
  prettyPrint: true
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Decode a JWT',
    description: 'Inspect the header and payload of a signed JWT.',
    sampleText: sampleJwt,
    sampleResult: JSON.stringify(
      {
        header: { alg: 'HS256', typ: 'JWT' },
        payload: { sub: '1234567890', name: 'John Doe', iat: 1516239022 },
        signature: 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      },
      null,
      2
    ),
    sampleOptions: { prettyPrint: true }
  },
  {
    title: 'Compact JSON output',
    description: 'Decode without pretty-printing.',
    sampleText: sampleJwt,
    sampleResult: JSON.stringify({
      header: { alg: 'HS256', typ: 'JWT' },
      payload: { sub: '1234567890', name: 'John Doe', iat: 1516239022 },
      signature: 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    }),
    sampleOptions: { prettyPrint: false }
  },
  {
    title: 'Invalid token',
    description: 'Invalid input is reported clearly without crashing.',
    sampleText: 'not.a.valid',
    sampleResult:
      'Invalid JWT: unable to decode header or payload (malformed Base64URL or JSON).',
    sampleOptions: { prettyPrint: true }
  }
];

export default function JwtDecoder({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, inputText: string) => {
    setResult(decodeJwt(inputText, values));
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('jwtDecoder.optionsTitle'),
      component: (
        <Box>
          <CheckboxWithDesc
            checked={values.prettyPrint}
            title={t('jwtDecoder.prettyPrint')}
            description={t('jwtDecoder.prettyPrintDescription')}
            onChange={(val) => updateField('prettyPrint', val)}
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
          title={t('jwtDecoder.inputTitle')}
        />
      }
      resultComponent={
        <ToolTextResult value={result} title={t('jwtDecoder.resultTitle')} />
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={getGroups}
      setInput={setInput}
      compute={compute}
      toolInfo={{
        title: t('jwtDecoder.toolInfo.title'),
        description: longDescription
      }}
    />
  );
}
