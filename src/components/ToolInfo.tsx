import { Box, Stack, Typography, useTheme } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ContentCard } from './ui/ContentCard';

interface ExampleProps {
  title: string;
  description: string;
}

export default function ToolInfo({ title, description }: ExampleProps) {
  const theme = useTheme();

  return (
    <ContentCard
      sx={{
        mt: 3,
        p: { xs: 2, md: 2.5 },
        bgcolor:
          theme.palette.mode === 'dark'
            ? 'rgba(28,175,255,0.06)'
            : 'rgba(0,130,201,0.04)',
        borderColor:
          theme.palette.mode === 'dark'
            ? 'rgba(28,175,255,0.22)'
            : 'rgba(0,130,201,0.18)'
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(28,175,255,0.14)'
                : 'rgba(0,130,201,0.12)',
            color: 'primary.main'
          }}
        >
          <InfoOutlinedIcon fontSize="small" />
        </Box>
        <Box>
          <Typography fontSize={16} fontWeight={600} mb={0.75}>
            {title}
          </Typography>
          <Typography fontSize={14} color="text.secondary" lineHeight={1.6}>
            {description}
          </Typography>
        </Box>
      </Stack>
    </ContentCard>
  );
}
