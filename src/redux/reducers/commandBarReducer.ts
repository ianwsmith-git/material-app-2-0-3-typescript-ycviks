import * as types from '../../constants';

export type BarProps = {
      pageTitle: string;
        onSaveClick?: Function;
        onCancelClick? : Function;
        hide: boolean;
}
export type CommandBarStateType = {
props? : BarProps | undefined
};



export type SetupCommandBarType = {
    type: string;
    payload: CommandBarStateType;
};

export function setupCommandBar(pageTitle: string, onSaveClick: Function, onCancelClick : Function): SetupCommandBarType {
    return {
        type: types.COMMAND_BAR_SET,
        payload: { props : {
            pageTitle: pageTitle,
            onSaveClick: onSaveClick,
            onCancelClick: onCancelClick,
            hide: false,
        }
        }
    };
}

export function hideCommandBar(): SetupCommandBarType {
    return {
        type: types.COMMAND_BAR_HIDE,
        payload: {props: {hide: true, pageTitle: "", onSaveClick: undefined, onCancelClick: undefined}}

    };
}

export default function reducer(
    state = {},
    actions: SetupCommandBarType
): CommandBarStateType {
    switch (actions.type) {
        case types.COMMAND_BAR_SET:
            return {
                ...state,
                props : {
                pageTitle : actions.payload.props!.pageTitle,
                onSaveClick : actions.payload.props!.onSaveClick,
                onCancelClick: actions.payload.props!.onCancelClick,
                hide : actions.payload.props!.hide
                }
            };
        case types.COMMAND_BAR_HIDE:
            return {
                ...state,
                props : {
                pageTitle : "",
                onSaveClick : undefined,
                onCancelClick: undefined,
                hide : true               
                }
            };

        default:
            return {...state,
                props: {pageTitle : "", hide: true}
            }
    }
}
