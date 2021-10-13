const googleBtn = document.querySelector("#btn-google");
if(googleBtn){
    googleBtn.addEventListener("click",  e =>{
        window.location.href ="/auth/google";
    })
}

export default googleBtn;