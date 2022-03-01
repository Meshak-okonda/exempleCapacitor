import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { useAppDispatch } from "../hooks";
import { connexionClear } from "../redux/slice/userSlice";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import { GiExitDoor, GiSteeringWheel } from "react-icons/gi";
import {AiFillCar, AiFillControl} from "react-icons/ai";
import {RiAdminFill, RiDashboardFill} from "react-icons/ri";
import {GrVolumeControl} from "react-icons/gr";
import { FcStatistics } from "react-icons/fc";

const items = [
  {
    href: "/control",
    icon: <AiFillControl fontSize="small" />,
    title: "Controle",
  },
  {
    href: "/account",
    icon: <UserIcon fontSize="small" />,
    title: "Profile",
  },
];

export const DashboardSidebar = (props) => {
  const dispatch = useAppDispatch();
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );
  const deconnexion = async () => {
    await localStorage.removeItem("user");
    dispatch(connexionClear(''));
  };

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
          <Box sx={{ p: 3, display:"flex", justifyContent:'center' }} centered>
            <NextLink href="/control" passHref>
              <a>
                <Logo height={60} width={120} />
              </a>
            </NextLink>
          </Box>
        <Divider
          sx={{
            borderColor: "#FFFFFF",
            my: 1,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <NavItem
            icon={<GiExitDoor />}
            href="/"
            title="Deconnection"
            onClick={() => deconnexion()}
          />
        </Box>
      </Box>
    </>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
