document.getElementById("formulario").addEventListener("submit", function(event) 
{
    event.preventDefault();
    emailjs.sendForm("service_jp21mzp", "template_r9s4ml3", this)
      .then(function() {
        alert("Mensaje enviado exitosamente.");
        document.getElementById("formulario").reset();
      }, function(error) {
        alert("Ocurrió un error: " + JSON.stringify(error));
    });
});