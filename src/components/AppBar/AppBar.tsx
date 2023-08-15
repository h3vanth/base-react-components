import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import Avatar, { AvatarProps } from '../Avatar';

interface Page {
  name: string;
  onClick: () => void;
}

export interface AppBarProps {
  isAuth: boolean;
  appBarLogo: React.ReactNode;
  avatarProps: AvatarProps;
  pages: Page[];
}

const AppBar: React.FC<AppBarProps> = ({
  isAuth,
  appBarLogo,
  avatarProps,
  pages,
}) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <MuiAppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <MenuBookIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 'auto',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {appBarLogo}
            </Typography>

            {isAuth && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar text={avatarProps.text} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {pages.map(({ name, onClick }) => (
                    <MenuItem key={name} onClick={onClick}>
                      <Typography textAlign="center">{name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </MuiAppBar>
    </>
  );
};
export default AppBar;
