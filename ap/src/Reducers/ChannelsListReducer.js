import { channelsApi } from "../Api/channelsApi";
import { notification } from "antd";

const SET_CHANNELLS = "SET_CHANNELLS";

let initialChannelsListState = {
    channels: [
      {
        channelId: "",
        channelName: "",
        serverID: "",
        serverName: "",
        deleteTime: Date(),
      }
    ],
    pagination: {
      Page: 0,
      Number: 0,
      PageCount: 0,
      NumberCount: 0
    }
  }

const channelsListReducer = (state = initialChannelsListState, action) => {
    let newState = {...state};
    switch(action.type){
        case SET_CHANNELLS:
            newState.channels = action.Channels;
            newState.pagination.Page = action.Page;
            newState.pagination.Number = action.Number;
            newState.pagination.PageCount = action.PageCount;
            newState.pagination.NumberCount = action.NumberCount;
            return newState;
        default:
            return newState;
    }
}

export function getChannelsListActionCreator(data){
    return {type: SET_CHANNELLS, Channels: data.channels, Page: data.page, Number: data.number, PageCount: data.pageCount, NumberCount: data.numberCount}
}

export function getChannelsListThunkCreator(queryParams, navigate) {
    return (dispatch) => {
        return channelsApi.getChannels(queryParams, navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(getChannelsListActionCreator(data));
        })
    }
}

export function rewiveChannelThunkCreator(data, navigate) {
    return (dispatch) => {
        return channelsApi.rewiveChannel(data, navigate)
            .then(response => {
                if (response !== null) {
                    window.location.reload();
                }
            });
    };
}

export default channelsListReducer;