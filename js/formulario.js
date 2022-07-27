//Variables
const btnEnviar = document.querySelector("#enviar");
const formulario = document.querySelector("#enviar-mail");
//VARIABLES PARA CAMPOS(tenemos 3 campos)
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const telefono = document.querySelector('#tel');
const er =
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const expresionRegular = 
  /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/
;

const btnReset = document.querySelector('#resetBtn');
eventListeners();
  function eventListeners() {
  //CUANDO LA APP ARRANCA
  document.addEventListener("DOMContentLoaded", iniciarApp);
  //CAMPOS DEL FORMULARIO
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  telefono.addEventListener('blur', validarFormulario);

  formulario.addEventListener('submit', enviarEmail);
  btnReset.addEventListener('click', resetForm);
} //Funciones
function iniciarApp() {
  //esta funcion se va a encargar de arrancar todo
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
} //VALIDANDO FORMULARIO

function validarFormulario(e) {
  if (e.target.value.length > 0) {
    //eliminar del DOM
    const error = document.querySelector("p.error");
    
    if (error) {//Si hay un p con la clase error, remuevelo
      error.remove();
    }
    e.target.classList.remove("border", "border-red-500");/*Si el usuario escribió algo agregale el 
    color verde al borde de los formulario*/
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");/*Si no escribió algo entonces 
    agrégale el color rojo al borde del formulario*/
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }
  /*Esta es una validación aparte de si tiene algo dentro o no, pero toma los parámetros para
  checar el contenido con .value, er es la variable que guarda la expresión regular.
  
  A la expresión regular se le checa con .test y dentro lo que se le va a validar, en este caso
  entes validamos si e.target.type es un email entonces ya checa que ese email cumpla con 
  ciertas características, obvio lo que va a evaluar será el contenido y esto se hace con e.target.value
  */
  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      const error = document.querySelector("p.error");

      if (error) {
        error.remove();
      }
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");

      e.target.classList.add("border", "border-red-500");
      mostrarError("Email no valido");
    }
  }

  if(e.target.type === 'tel'){
    if(expresionRegular.test(e.target.value)){
      const error = document.querySelector('p.error');

      if(error){/*esto elimina el elemnto del html si ya existe */
        error.remove();
      }
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    
    }else {
      e.target.classList.remove("border", "border-green-500");

      e.target.classList.add("border", "border-red-500");
      mostrarError("Numero de teléfono no valido");
    }
  } 
 /*Esta última validación checa si el valor de lo que hay en el campo de email es nada y los 
 otros campos son diferentes a nada entonces habilita el boton y manda un mensaje*/
  if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "" && expresionRegular.test(telefono.value)) {
  /*Aquí al er.test(email.value) ya no lo tengo que validar cagadamente con un si es diferente a un
  string vacío, sólo la variable de la expresión regular y lo que queremos validar, porque nosotros 
  ya lo estamos validando con la expresión regular, aquí sólo es encadenamiento para que 
  se cumpla la misma condición en todas y se habilite el btnEnviar*/  
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
    alert('pasamos la validación');
  }
}
function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border","border-red-500","background-red-100","text-red-500","p-3","mt-5","text-center","error");
  
  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}
/*Veámos como manejar la parte de que cuando yo presiono enviar simúle el envío de un email.*/

//Envia el email(efecto del spinner)
function enviarEmail(e){  
  e.preventDefault() 
  //Mostrar el spinner
  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'flex';
  setTimeout(()=> {
    spinner.style.display = 'none';
    /*Mensaje que diga que se envió correctamente*/
    const parrafo = document.createElement('p');
    parrafo.textContent = 'El mensaje se envió correctamente';
    parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
    //Inserta el párrafo antes del spinner
    formulario.insertBefore(parrafo, spinner);
    /*Esto significa, inserta el párrafo creado antes del spinner*/
    /*Ahora, después de 3 segundos quiero que desaparezca*/
    setTimeout(() => {
      parrafo.remove();//Eliminar el mensaje de éxito
      resetForm();
    }, 2000);
  }, 3000 );
  
}
/*Existe otro que se llama setInterval, este otro se ejecuta cada 3 segundos
o sea pasan 3 segundos y se ejecuta, pasan otros 3 y se vuelve a ejecutar.*/
//Funcion que resetee el formulario 
function resetForm (){
  formulario.reset();
  iniciarApp();
}

/*Aquí hace falta la validación de el input de número, se me ocurre algo como amm
si e.target.value es igual a un número ('number') está okey */