$(document).ready(function () {
    const loginIcon = $(".login-icon");
    const optionsContainer = $(".login-options");

    loginIcon.on("click", function () {
        if (optionsContainer.is(":visible")) {
            console.log("hide");
            optionsContainer.hide();
        } else {
            console.log("show");
            optionsContainer.show();
        }
    });

    fetchSessionData();
    //fetchProfilePicture();
});

function fetchSessionData() {
    $.ajax({
        url: '/auth/get_token',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            if (data.error) {
                console.error('User not authenticated');
                showLoginOptions(); 
            } else {
                console.log('User is authenticated');
                showLogoutOption(); 
            }
        },
        error: function(error) {
            console.error('Error fetching session data:', error);
            showLoginOptions(); 
        }
    });
}

function fetchProfilePicture() {
    $.ajax({
        url: "/get_profile_picture",
        method: "GET",
        success: function (data) {
            console.log(data);
            if (data.error) {
                console.error('User not authenticated');
            } else {
                console.log('User is authenticated in profilepicture');
                console.log(data.profile_picture_url);
                const profilePictureUrl = data.profile_picture_url;
                if (profilePictureUrl) {
                    console.log("----------")
                    console.log(profilePictureUrl);
                    console.log("----------")
                    const img = $("<img>").attr("src", profilePictureUrl).attr("alt", "Profile Picture");
                    $("body").append(img);
                }
            }
        },
        error: function (error) {
            console.error("Error:", error);
        }
    });
}


function showLoginOptions() {
    $(".login-options").empty(); 
    $(".login-options").append("<div class='login-option'>Login</div>");
    $(".login-options").append("<div class='login-option'>Register</div>");

    $(".login-option:contains('Login')").on("click", function () {
        window.location.href = "/login"; 
    });

    $(".login-option:contains('Register')").on("click", function () {
        window.location.href = "/register"; 
    });
}

function showLogoutOption() {
    $(".login-options").empty(); 
    $(".login-options").append("<div class='login-option'>Logout</div>");
    $(".login-options .login-option").on("click", function () {
        $.ajax({
            url: '/auth/logout',
            method: 'POST', 
            success: function () {
               
                window.location.href = "/";
            },
            error: function (error) {
                console.error('Error logging out:', error);
            }
        });
    });
}


