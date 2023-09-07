$(document).ready(function () {
    const userIcon = $(".login-icon");

    userIcon.on("click", function () {
        const optionsContainer = $(".login-options");

        if (optionsContainer.is(":visible")) {
            optionsContainer.hide();
        } else {
            optionsContainer.show();
        }
    });

    $(".login-option").on("click", function () {
        const optionText = $(this).text();
        alert(optionText + " clicked");
    });
});