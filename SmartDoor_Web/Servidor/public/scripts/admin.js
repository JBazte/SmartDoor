console.log("Corriendo Administrador");

var misCookies = document.cookie;


//Gets the username saved in the cookie 
function leerCookie(nombre) {
 var lista = document.cookie.split(";");
     for (i in lista) {
         var busca = lista[i].search(nombre);
         if (busca > -1) 
         	{
         		micookie=lista[i];
         	}
         	else
         	{
         		window.location.href = "../index.html";
         	}
     }
 var igual = micookie.indexOf("=");
 var valor = micookie.substring(igual+1);
return valor;
}
document.getElementById("name").innerHTML = leerCookie("username");

//Gets user's IMEI
var data = {
    usuario: document.getElementById("name").textContent
}
$.ajax({
    url: '/imei',
    type: "POST",
    dataType: "json",
    data: data,
    success: function(data){
        if(data.msg === 'No imei'){
            $('.INFO').text("No existe un IMEI vinculado a su cuenta. Por favor, apoye su celular sobre la placa NFC");
            $('.INFO').css("color", "red");
            $('.INFO').css("font-weight", "Bold");
        }
        else if (data.msg === 'Hay imei'){
            $('.INFO').text("Se encontro el IMEI vinculado a su cuenta.");
            $('.INFO').css("color", "#49ff00");
            $('.INFO').css("font-weight", "Bold");
            //Shows IMEI
            $('.IMEI').text("IMEI: " + data.imei);
        }
    }
})

agre();
nuevo();
borrar();
editar();

var num = 0;
var elegido = 0;
var agreg = false;
var clickeado = 0;

//Creates new subusers
function agre(){
	$('#agregar').click(function(){
        //When it is the first time you save a new subuser
		if (num === 0 && clickeado === 0){
			$("#0").show();
			agreg = true;
            clickeado += 1;
		}
		else {
			if (agreg === false){
                //Adds new textbox and buttons to the set or delete new subuser
                var agregarNombre = "<div id='" + num + "' class='contenedor2'><input class='member' type='text' placeholder='Usuario' id='" + num + "'><input class='error' type='button' value='✖' id='" + num + "'><input class='buttons' type='button' value='✔' id='" + num + "'></div>";
				$(agregarNombre).appendTo(".subusuarios");
				$('.contenedor2').show();
				agreg = true;
                nuevo();
                borrar();
			}
			else
			{
				alert("Agregue un nombre");
			}
		}
	})
}

//Saves the new subuser
function nuevo(){
    $('.buttons').click(function(){
        if ($('.member').val().length > 0 && clickeado > 0)
        {
            var data = {
                usuario: document.getElementById("name").textContent,
                subusuario: $('.member').val()
            }
            $.ajax({
                url: '/subuser',
                type: "POST",
                dataType: "json",
                data: data,
                success: function(data){
                    if (data.msg === 'Error'){
                    	$('.INFO').text("El subusuario ya existe");
                    }
                    else if (data.msg === 'Gracias'){
                        elegido = this.id;
    					$('#' + elegido).closest("div").remove();
    					$('.INFO').text("Subusuario agregado");
                    }
                }
            })
            agreg = false;
            num += 1;
        }
        else
        {
            alert("Agregue un nombre");
            agreg = true;
        }
    });
}

//Deletes the subuser about to create
function borrar(){
	$('.error').click(function(){
		elegido = this.id;
    	$('#' + elegido).closest("div").remove();
        agreg = false;
 	});  
}

//Edits user's IMEI
function editar(){
    $('#editar').click(function(){
        console.log("editar");
    })
}