import { Box, Grid, Typography } from '@mui/material';
import ToolCard from './ToolCard';
import { IconifyIcon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { FullI18nKey } from '../../i18n';

export interface ToolCardProps {
  title: FullI18nKey;
  description: FullI18nKey;
  link: string;
  icon: IconifyIcon | string;
}

interface AllToolsProps {
  title: string;
  toolCards: ToolCardProps[];
}

export default function AllTools({ title, toolCards }: AllToolsProps) {
  const { t } = useTranslation();
  return (
    <Box mt={4} mb={8}>
      <Typography variant="h6" fontWeight={700} mb={2} component="h2">
        {title}
      </Typography>
      <Grid container spacing={1.5}>
        {toolCards.map((card, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <ToolCard
              //@ts-ignore
              title={t(card.title)}
              //@ts-ignore
              description={t(card.description)}
              link={card.link}
              icon={card.icon}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
