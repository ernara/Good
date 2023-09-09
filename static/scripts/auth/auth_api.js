$.ajax({
    url: '/api/userinfo', 
    method: 'GET',
    success: function (data) {
        $('#user-name').text(data.name);
        $('#user-surname').text(data.surname);
    },
    error: function (error) {
        console.error('Error fetching user information:', error);
    }
});
