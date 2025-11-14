import routers from "../Router/routers";

function getRoles(navigate){
    return fetch(routers.rolesFull, {
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

function createRole(body, navigate) {
    return fetch(routers.roleCreate, {
        method: "POST",
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

function updateRole(body, navigate) {
    return fetch(routers.roleUpdate, {
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

function deleteRole(body, navigate) {
    return fetch(routers.roleDelete, {
        method: "DELETE",
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

export const rolesApi = {
    getRoles : getRoles,
    createRole: createRole,
    updateRole : updateRole,
    deleteRole : deleteRole
}