import { initTabs } from "./tabs.js";
import { loginAsAdmin, loginAsSubstitute } from "./main.js";

function initViews() {
    // Add hashchange event listener only once during initialization
    window.addEventListener("hashchange", viewChange);
    document.querySelector("#logout-btn").classList.add("hide");

    // Call viewChange function on initialization
    viewChange();
}

function viewChange() {
    // Get the current hashLink
    let hashLink = location.hash || "#login-page";

    // get currentUser from localStorage if any
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && !currentUser.loggedIn) {
        if (currentUser.IsAdmin) {
            currentUser.loggedIn = true;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            location.hash = "#mypage-admin";
            document.querySelector(".view-content-admin").classList.add("active");

            document.querySelector("#logout-btn").classList.remove("hide");
            setLoggedInAs(currentUser);
        } else if (!currentUser.IsAdmin && !currentUser.loggedIn) {
            currentUser.loggedIn = true;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            location.hash = "#mypage";

            document.querySelector("#logout-btn").classList.remove("hide");

            setLoggedInAs(currentUser);
            substituteViewMypage(location.hash);
        }
    } else if (location.hash === "#mypage") {
        substituteViewMypage(hashLink);
        setLoggedInAs(currentUser);
    } else if (location.hash === "#shifts") {
        substituteViewShifts(hashLink);
        setLoggedInAs(currentUser);
    } else if (location.hash === "#schema") {
        substituteViewSchema(hashLink);
        setLoggedInAs(currentUser);
    } else if (location.hash === "#mypage-admin") {
        adminViewMypage(hashLink);
        setLoggedInAs(currentUser);
    } else if (location.hash === "#shifts-view-section-admin") {
        adminViewShifts(hashLink);
        setLoggedInAs(currentUser);
    } else if (location.hash === "#substitutes-view-section-admin") {
        adminViewSubstitutes(hashLink);
        setLoggedInAs(currentUser);
    }
    // Hide all views
    hideAllViews();

    // Display the active one
    if (hashLink) {
        document.querySelector(hashLink).classList.add("active");
    }
}

function setLoggedInAs(currentUser) {
    document.querySelector("#username-logged-in").textContent = `Du er logget ind som ${currentUser.Username}`;
}

function adminViewMypage(hashLink) {
    document.querySelector(hashLink).classList.add("active");
    document.querySelector(".view-content-admin").classList.add("active");
    document.querySelector(".view-content-substitute").classList.remove("active");
    document.querySelector("#logout-btn").classList.remove("hide");
    loginAsAdmin();
}

function adminViewShifts(hashLink) {
    document.querySelector(hashLink).classList.add("active");
    document.querySelector(".view-content-admin").classList.add("active");
    document.querySelector(".view-content-substitute").classList.remove("active");
    document.querySelector("#logout-btn").classList.remove("hide");
    loginAsAdmin();
    initTabs();
}
function adminViewSubstitutes(hashLink) {
    document.querySelector(hashLink).classList.add("active");
    document.querySelector(".view-content-admin").classList.add("active");
    document.querySelector(".view-content-substitute").classList.remove("active");
    document.querySelector("#logout-btn").classList.remove("hide");
    loginAsAdmin();
}

function substituteViewMypage(hashLink) {
    document.querySelector(hashLink).classList.add("active");
    document.querySelector(".view-content-substitute").classList.add("active");
    document.querySelector("#logout-btn").classList.remove("hide");
    loginAsSubstitute();
}

function substituteViewShifts(hashLink) {
    document.querySelector(hashLink).classList.add("active");
    document.querySelector(".view-content-substitute").classList.add("active");
    document.querySelector("#logout-btn").classList.remove("hide");
    loginAsSubstitute();
    initTabs();
}

function substituteViewSchema(hashLink) {
    document.querySelector(hashLink).classList.add("active");
    document.querySelector(".view-content-substitute").classList.add("active");
    document.querySelector("#logout-btn").classList.remove("hide");
    loginAsSubstitute();
}

function hideAllViews() {
    document.querySelectorAll(".view-content").forEach((link) => link.classList.remove("active"));
    //document.querySelectorAll(".view-link").forEach((link) => link.classList.add("active"));
}

function logOutView() {
    console.log("logging out");

    let hashLink = "#login-page";

    hideAllViews();
    document.querySelector(hashLink).classList.add("active");
    document.querySelector("#login-form").reset();
    document.querySelector("#logout-btn").classList.add("hide");
    document.querySelector("#username-logged-in").textContent = "";
    document.querySelector(".view-content-substitute").classList.remove("active");
    document.querySelector(".view-content-admin").classList.remove("active");
    location.hash = hashLink;
    localStorage.clear();
    document.querySelector("#admin-user-info").innerHTML = "";
    document.querySelector("#shifts-admin-tbody").innerHTML = "";
    document.querySelector("#availableShifts-admin-tbody").innerHTML = "";
    document.querySelector("#substitutes-list-admin-tbody").innerHTML = "";
    document.querySelector(".my-info").innerHTML = "";
    document.querySelector("#myShifts").innerHTML = "";
    document.querySelector("#availableShifts").innerHTML = "";
}

export { initViews, viewChange, logOutView };
