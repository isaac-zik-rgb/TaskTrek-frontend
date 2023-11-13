 
 $(function(){

     
   
    // Fetch data from the database using AJAX
    $.ajax({
        url: 'https://web-02.codezenith.tech/api/account/users/', // Replace with your actual API endpoint
        method: 'GET',
        success: function(data) {
           
            // Loop through the data and generate HTML for each user
            var working_hours = ''
                
               data.forEach(function(user) {
                if (user.profile.image == null){
                    user.profile.image = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                }
                
                   
                     working_hours = `<div id="tab-1" class="tab-pane fade show p-0 active">`
                     var userHtml = `
                     ${working_hours}
                     
                     <div class="job-item p-4 mb-4">
                         <div class="row g-4">
                             <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                 <img class="flex-shrink-0 img-fluid border rounded" src="${user.profile.image}" alt="" style="width: 80px; height: 80px;">
                                 <div class="text-start ps-4">
                                     <h5 class="mb-3"><a href="">${user.first_name} ${user.last_name}</a></h5>
     
                                     <span class="text-truncate me-3"><i class="far fa-clock text-primary me-2"></i>${user.profile.working_hours}</span>
                                     
                                     <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>${user.profile.country} ${user.profile.state}</span>
                                     
                                   
                                 </div>
                             </div>
                             <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                 <h6>${user.profile.profession}</h6>
                                 <small class="text-truncate"><i class="far fa-calendar-alt text-primary me-2"></i>${user.profile.working_experience}</small>
                                 <span class="text-truncate me-0"><i class="far fa-money-bill-alt text-primary me-2"></i>$123 - $456</span>
                             </div>
                         </div>
                     </div>
                     
                     
                     `;
                     $('#userContainer').append(userHtml)
                

              
                
                
                
                // Append the generated HTML to the container
               
               
            });
            
        },
        error: function(error) {
            console.error('Error fetching data:', error);
        }
    });

    
    
});





/* test 
$(function(){

    
    // Fetch data from the database using AJAX
    for(let user = 0; user < 3; user++) {

    
                var userHtml = `
                <div id="tab-1" class="tab-pane fade show p-0 active">
                <div class="job-item p-4 mb-4">
                    <div class="row g-4">
                        <div class="col-sm-12 col-md-8 d-flex align-items-center">
                            <img class="flex-shrink-0 img-fluid border rounded" src="img/isaac.jpg" alt="" style="width: 80px; height: 80px;">
                            <div class="text-start ps-4">
                                <h5 class="mb-3"><a href="">Isaac Castro</a></h5>

                                <span class="text-truncate me-3"><i class="far fa-clock text-primary me-2"></i>Full Time</span>
                                
                                <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>New York, USA</span>
                                
                              
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                            <h6>Software Engineer</h6>
                            <small class="text-truncate"><i class="far fa-calendar-alt text-primary me-2"></i>Intern</small>
                            <span class="text-truncate me-0"><i class="far fa-money-bill-alt text-primary me-2"></i>$123 - $456</span>
                        </div>
                    </div>
                </div>
               
                `;
                // Append the generated HTML to the container
                $('#userContainer').append(userHtml);
    }
            
        
       
   

});
*/