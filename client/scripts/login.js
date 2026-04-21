const loginForm = document.querySelector("#login-form");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginButton = document.querySelector("#login-btn");
const loginMsg = document.querySelector("#login-msg");
const dontHaveAccount = document.querySelector("#dont-have-account");

dontHaveAccount.addEventListener("click", function (events) {
    // events.preventDefault();
    window.location.href = "http://localhost:3000/pages/signup";
})



loginForm.addEventListener("submit", async (events) => {
    // prevent deafult behaviour of the form
    events.preventDefault();

    // getting username and password from input
    if (
        usernameInput.value == "" ||
        usernameInput.value == undefined || null ||
        usernameInput.value.length < 4 &&
        passwordInput.value == "" ||
        passwordInput.value == undefined || null ||
        passwordInput.value.length < 4
    ) {
        loginMsg.innerHTML = "Please enter correct credencials !!"
    } else {
        // fetching to server
        const res = await (await fetch('http://192.168.1.9:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                username: usernameInput.value,
                password: passwordInput.value,
            }),
        })).json();
        console.log(res.message);
        if (res.success) {
            loginMsg.style.color = "green";
            console.log(res)
            window.location.href = `/pages/user?token=${res.data}`;
        } else {
            loginMsg.style.color = "red"
        }
        loginMsg.innerHTML = res.message;
    }
})