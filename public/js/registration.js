
const formEl = document.querySelector('.registration_form');


const submitForm =  async (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    

    const errorMesg = document.getElementById('message');
    const data = Object.fromEntries(formData);
   


    
    try {
        
    
        

        const password = data.password;
        const comfirmPass = data.comfirm_password; // Corrected the field name
        
         
         if (password !== comfirmPass) {
            errorMesg.textContent = 'Sorry, your passwords do not match';
            setTimeout(() => {
                errorMesg.textContent = '';
            }, 2000);
            return;
        }
        delete data.comfirm_password

        
        const res = await fetch('https://tasktrek.onrender.com/api/accounts/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
           
            body: JSON.stringify(data)
        });
       if (res.status !== 201){
        const response = await res.json();
        console.log(response, 'bad');
        const message =  document.getElementById('message')
        message.textContent = 'Email is alredy taken'
        setTimeout(()=>{
            message.textContent = ''
        },3000)
        
       
        
       }else{

        const response = await res.json();
        console.log(response);
        window.location.href = 'login.html'
        alert('Registration was successful, Check your inbox for comfirmation')
        return data;
       }
      

    } catch (error) {
        console.log(error);
        return
    }

        
};
if (formEl) {
    formEl.addEventListener('submit', async (event) => {
        const myData = await submitForm(event);
        console.log(myData);
    });
}