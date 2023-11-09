//import { saveAuthToken } from "./login.js";



(function ($) {
    "use strict";
    
    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    // handle when a user click profile
    $('.profile').on('click', function(event){
        event.preventDefault()
        if(localStorage.getItem('authToken')){
          
            $.ajax({
                type: 'GET',
                url: 'http//54.157.181.131/api//accounts/users/me/',
                headers: includeAuthTokenInRequestHeaders(),
                success: function(response){
                    
                    console.log(response)
                    localStorage.setItem('id',response.id)
                    window.location.href = 'profile.html'
                },
                error: function(e){
                    console.log(error)
                    
                } 
            });
            

        }else{
            window.location.href = 'login.html'
        }


    })














    // if loged in
 
        
        
    
    
    
    //function to get auth token from local storage
    function getAuthToken() {
        return localStorage.getItem('authToken');
    }
    
    console.log(localStorage.getItem('authToken'))
    //function to include authtoken
    function includeAuthTokenInRequestHeaders() {
        const token = getAuthToken();
        console.log(token)
        if (token) {
            return {
                'Authorization': 'Token ' + token
            };
        }
        return {};
    }

    
   // Function to toggle between "Sign In" and "Log Out" based on authentication status

   
function updateSignInStatus() {
    if (localStorage.getItem('authToken')) {
        $('.signed').text('Log Out');
    } else {
        $('.signed').text('Sign  In');
    }
}

// Click event handler for the "Sign In" / "Log Out" link
$('.signed').on('click', function (event) {
    event.preventDefault();
    if (localStorage.getItem('authToken')) {
        // Perform logout action here
        $.ajax({
            type: 'GET',
            url: 'https://codezenith.pythonanywhere.com/api/accounts/logout/',
            headers: includeAuthTokenInRequestHeaders(), 
            success: function (response) {
                console.log(response);
                // Handle the logout response and update the UI as needed
                if(response){
                   localStorage.clear()
                   $('#message').text('Logged out successfully').fadeIn();
                   setTimeout(function() {
                       $('#message').fadeOut();
                   }, 3000);
                    updateSignInStatus();
                }
                
            },
            error: function (xhr) {
                console.log('Logout error:', xhr);
                window.location.href = 'login.html'
                // Handle logout error, if any
            }
        });
    } else {
        // Redirect to the sign-in page or display a sign-in form
        window.location.href = 'login.html'; // Replace with your sign-in page URL
    }
});


   
updateSignInStatus();

   
    
})(jQuery);


const search = () => {
    const searchbox = document.getElementById('search-item').value.toUpperCase();
    const  storeItem = document.getElementById('jobs-list');
    const jobs = document.querySelectorAll(".col-lg-3");
    const jname = storeItem.getElementsByTagName("h6");

    for (var i = 0; i < jname.length; i++){
        let match = jobs[i].getElementsByTagName('h6')[0];

        if (match){
            let textvalue = match.textContent || match.innerHTML;

            if (textvalue.toUpperCase().indexOf(searchbox) > -1){
                jobs[i].style.display = "";

            }else{
                jobs[i].style.display = "none";
            }
        }
    }
}


// Initial call to update sign-in status on page load

console.log()