const contactForm=document.querySelector("#contactForm");

contactForm.addEventListener("submit", sendData);

async function sendData(e){
    e.preventDefault();

    const name=e.target.name.value;
    const lastName=e.target.lastName.value;
    const phone=e.target.phone.value;

    const clientData={
        name,
        lastName,
        phone,
    }

    try{
        await axios.post("/api/submit", 
            clientData, {
            headers:{
                "Content-Type": "application/json"
            }
        })
        alert("Контактні дані надіслано!");
    }catch(err){
        console.error(err);
        alert("Сталася помилка, спробуйте ще раз!!!");
    }

    contactForm.reset();
}