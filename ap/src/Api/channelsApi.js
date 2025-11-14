import routers from "../Router/routers";

function getChannels(queryParams, navigate){
    return fetch(routers.getChannels+`?`+queryParams, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then(response => {
        if(!response.ok){
            if (response.status === 400) {
                alert('Invalid arguments for filtration/pagination');
                return null;
            } else if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
                return null;
            } else if (response.status === 500) {
                alert('Internal Server Error');
                return null;
            } else {
                alert(`HTTP error! Status: ${response.status}`);
                return null;
            }
        }
        return response.json();
    }).then(data =>{
        return data;
    }).catch(error=>{
        console.log(error.message);
        return null;
    });
}

function rewiveChannel(body, navigate) {
    return fetch(routers.rewiveChannel, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
    })
    .then(async response => {
        if (!response.ok) {
            if (response.status === 400) {
                alert('Invalid');
                return null;
            } else if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
                return null;
            } else if (response.status === 500) {
                alert('Internal Server Error');
                return null;
            } else {
                alert(`HTTP error! Status: ${response.status}`);
                return null;
            }
        }
        const text = await response.text();
        return text ? JSON.parse(text) : {};
    })
    .catch(error => {
        console.log(error.message);
        return null;
    });
}

export const channelsApi = {
    getChannels : getChannels,
    rewiveChannel: rewiveChannel,
}