$(document).ready(function () {
    var isAuthenticated = true;
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
        
        if (optionText === "Login") {
            window.location.href = "/login";
        } else if (optionText === "Register") {
            window.location.href = "/register";
        }
    });

    if (isAuthenticated) {
        var userInfoContainer = $("#user-info");
        var userNameElement = $("#user-name");
        var userSurnameElement = $("#user-surname");

        var userName = "John";
        var userSurname = "Doe";

        userInfoContainer.css("display", "block");
        userNameElement.text(userName);
        userSurnameElement.text(userSurname);
    }

    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const name = getQueryParam('name');
    const surname = getQueryParam('surname');

    $('#user-name').text(name);
    $('#user-surname').text(surname);

    // Function to fetch session data from the server
    
  
    fetchSessionData();
  
    

});

function fetchSessionData() {
    $.ajax({
      url: '/auth/get_token',  
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log(data);
      },
      error: function(error) {
        console.error('Error fetching session data:', error);
      }
    });
  }