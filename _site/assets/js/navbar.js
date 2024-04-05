function showNavbarDropdown() {
    $("#navbar-dropdown").toggle();
}

$(document).on("click", function (event) {
    let menu = $("#menu");
    let menuIcon = $("#menu i")

    if (menu.is(event.target) || menuIcon.is(event.target)) return;

    $("#navbar-dropdown").hide();

    // console.log(menu.is(event.target) || menuIcon.is(event.target));
});