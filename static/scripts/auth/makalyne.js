$(document).ready(function () {
    const loginIcon = $(".login-icon");
    const optionsContainer = $(".login-options");

    loginIcon.on("click", function () {
        toggleOptions(optionsContainer);
    });

    fetchSessionData();
});

function toggleOptions(optionsContainer) {
    if (optionsContainer.is(":visible")) {
        optionsContainer.hide();
    } else {
        optionsContainer.show();
    }
}

function addOption(text, clickHandler) {
    const option = $("<div>", {
        text: text,
        class: "login-option",
    });
    $(".login-options").append(option);

    option.on("click", clickHandler);
}

function fetchSessionData() {
    $.ajax({
        url: '/auth/get_token',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.error) {
                addLogoutOption();
            } else {
                addOption("Login", function () {
                    // Redirect to login page without AJAX
                    window.location.href = "/login";
                });
                addOption("Register", function () {
                    // Redirect to registration page without AJAX
                    window.location.href = "/register";
                });
            }
        },
        error: function (error) {
            console.error('Error fetching session data:', error);
        }
    });
}

function addLogoutOption() {
    addOption("Logout", function () {
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

// Add AJAX for Login
addOption("Login", function () {
    // Show a login form or a modal using AJAX
    $.ajax({
        url: '/auth/login',
        method: 'GET',
        success: function (data) {
            // Display the login form or modal to the user
            // You can replace this with your specific implementation
            // Example: $("#login-modal").html(data);
        },
        error: function (error) {
            console.error('Error fetching login form:', error);
        }
    });
});

// Add AJAX for Register
addOption("Register", function () {
    // Show a registration form or a modal using AJAX
    $.ajax({
        url: '/auth/register',
        method: 'GET',
        success: function (data) {

        },
        error: function (error) {
            console.error('Error fetching registration form:', error);
        }
    });
});


@auth_router.route('/get_profile_picture')
def get_profile_picture():
    print("get_profile_picture")
    
    credentials_dict = session.get('credentials', {})
    print(credentials_dict)

    if not credentials_dict.get('token'):
        return jsonify({'error': 'User not authenticated'})
    

    access_token = credentials_dict['token']
    print (access_token)
    
    headers = {
        'Authorization': f'Bearer {access_token}',  
        'Content-Type': 'application/json',  
    }

    # Make the API request to Google OAuth userinfo endpoint
    response = requests.get('https://www.googleapis.com/oauth2/v2/userinfo', headers=headers)
    
    if response.status_code == 200:
        user_info = response.json()
        
        print("user_info")
        print(user_info)
        print("user_info")

        
        profile_picture_url = user_info.get('picture')
        
        print(f'Access Token: {access_token}')
        print(f'Profile Picture URL: {profile_picture_url}')

        # Return the profile picture URL as a JSON response
        return jsonify({'profile_picture_url': profile_picture_url})
    else:
        print(f"Status Code: {response.status_code}")
        print("Response Content:")
        print(response.text)
        # Handle the case where the request to Google OAuth userinfo endpoint failed
        # You can add more specific error handling here
        return jsonify({'error': 'Failed to retrieve user information'})