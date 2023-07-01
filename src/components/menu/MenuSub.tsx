import { ChangeEvent } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { selectTotalAmount } from '../../app/slice/totalAmount';
import { filterMasterItemsThunk } from '../../app/slice/master/masterItemsFilterSlice';

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
    const { totalAmount } = useAppSelector(selectTotalAmount);
    const { state } = useLocation();

    const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterMasterItemsThunk({ keyword: event.target.value, page: 0 }));
    };

    return (
        <AppBar
            position="static"
            elevation={5}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#1347a4'
            }}>
            <Box sx={{ width: 150 }}></Box>
            <Toolbar variant="dense" sx={{ justifySelf: 'center' }}>
                <Search onChange={handleKeywordChange}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                </Search>
            </Toolbar>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: 150 }}>
                {(state === 'extractions' ||
                    state === 'mass-spec' ||
                    state === 'rd' ||
                    state === 'screening' ||
                    state === 'shipping' ||
                    state === 'specimen-processing' ||
                    state === 'qc-internal-standards' ||
                    state === 'quality' ||
                    state === 'store-room') && (
                    <Box sx={{ border: '2px solid white', borderRadius: 1, padding: '0.25rem 0.65rem' }}>
                        <Typography sx={{ fontWeight: 900 }}>${totalAmount.toFixed(2)}</Typography>
                    </Box>
                )}
            </Box>
        </AppBar>
    );
};

export default MenuSub;
