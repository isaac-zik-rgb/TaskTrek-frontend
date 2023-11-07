
const formEl = document.querySelector('.registration_form');


const submitForm =  async (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const formextData = new FormData(formEl);

    const errorMesg = document.getElementById('message');
    const data = Object.fromEntries(formData);
    const newData = Object.fromEntries(formextData);
   


    
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

        
        const res = await fetch('http://127.0.0.1:8000/api/accounts/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
       if (res.status !== 201){
        const response = await res.json();
        console.log(response);
        
       
        
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