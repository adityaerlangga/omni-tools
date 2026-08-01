import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { ToolCardProps } from './AllTools';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function ToolCard({
  title,
  description,
  link,
  icon
}: ToolCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      elevation={0}
      sx={{
        borderRadius: 1,
        height: '100%',
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
      <CardActionArea
        onClick={() => navigate(link)}
        sx={{ height: '100%', alignItems: 'stretch' }}
      >
        <CardContent sx={{ p: 2, height: '100%', '&:last-child': { pb: 2 } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={1}
            mb={1.25}
          >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(28,175,255,0.12)'
                      : 'rgba(0,130,201,0.1)',
                  color: 'primary.main',
                  flexShrink: 0
                }}
              >
                <Icon icon={icon} width={20} />
              </Box>
              <Typography variant="subtitle1" fontWeight={700} component="h2">
                {title}
              </Typography>
            </Stack>
            <ChevronRightIcon sx={{ color: 'text.secondary', mt: 0.25 }} />
          </Stack>
          <Typography variant="body2" color="text.secondary" lineHeight={1.5}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
