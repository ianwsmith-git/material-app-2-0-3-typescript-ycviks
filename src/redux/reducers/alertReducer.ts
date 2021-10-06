import * as types from '../../constants';

export type AlertStateType = {
    showAlert : boolean;
  severity : string;
  message : string;
};

const initialState = {
  showAlert: false,
  severity: "",
  message: ""
};

export function showAlert(severity : string, message : string) : AlertStateType & {type : string} {
    return {
        type: types.ALERT_SHOW,
        showAlert: true,
        severity: severity,
        message: message
    };
}

export function hideAlert() : AlertStateType & {type : string} {
    return {
        type: types.ALERT_HIDE,
        showAlert: false,
        severity: "",
        message: ""
    };
}

export default function reducer(
  state = initialState,
  actions: AlertStateType & { type: string }
): AlertStateType {
  switch (actions.type) {
    case types.ALERT_SHOW:
      return {
        ...state,
        showAlert: actions.showAlert,
        severity: actions.severity,
        message: actions.message
      };
      case types.ALERT_HIDE:
        return {
          ...state,
          showAlert: actions.showAlert,
          severity: actions.severity,
          message: actions.message
        };
    default:
      return state;
  }
}
