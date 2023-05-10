import AdminMenu from './MenuAdmin';
import { useAppSelector } from '../app/hooks';
import MenuSub from './MenuSub';
import { Box } from '@mui/material';
import MenuDepartment from './MenuDepartment';
import { selectProfileDetail } from '../app/profileDetail/profileDetailSlice';
import { role } from '../common/constants';

export default function NavbarTop() {
    const profileDetailSelector = useAppSelector(selectProfileDetail);

    return (
        <Box>

        </Box>
    );
}
