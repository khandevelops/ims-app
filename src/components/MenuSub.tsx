import { ChangeEvent } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../app/hooks';
import { getMasterItemsFilteredThunk } from '../app/master/masterItemSlice';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '25rem'
        }
    }
}));

const MenuSub = () => {
    const dispatch = useAppDispatch();

    const handlekeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(getMasterItemsFilteredThunk({ page: 0, keyword: event.target.value }));
    };

    return (
        <AppBar position="static" elevation={5} sx={{ alignItems: 'center', backgroundColor: '#1347a4'}}>
            <Toolbar variant="dense">
                <Search onChange={handlekeywordChange}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                </Search>

            </Toolbar>
        </AppBar>
    );
};

export default MenuSub;
