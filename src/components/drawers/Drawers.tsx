import { useAppSelector } from '../../app/hooks'
import { selectDrawerToggleType } from '../../app/slice/drawerToggle/drawerToggleTypeSlice'
import { DRAWER_TOGGLE_TYPE } from '../../common/constants'
import { Drawer } from '@mui/material';
import UpdateMasterForm from '../forms/UpdateMasterForm';


const Drawers = () => {
    const { type, masterItem } = useAppSelector(selectDrawerToggleType)
  return (
    <div>        
      <Drawer anchor="bottom" open={type === DRAWER_TOGGLE_TYPE.UPDATE_MASTER_ITEM || type === DRAWER_TOGGLE_TYPE.ADD_MASTER_ITEM}>
                     <UpdateMasterForm />
                 </Drawer>
                 </div>
  )
}

export default Drawers;