import * as React from 'react';
import { SxProps, Theme, styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import MuiAvatar from '@mui/material/Avatar';

export interface AvatarProps {
  text: string;
  isOnline?: boolean;
  sx?: SxProps<Theme> | undefined;
  src?: string;
  alt?: string;
}

const StyledBadge = styled(Badge)(({ theme, color }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: color,
    color,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

const getFirstLetter = (username: string = '') => {
  return username.slice(0, 1).toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, text, sx, isOnline }) => {
  return (
    <>
      {isOnline != null ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color={isOnline ? 'success' : 'error'}
        >
          <MuiAvatar alt={alt} src={src} sx={sx}>
            {getFirstLetter(text)}
          </MuiAvatar>
        </StyledBadge>
      ) : (
        <MuiAvatar alt={alt} src={src} sx={sx}>
          {getFirstLetter(text)}
        </MuiAvatar>
      )}
    </>
  );
};

export default Avatar;
