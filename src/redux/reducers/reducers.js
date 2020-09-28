const defaultState = {
    eventData: []
}

function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'Get_Data': return {
            ...state,
            eventData: action.getData
        }

        case 'Set_Data': return {
            ...state,
            eventData: action.setData
        }
        case 'Filter_Data': return {
            ...state,
            eventData: action.filterData
        }
        default: return state;
    }
}
export default reducer;