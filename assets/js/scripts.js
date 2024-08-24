class User {
    constructor(rut, firstName, lastName, amount, password) {
        this.rut = rut;
        this.firstName = firstName;
        this.lastName = lastName;
        this.amount = amount;
        this.password = password;
    }
}

let users = {
    //Instancia los usuarios y los guarda en el objeto users.
    "11222333-4": new User("11222333-4", "Alicia", "Araya", 54000, "Aa1234"),
    "22333444-5": new User("22333444-5", "Benjamín", "Bravo", 1200000, "Bb2345"),
    "33444555-6": new User("33444555-6", "Carolina", "Cortés", 460000, "Cc3456"),
}

function getUser() {
    //Obtiene el valor del rut indicado en los input del login de usuario.
    let user = document.getElementById("rut").value;
    let password = document.getElementById("password").value;
    validateUser(user, password);
}

function validateUser(user, password) {
    //Busca el usuario indicado en el login entre los usuarios registrados (users). Si no lo encuentra, lanza un mensaje.
    let userFound = users[user];
    if (!userFound) {
        alert("Usuario o contraseña erronea");
        return;
    }
    /*Obtiene la contraseña del usuario encontrado.
    valida si el password del usuario encontrado es igual al password ingresado en el login.*/
    let userFoundPassword = userFound.password;
    if (userFoundPassword === password) {
        alert(`¡Bienvenida ${userFound.firstName} ${userFound.lastName}!`);
        showMenu(userFound);
    } else {
        alert("Usuario o contraseña erronea");
        return;
    }
}

function showMenu(user) {
    //Muestra el menú de opciones del usuario siempre que el usuario no quiera salir del menú o presione cancelar.
    let option;
    do {
        option = prompt("Por favor, seleccione lo que desea hacer: \n1.- Ver saldo \n2.- Realizar giro \n3.- Realizar depósito \n4.- Salir");

        switch (option) {
            case "1":
                showAmount(user);
                break;
            case "2":
                withdrawal(user);
                break;
            case "3":
                deposit(user);
                break;
            case "4":
            case null:
                alert("¡Gracias por preferirnos! Hasta luego");
                break;
            default:
                alert("Por favor, elige una opción válida.");
        }
    } while (option !== "4" && option !== null);
}

function showAmount(user) {
    //Muestra el saldo actual.
    alert(`Su saldo actual es de ${user.amount}`);
}

function withdrawal(user) {
    /*Permite el retiro de dinero cuando el monto indicado es menor al saldo actual.
    Permite salir de la opción si el usuario presiona calcelar.*/
    let withdrawalAmount;

    do {
        withdrawalAmount = parseInt(prompt(`Su saldo actual es: ${user.amount}\nIngrese el monto que desea girar`));

        if (isNaN(withdrawalAmount)) {
            return;
        }
        if (withdrawalAmount < user.amount) {
            user.amount = user.amount - withdrawalAmount;
            alert(`Giro realizado. Su nuevo saldo es: ${user.amount}`);
            return;
        } else {
            alert(`El saldo es insuficiente, porfavor ingrese un monto menor. Su saldo actual es: ${user.amount}.`);
        }
    } while (withdrawalAmount > user.amount);
}

function deposit(user) {
    //Permite el deposito de dinero y salir de la opción si el usuario presiona calcelar.
    depositAmount = parseInt(prompt(`Su saldo actual es: ${user.amount}\nIngrese el monto que desea depositar`));
    if (isNaN(depositAmount)) {
        return;
    }
    user.amount = user.amount + depositAmount;
    alert(`Depósito realizado. Su nuevo saldo es: ${user.amount}`);
}

function passwordRecovery() {
    alert("Para recuperar su clave, contactese con un ejecutivo al numero +56 (2) 2439 8851");
}

function loadEvents() {
    //Al hacer clic en ciertos elementos, se ejecutarán las funciones correspondientes
    document.getElementById("submit-button").addEventListener("click", getUser);
    document.getElementById("forgot-password").addEventListener("click", passwordRecovery);
}

window.addEventListener("load", loadEvents);