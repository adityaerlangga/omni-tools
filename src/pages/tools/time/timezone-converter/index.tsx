import { Box } from '@mui/material';
import { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextResult from '@components/result/ToolTextResult';
import { GetGroupsType } from '@components/options/ToolOptions';
import { CardExampleType } from '@components/examples/ToolExamples';
import SelectWithDesc from '@components/options/SelectWithDesc';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import { convertTimezone } from './service';
import { useTranslation } from 'react-i18next';
import { COMMON_TIMEZONES, InitialValuesType } from './types';

const initialValues: InitialValuesType = {
  dateTime: '',
  fromTimezone: 'UTC',
  toTimezone: 'America/New_York'
};

const timezoneOptions = COMMON_TIMEZONES.map((tz) => ({
  label: tz,
  value: tz
}));

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'UTC to New York',
    description:
      'Convert a UTC datetime to Eastern Time (America/New_York). During daylight saving time, New York is UTC−4.',
    sampleOptions: {
      dateTime: '2024-07-18 12:00:00',
      fromTimezone: 'UTC',
      toTimezone: 'America/New_York'
    },
    sampleResult: '2024-07-18 08:00:00 EDT'
  },
  {
    title: 'Los Angeles to Tokyo',
    description:
      'Convert a morning meeting in Los Angeles to the corresponding time in Tokyo.',
    sampleOptions: {
      dateTime: '2024-01-15 09:00:00',
      fromTimezone: 'America/Los_Angeles',
      toTimezone: 'Asia/Tokyo'
    },
    sampleResult: '2024-01-16 02:00:00 JST'
  },
  {
    title: 'London to Sydney',
    description: 'Convert an afternoon time in London to Sydney local time.',
    sampleOptions: {
      dateTime: '2024-03-10 15:30:00',
      fromTimezone: 'Europe/London',
      toTimezone: 'Australia/Sydney'
    },
    sampleResult: '2024-03-11 02:30:00 AEDT'
  }
];

export default function TimezoneConverter({ title }: ToolComponentProps) {
  const { t } = useTranslation('time');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType) => {
    setResult(convertTimezone(values));
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('timezoneConverter.optionsTitle'),
      component: (
        <Box>
          <TextFieldWithDesc
            value={values.dateTime}
            onOwnChange={(val) => updateField('dateTime', val)}
            description={t('timezoneConverter.dateTimeDescription')}
            placeholder="YYYY-MM-DD HH:mm:ss"
          />
          <SelectWithDesc
            selected={values.fromTimezone}
            options={timezoneOptions}
            onChange={(value) => updateField('fromTimezone', value)}
            description={t('timezoneConverter.fromTimezone')}
          />
          <SelectWithDesc
            selected={values.toTimezone}
            options={timezoneOptions}
            onChange={(value) => updateField('toTimezone', value)}
            description={t('timezoneConverter.toTimezone')}
          />
        </Box>
      )
    }
  ];

  return (
    <ToolContent
      title={title}
      inputComponent={null}
      resultComponent={
        <ToolTextResult
          title={t('timezoneConverter.resultTitle')}
          value={result}
        />
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={getGroups}
      compute={compute}
      toolInfo={{
        title: t('timezoneConverter.toolInfo.title'),
        description: t('timezoneConverter.toolInfo.description')
      }}
    />
  );
}
