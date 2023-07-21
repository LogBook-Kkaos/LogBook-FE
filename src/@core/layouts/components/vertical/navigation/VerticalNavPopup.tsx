// ** React Imports
import React, { ElementType, ReactNode, useState, useCallback } from 'react'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton'

// ** Configs Import
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { NavPopup } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'

// ** Custom Components Imports
import UserIcon from 'src/layouts/components/UserIcon'

// ** Component Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'
import NotificationPopup from 'src/views/notification/NotificationPopup'
import ChattingPopup from 'src/views/chatting/ChattingPopup'
import AddProjectPopup from 'src/views/add-project/AddProjectPopup'

interface Props {
    item: NavPopup
    settings: Settings
}

// ** Styled Components
const MenuNavLink = styled(ListItemButton)<
    ListItemButtonProps & { component?: ElementType; target?: '_blank' | undefined }
>(({ theme }) => ({
    width: '100%',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    color: theme.palette.text.primary,
    padding: theme.spacing(2.25, 3.5),
    transition: 'opacity .25s ease-in-out',
    '&.active, &.active:hover': {
        boxShadow: theme.shadows[3],
        backgroundImage: `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.main} 94%)`
    },
    '&.active .MuiTypography-root, &.active .MuiSvgIcon-root': {
        color: `${theme.palette.common.white} !important`
    }
}))

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'opacity .25s ease-in-out',
    ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
})

const VerticalNavPopup = ({ item }: Props) => {

    const IconTag: ReactNode = item.icon

    // ** States
    const [isOpen, setIsOpen] = useState(false);

    const handlePopupToggle = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const contentMap: Record<string, JSX.Element> = {
        'Notification': (
            <NotificationPopup handlePopupClose={handlePopupToggle} />
        ),
        'Chatting':(
            <ChattingPopup handlePopupClose={handlePopupToggle} />
        ),
        'Project Add':(
            <AddProjectPopup
            isOpen={isOpen}
            onClose={handlePopupToggle}
            />
        )
    }

    return (
        <BlankLayout>
        <ListItem
            disablePadding
            className='nav-link'
            disabled={item.disabled || false}
            sx={{ mt: 1.5, px: '0 !important' }}
        >
        <MenuNavLink
            component="div"
            onClick={handlePopupToggle}
            sx={{
                pl: 5.5,
                ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
            }}
        >
        <ListItemIcon
            sx={{
                mr: 2.5,
                color: 'text.primary',
                transition: 'margin .25s ease-in-out'
            }}
        >
            <UserIcon icon={IconTag} />
        </ListItemIcon>
        <MenuItemTextMetaWrapper>
            <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item.popupTitle}</Typography>
            {item.badgeContent ? (
                <Chip
                    label={item.badgeContent}
                    color={item.badgeColor || 'primary'}
                    sx={{
                        height: 20,
                        fontWeight: 500,
                        marginLeft: 1.25,
                        '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                    }}
                />
            ) : null}
        </MenuItemTextMetaWrapper>
        </MenuNavLink>
        </ListItem>
        {isOpen && contentMap[item.popupTitle]}
        </BlankLayout>
    )
}

export default VerticalNavPopup
