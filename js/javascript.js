const valor_solicitar = document.getElementById('valor_solicitar');
const plazo_tiempo = document.getElementById('plazo_tiempo');
const btnCalcular = document.getElementById('btnCalcular');
const llenarTabla = document.querySelector('#lista-tabla tbody');



const gastos = document.getElementById('gastos');
const otros_ingresos = document.getElementById('otros_ingresos');
const ingresos_mensuales = document.getElementById('ingresos_mensuales');


function Recibir(ingresos_mensuales,otros_ingresos,gastos,valor_solicitar,plazo_tiempo){
    document.getElementById('Registro').innerHTML= '<h3>Resumen crédito</h3>'+'<h6>- Ingresos mensuales: $</h6> ' +ingresos_mensuales+
    '<h6>- Otros ingresos: $</h6> ' +otros_ingresos+ '<h6>- Gastos: $</h6>' +gastos+ '<h6>- Valor solicitar: $</h6> ' +valor_solicitar+
    '<h6>- Plazo tiempo (Meses):</h6> ' +plazo_tiempo;
}

    const interes = document.getElementById('interes');
    interes.addEventListener('change',function(){
        var selectedOption = this.options[interes.selectedIndex];
        interes=selectedOption.value;
      });
    
/*---------------------------------------------------------------------------------------------------*/


btnCalcular.addEventListener('click', () => {
          calcularCuota(valor_solicitar.value, interes.value, plazo_tiempo.value, otros_ingresos.value, ingresos_mensuales.value );
          Recibir(ingresos_mensuales.value,otros_ingresos.value,gastos.value,valor_solicitar.value,plazo_tiempo.value);
    })
 

/*---------------------------------------------------------------------------------------------------*/


function calcularCuota(valor_solicitar, interes, plazo_tiempo, otros_ingresos, ingresos_mensuales){
    
    let suma=(ingresos_mensuales+otros_ingresos);
    let validacion;

    while(llenarTabla.firstChild){
        llenarTabla.removeChild(llenarTabla.firstChild);
    }
    let fechas = [];
    let fechaActual = Date.now();
    let mes_actual = moment(fechaActual);
    mes_actual.add(1, 'month'); 
    let seguro_vida = 12000;  
    let num_cuota = [];
    let pagoInteres=0, pagoCapital = 0, cuota = 0;

    cuota = valor_solicitar * (Math.pow(1+interes/100, plazo_tiempo)*interes/100)/(Math.pow(1+interes/100, plazo_tiempo)-1);
    cuota2= cuota + seguro_vida;
    validacion=(cuota*100)/suma;
    if(validacion<=50){
        for(let i = 1; i <= plazo_tiempo; i++) {

            pagoInteres = parseFloat(valor_solicitar*(interes/100));
            pagoCapital = cuota - pagoInteres;
            valor_solicitar = parseFloat(valor_solicitar-pagoCapital);
           
            //Formato fechas
            num_cuota[i] = i;
            i= i++;
            fechas[i] = mes_actual.format('DD-MM-YYYY');
            mes_actual.add(1, 'month');
    
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${num_cuota[i]}</td>
                <td>${fechas[i]}</td>
                <td>${cuota.toFixed(0)}</td>
                <td>${cuota2.toFixed(0)}</td>
                <td>${pagoCapital.toFixed(0)}</td>
                <td>${pagoInteres.toFixed(0)}</td>
                <td>${valor_solicitar.toFixed(0)}</td>
            `;
            llenarTabla.appendChild(row)
        }
    }else{
        alert('Sus ingresos no son suficientes para proceder al préstamo.')
    }

}


/*---------------------------------------------------------------------------------------------------*/


function validacion(){
    nombre=document.getElementById('nombre').value;
    direccion=document.getElementById('direccion').value;
    telefono=document.getElementById('telefono').value;
    email=document.getElementById('email').value;
    //alerta (nombre + edad);
    if(nombre==null || nombre.length==0 || /^\s+$/.test(nombre)){
        alert('campo vacio, llenar');
        document.getElementById('nombre').focus();
        return false;
    }

    else if(direccion==null || direccion.length==0 || /^\s+$/.test(direccion)){
        alert('campo vacio, llenar');
        document.getElementById('direccion').focus();
        return false;
    }

    else if(!(/^\d{10}$/.test(telefono))){
        alert('Sus carácteres deben de llenar hasta 10');
        document.getElementById('telefono').focus();
        return false;

    }
    else if(!(/^\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(email))){
        alert('Debe ingresar un email correcto');
        document.getElementById('email').value="";
         document.getElementById('email').focus();
        return false;
    }

}
/******************************************************************************/

