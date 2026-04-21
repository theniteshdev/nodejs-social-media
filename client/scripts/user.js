const params = new URLSearchParams(window.location.search);

const value = params.get('token');

const myData = await(await fetch("http://192.168.1.9:4000/me", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ token: value })
})).json()
if (!myData?.success) {
    console.log(myData)
    window.location.href = "/pages/login";
};

document.title = myData.username;
const username = document.querySelector(".username");
const stat = document.querySelector(".status");
username.innerHTML = myData.username;
stat.innerHTML = myData.success ? "LoggedIn" : "Logout"

