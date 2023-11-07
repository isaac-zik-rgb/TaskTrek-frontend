
$(function () {
    $('.login-form').submit(function (event) {
        event.preventDefault();
       
        
        const email = $('#email').val();
        const password = $('#password').val();

        const loginData = {
            email: email,
            password: password
        };
        console.log(loginData)

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8000/api/accounts/login/',
            data: JSON.stringify(loginData),
            contentType: 'application/json',
            success: function (response){
              console.log(response)
              
              if (response.token){
                console.log(response.token)
                localStorage.setItem('authToken', response.token)
                window.location.href = 'index.html'
              
                
              }
              
            },
            error: function(error) {
              $('#message').text('User account not verifed').css('color', 'green')
              setTimeout(function(){
                $('#message').text('')
              }, 3000)
              console.log(error)
            }
          }); 
    });
    
  });


  console.log(localStorage.getItem('authToken'))