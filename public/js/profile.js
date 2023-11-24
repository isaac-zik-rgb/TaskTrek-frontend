
(function ($){
    "use strict";

    const uid = localStorage.getItem('id')
    console.log(uid)
    
    
    // new setup
    function getAuthToken() {
        return localStorage.getItem('authToken');
    }
    
    const myImg = document.getElementById('userImage')

    
    
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
    


$('#imageInput').hide()
    $('.uploadButton').on('click', function(){
        $('#imageInput').click()
        
    });

        $('#imageInput').on('change', function(){
            const imageInput = document.getElementById('imageInput'); // Use document.getElementById to access the element
    const modalImage = document.getElementById('modalImage');
    const modal = document.getElementById('imageModal');
    

    if (imageInput.files && imageInput.files[0]){
        const reader = new FileReader();
        reader.onload = function(e) {
            modalImage.src = e.target.result;
           // console.log(modalImage.src)
            modal.style.display = "block";
        };
        reader.readAsDataURL(imageInput.files[0]);
        
        $('.close').on('click', function(){
            modal.style.display = "none";
            
        });
       
    }
    $('#imageUpload').on('click',function() {
     
        
        // Get the selected image file
        const imageInput = document.getElementById('imageInput');
        const selectedImage = imageInput.files[0];
        
        // Create a FormData object to send the image file
        const formData = new FormData();
        formData.append('image', selectedImage);
        const reader = new FileReader();
reader.onload = function(e){
    imageInput.src = e.target.result
    localStorage.setItem('imageData1', e.target.result );

// To retrieve the image data on page load

const imageData1 = localStorage.getItem('imageData1')
if(imageInput.src){
   modal.style.display = "none";
   imageInput.src = imageData1

}


   
        
};
reader.readAsDataURL(selectedImage);
        // Send the image data in a PUT request to your server
        $.ajax({
            type: 'PUT',
            url: `https://tasktrek.onrender.com/api/account/profiles/${uid}/`,
            headers: includeAuthTokenInRequestHeaders(),
            data: formData,
            processData: false, // Don't process the data (allows for FormData)
            contentType: false, // Set the content type to false for FormData
            success: function(response) {
                console.log(response);
                
                // Handle the response from the server as needed
            },
            error: function(error) {
                console.log({'Error': error});
                // Handle the error, if any
            }
        });
        
    });
   
   
    
});

/// GET DATA FROM DATABASE
$.ajax( {
    type: 'GET',
    url: `https://tasktrek.onrender.com/api/account/users/${uid}/`,
    headers: includeAuthTokenInRequestHeaders(),

    success: function (response){
        if (response.profile.image == null){
            response.profile.image = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
        }
        
       myImg.setAttribute('src', response.profile.image)
        $('#user').text(response.first_name)
        $('#user_email').text(response.email)
        $('#bio').val(response.profile.bio)
        $('#phone').val(response.profile.phone)
        $('#first_name').val(response.first_name)
        $('#last_name').val(response.last_name)
        $('#country').val(response.profile.country)
        $('#address_line1').val(response.profile.address_line1)
        $('#address_line2').val(response.profile.address_line2)
        $('#state').val(response.profile.state)
        $('#working_experience').val(response.profile.working_experience)
        $('#years_of_experience').val(response.profile.years_of_experience)
        $('#additional_details').val(response.profile.additional_details)
        $('#postal_code').val(response.profile.postal_code)
        $('#education').val(response.profile.education)
        $('#working_hours').val(response.profile.working_hours)
        $('#profession').val(response.profile.profession)


        // skills AND CHECKBOXES
   
    

    },
    error: function(e){
        console.log({'Error': e})
    }
    

});
$('.userBio').on('submit', function (event){
    event.preventDefault()
    const bioInput = $('#bio').val()
  
    if(bioInput){
        $.ajax({
            type: 'PUT',
            url: `https://tasktrek.onrender.com/api/account/profiles/${uid}/`,
            headers: includeAuthTokenInRequestHeaders(),
            data: JSON.stringify({'bio':bioInput}),
            contentType: 'application/json',
            dataType: 'json',
            success: function(response) {
                console.log(response);
                $('#bio').text(response.bio)

                
                
                // Handle the response from the server as needed
            },
            error: function(error) {
                console.log({'Error': error});
                // Handle the error, if any
            }
        });
    }
   
})

// editing profile

$('.submitProfile').on( 'click',function (event){
    event.preventDefault()
    
    const python = $('#python').is(':checked') ? $('#python').val() : null;
    const nodejs = $('#nodeJs').is(':checked') ? $('#nodeJs').val() : null;
    const c = $('#C').is(':checked') ? $('#C').val() : null;
    
    const skillss = [python, nodejs, c].filter(skill => skill !== null);
    const skillsString = skillss.join(',');
    const skills = skillsString

    if(python){
        $('#python').attr('checked', true)
        $('#python').attr('disabled', true)
    }

    console.log(skillsString)
    

    const phone = $('#phone').val()
    const first_name = $('#first_name').val()
    const last_name = $('#last_name').val()
    const country = $('#country').val()
    const address_line1 = $('#address_line1').val()
    const address_line2 = $('#address_line2').val()
    const state = $('#state').val()
    const working_experience = $('#working_experience').val()
    const years_of_experience = $('#years_of_experience').val()
    const additional_details = $('#additional_details').val()
    const postal_code = $('#postal_code').val()
    const education = $('#education').val()
    const profession = $('#profession').val()
    const working_hours = $('#working_hours').val()
    
    
    const formData = {
        phone,
        first_name,
        last_name,
        country,
        address_line1,
        address_line2,
        state,
        working_experience,
        years_of_experience,
        additional_details,
        postal_code,
        education,
        profession,
        skills,
      
        working_hours
    }
    console.log(formData)
        $.ajax({
            type: 'PUT',
            url: `https://tasktrek.onrender.com/api/account/profiles/${uid}/`,
            headers: includeAuthTokenInRequestHeaders(),
            data: JSON.stringify(formData),
            contentType: 'application/json',
            dataType: 'json',
            
            success: function(response) {
                console.log(response);
                $('.message').text('Profile updated successfully').css('font-weight', '50%')
                setTimeout(() => {
                    $('.message').text('')
                }, 5000);
                $('#phone').val(response.phone)
                $('#first_name').val(response.first_name)
                $('#last_name').val(response.last_name)
                $('#country').val(response.country)
                $('#address_line1').val(response.address_line1)
                $('#address_line2').val(response.address_line2)
                $('#state').val(response.state)
                $('#working_experience').val(response.working_experience)
                $('#years_of_experience').val(response.years_of_experience)
                $('#additional_details').val(response.additional_details)
                $('#postal_code').val(response.postal_code)
                $('#education').val(response.education)

                
                
                // Handle the response from the server as needed
            },
            error: function(error) {
                console.log({'Error': error});
                $('.message').text('Please fill all the necessary field').css('font-weight', '50%')
                setTimeout(() => {
                    $('.message').text('')
                }, 5000);
                // Handle the error, if any
            }

        });
        
    
   
})


// end  of editing profile
$('#back').on('click', function(){
    window.location.href = 'index.html'
})

    



})(jQuery);
