const userInputs = document.querySelectorAll("input");
const signUpForm = document.querySelector("#signup-form");
const signUpMsg = document.querySelector("#signup-msg");
const alreadyAccount = document.querySelector("#already-account");

alreadyAccount.addEventListener("click", (events) => {
    events.preventDefault();

    window.location.href = "http://localhost:3000/pages/login"
})

signUpForm.addEventListener("submit", async (events) => {
    events.preventDefault();
    const userData = {};

    userInputs.forEach((inp) => {
        const { value, name } = inp;
        userData[name] = value;
    });

    try {
        const res = await (await fetch('http://192.168.1.9:4000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(userData),
        })).json();
        console.log(res.message);
        signUpMsg.innerHTML = res.message;
        if (res.success) {
            window.location.href = "http://localhost:3000/pages/login"
        }
    } catch (error) {
        signUpMsg.innerHTML = error.message;
    }

});

setInterval(() => {
    signUpMsg.innerHTML = "";
}, 5000)