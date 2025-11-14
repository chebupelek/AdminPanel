import { rolesApi } from "../Api/rolesApi";

const SET_ROLES = "SET_ROLES";

let initialRolesState = {
    roles: [
      {
        id: "",
        name: "",
        type: 0,
        childRoles: []
      }
    ]
  }

const rolesReducer = (state = initialRolesState, action) => {
    let newState = {...state};
    switch(action.type){
        case SET_ROLES:
            newState.roles = action.Roles;
            return newState;
        default:
            return newState;
    }
}

export function getRolesFullActionCreator(data){
    return {type: SET_ROLES, Roles: data.roles}
}

export function getRolesFullThunkCreator(navigate) {
    return (dispatch) => {
        return rolesApi.getRoles(navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(getRolesFullActionCreator(data));
        })
    }
}

export function createRoleThunkCreator(data, navigate) {
    return (dispatch) => {
        return rolesApi.createRole(data, navigate)
            .then(response => {
                if (response !== null) {
                    window.location.reload();
                }
            });
    };
}

export function updateRoleThunkCreator(data, navigate) {
    return (dispatch) => {
        return rolesApi.updateRole(data, navigate)
            .then(response => {
                if (response !== null) {
                    window.location.reload();
                }
            });
    };
}

export function deleteRoleThunkCreator(data, navigate) {
    return (dispatch) => {
        return rolesApi.deleteRole(data, navigate)
            .then(response => {
                if (response !== null) {
                    window.location.reload();
                }
            });
    };
}

export default rolesReducer;