import { usersApi } from "../Api/usersApi";
import { notification } from "antd";

const SET_USERS = "SET_USERS";
const SET_ROLES = "SET_ROLES";

let initialUsersListState = {
    users: [
      {
        id: "",
        mail: "",
        accountName: "",
        accountTag: "",
        accountCreateDate: Date(),
        notifiable: false,
        friendshipApplication: false,
        nonFriendMessage: false,
        icon: {
            fileId: "",
            fileName: "",
            fileType: "",
            fileSize: 0,
            deleted: false
        },
        systemRoles: [
            {
                id: "",
                name: "",
                type: 0
            }
        ]
      }
    ],
    pagination: {
      Page: 0,
      Number: 0,
      PageCount: 0,
      NumberCount: 0
    },
    rolesShort: [
        {
            id: "",
            name: "",
            type: 0,
            childRoles: []
        }
    ]
  }

const usersListReducer = (state = initialUsersListState, action) => {
    let newState = {...state};
    switch(action.type){
        case SET_USERS:
            newState.users = action.Users;
            newState.pagination.Page = action.Page;
            newState.pagination.Number = action.Number;
            newState.pagination.PageCount = action.PageCount;
            newState.pagination.NumberCount = action.NumberCount;
            return newState;
        case SET_ROLES:
            newState.roles = action.Roles;
            return newState;
        default:
            return newState;
    }
}

export function getUsersListActionCreator(data){
    return {type: SET_USERS, Users: data.users, Page: data.page, Number: data.number, PageCount: data.pageCount, NumberCount: data.numberCount}
}

export function getUsersListThunkCreator(queryParams, navigate) {
    return (dispatch) => {
        return usersApi.getUsers(queryParams, navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(getUsersListActionCreator(data));
        })
    }
}

export function getRolesShortListActionCreator(data){
    return {type: SET_ROLES, Roles: data.roles}
}

export function getRolesShortListThunkCreator(queryParams, navigate) {
    return (dispatch) => {
        return usersApi.getRolesShort(queryParams, navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(getRolesShortListActionCreator(data));
        })
    }
}

export function addRoleThunkCreator(data, navigate, resetState, closeModal) {
    return (dispatch) => {
        return usersApi.addRoles(data, navigate)
            .then(response => {
                if (response !== null) {
                    notification.success({
                        message: "Успех",
                        description: "Роль успешно добавлена"
                    });
                    closeModal();
                    resetState();
                    navigate("/users");
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);

                }
            });
    };
}

export function removeRoleThunkCreator(data, navigate) {
    return (dispatch) => {
        return usersApi.removeRole(data, navigate)
            .then(response => {
                if (response !== null) {
                    window.location.reload();
                }
            });
    };
}

export default usersListReducer;