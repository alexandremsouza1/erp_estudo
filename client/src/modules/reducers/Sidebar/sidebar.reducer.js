import {OPEN_DRAWER_MENU} from '../../constants/constants'

let initialState = {
    isSidebar: false
}

export default function sidebarReducer(state = initialState, action) {
    switch(action.type){
        case OPEN_DRAWER_MENU: {
            return {...state, isSidebar: action.isSidebar}
        }
        default: {
            return {...state}
        }
    }
}

