import {OPEN_DRAWER_MENU} from '../../constants/constants'

const INITIAL_STATE = {
    isSidebar: false,
    drawerWidth: 240
}

export default function sidebarReducer(state = INITIAL_STATE, action) {
    switch(action.type){
        case OPEN_DRAWER_MENU: {
            return {...state, isSidebar: action.isSidebar}
        }
        default: {
            return {...state}
        }
    }
}

