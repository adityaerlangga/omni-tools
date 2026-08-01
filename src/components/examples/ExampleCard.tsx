import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExampleOptions from './ExampleOptions';
import { GetGroupsType } from '@components/options/ToolOptions';

export interface ExampleCardProps<T> {
  title: string;
  description: string;
  sampleText?: string;
  sampleResult: string;
  sampleOptions: T;
  changeInputResult: (newInput: string | undefined, newOptions: T) => void;
  getGroups: GetGroupsType<T> | null;
}

function SampleBlock({ value }: { value: string }) {
  return (
    <Box
      sx={{
        width: '100%',
        px: 1.25,
        py: 1,
        borderRadius: 1,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.default',
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        fontSize: 13,
        lineHeight: 1.5,
        color: 'text.primary',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        maxHeight: 120,
        overflow: 'auto'
      }}
    >
      {value}
    </Box>
  );
}

export default function ExampleCard<T>({
  title,
  description,
  sampleText,
  sampleResult,
  sampleOptions,
  changeInputResult,
  getGroups
}: ExampleCardProps<T>) {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      elevation={0}
      onClick={() => {
        changeInputResult(sampleText, sampleOptions);
      }}
      sx={{
        height: '100%',
        borderRadius: 1,
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 4px 16px rgba(28, 175, 255, 0.12)'
              : '0 4px 16px rgba(0, 130, 201, 0.12)'
        }
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          component="h3"
          mb={0.5}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>

        <Stack direction="column" alignItems="center" spacing={1.25}>
          {sampleText && <SampleBlock value={sampleText} />}
          <ArrowDownwardIcon
            sx={{ color: 'primary.main', fontSize: 20, opacity: 0.8 }}
          />
          <SampleBlock value={sampleResult} />
          <ExampleOptions options={sampleOptions} getGroups={getGroups} />
        </Stack>
      </CardContent>
    </Card>
  );
}
