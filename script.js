// Seleccionamos los elementos del DOM
const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const password = document.getElementById('password');
const confirmarPassword = document.getElementById('confirmar-password');
const edad = document.getElementById('edad');
const enviarBtn = document.getElementById('enviar');

function mostrarError(input, mensaje) {
    const grupo = input.parentElement;
    const small = grupo.querySelector('small.error');
    small.textContent = mensaje;
    small.classList.add('visible');
    input.classList.remove('valid');
    input.classList.add('invalid');
}

function mostrarValido(input) {
    const grupo = input.parentElement;
    const small = grupo.querySelector('small.error');
    small.textContent = '';
    small.classList.remove('visible');
    input.classList.remove('invalid');
    input.classList.add('valid');
}

// Validar nombre mínimo 3 caracteres
function validarNombre() {
    if (nombre.value.trim().length < 3) {
        mostrarError(nombre, 'El nombre debe tener al menos 3 caracteres.');
        return false;
    } else {
        mostrarValido(nombre);
        return true;
    }
}

// Validar correo con regex
function validarCorreo() {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(correo.value.trim())) {
        mostrarError(correo, 'Por favor, ingresa un correo válido.');
        return false;
    } else {
        mostrarValido(correo);
        return true;
    }
}

// Validar contraseña: mínimo 8 caracteres, al menos un número y un carácter especial
function validarPassword() {
    const val = password.value;
    const reNumero = /\d/;
    const reEspecial = /[!@#$%^&*(),.?":{}|<>]/;
    if (val.length < 8) {
        mostrarError(password, 'La contraseña debe tener al menos 8 caracteres.');
        return false;
    }
    if (!reNumero.test(val)) {
        mostrarError(password, 'La contraseña debe contener al menos un número.');
        return false;
    }
    if (!reEspecial.test(val)) {
        mostrarError(password, 'La contraseña debe contener al menos un carácter especial.');
        return false;
    }
    mostrarValido(password);
    return true;
}

// Validar que la confirmación coincida con la contraseña
function validarConfirmarPassword() {
    if (confirmarPassword.value !== password.value || confirmarPassword.value === '') {
        mostrarError(confirmarPassword, 'Las contraseñas no coinciden.');
        return false;
    } else {
        mostrarValido(confirmarPassword);
        return true;
    }
}

// Validar edad >= 18
function validarEdad() {
    const valor = parseInt(edad.value, 10);
    if (isNaN(valor) || valor < 18) {
        mostrarError(edad, 'Debes ser mayor o igual a 18 años.');
        return false;
    } else {
        mostrarValido(edad);
        return true;
    }
}

// Validar todo y actualizar botón enviar
function validarFormulario() {
    const nombreValido = validarNombre();
    const correoValido = validarCorreo();
    const passValido = validarPassword();
    const confirmPassValido = validarConfirmarPassword();
    const edadValida = validarEdad();

    enviarBtn.disabled = !(nombreValido && correoValido && passValido && confirmPassValido && edadValida);
}

// Listeners para validación en tiempo real
nombre.addEventListener('input', validarFormulario);
correo.addEventListener('input', validarFormulario);
password.addEventListener('input', () => {
    validarPassword();
    validarConfirmarPassword();
    validarFormulario();
});
confirmarPassword.addEventListener('input', () => {
    validarConfirmarPassword();
    validarFormulario();
});
edad.addEventListener('input', validarFormulario);

// Al enviar el formulario
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    validarFormulario();
    if (!enviarBtn.disabled) {
        alert('Formulario enviado correctamente.');
        formulario.reset();
        enviarBtn.disabled = true;

        // Limpiar clases y mensajes después del reset
        const inputs = formulario.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
            const small = input.parentElement.querySelector('small.error');
            small.textContent = '';
            small.classList.remove('visible');
        });
    }
});

// Al resetear el formulario limpiamos estilos y deshabilitamos el botón enviar
formulario.addEventListener('reset', () => {
    enviarBtn.disabled = true;
    const inputs = formulario.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
        const small = input.parentElement.querySelector('small.error');
        small.textContent = '';
        small.classList.remove('visible');
    });
});