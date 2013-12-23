var carrito_incompleto;
var carrito_activo;
var carrito_activo_minificado = [];
var carrito_desplegado = false;
var carrito_iniciado = false;
var carrito = {

    init: function() {
        var self = this;
		self.vaciar_carrito();
        if (typeof $.cookie('carrito_incompleto') !== 'undefined') {
            carrito_activo_minificado = $.cookie('carrito_incompleto');
            if (carrito_activo_minificado.length > 0) {
                self.recuperar_carrito(carrito_activo_minificado)  
            }
        }
    },

    vaciar_carrito: function() {
        var self = this;
   		carrito_activo = [];
	    return carrito_activo;
    },

    agregar_item: function(producto_id) {
    	var self = this;
    	var oProducto = data_nice[producto_id];
    	var item_carrito = {"id":producto_id,"cantidad":$("#slct_"+producto_id).val(),"oProducto":oProducto};
        var item_nuevo = true;

    	if (carrito_activo.length > 0) {
    		//Hay algo en el carrito
	    	$.each(carrito_activo, function(index, value) {
	    		if(value.id == item_carrito.id) {
	    			value.cantidad = (parseInt(value.cantidad) + parseInt(item_carrito.cantidad)).toString();
                    item_nuevo = false;
	    		}
	    	});
            if (item_nuevo == true) {
                carrito_activo.push(item_carrito);
            }
    	} else {
    		//Carrito Vacio
            carrito_activo.push(item_carrito);
    	}
        self.render_carrito(carrito_activo, true);
    },

    render_carrito: function(data_json, animar) {
        var self = this;
        self.minificar_carrito_activo(data_json);
        $.cookie('carrito_incompleto', carrito_activo_minificado, { expires: 30 , path : '/' });
        $('#carrito_content').remove();
        animar = typeof animar !== 'undefined' ? animar : false;
        prelistado = "<thead><th>Item</th><th>Subtotal</th></tr></thead>";
        listado = "<tbody>";
        totalCarrito = 0;
        $.each(data_json, function(index, value) {
                subTotalItem = (parseInt(value.cantidad)*parseFloat(value.oProducto.precio));
                listado += "<tr><td>"+value.cantidad+" "+data_nice[value.oProducto.parent_id].name+": "+value.oProducto.name+"</td><td style=\"text-align:right\">$ "+subTotalItem.toFixed(2)+"</td></tr>";
                totalCarrito += subTotalItem;        
        });
        listado += "</tbody>";  
        //postlistado = "<tfoot><tr><td colspan=\"2\">Total $ "+ totalCarrito.toFixed(2) +"</td></tr></tfoot>";
        loading = "<div id=\"sumando\" style=\"display:none\">Anotado!</div>";
        quemas = "<div id=\"quemas\" style=\"display:none\">Que Mas? </div>";
        boton_finalizar = "<div onclick=\"carrito.iniciar_pedido()\" id=\"bot_finalizar_compra\">Realizar Pedido</div>";
        str = "<div id=\"carrito_content\" class=\"carrito_content_fixed\"><div id=\"tupedido\" onclick=\"carrito.abrir_carrito()\">Tu Pedido</div>";
        str += loading+quemas;
        str += "<table id=\"listado_productos\">"+prelistado+listado+"</table>";
        str += "<div id=\"total_a_pagar\">Total $ "+ totalCarrito.toFixed(2) +"</div>";
        str += boton_finalizar + "</div>";
        $('#tree_content').prepend(str);
        if(animar){$('#sumando').fadeIn(300).delay(300).fadeOut(300, function() {$('#quemas').fadeIn(200).delay(700).fadeOut(200)});}
    },

    abrir_carrito: function() {
        var self = this;
        if(carrito_desplegado == true) {
            $('#listado_productos').hide();
            $('#total_a_pagar').hide();
            $('#bot_finalizar_compra').hide();
            $('#carrito_content').removeClass( "carrito_content_ficha" ).addClass( "carrito_content_fixed" );
            $('#bot_enviar_pedido').hide();    
            $('#div_form_datos_carrito').hide();                  
            carrito_desplegado = false;    
        } else {
            $('#listado_productos').show();
            $('#total_a_pagar').show();
            $('#bot_finalizar_compra').show(); 
            $('#carrito_content').removeClass( "carrito_content_fixed" ).addClass( "carrito_content_ficha" );            
            carrito_desplegado = true;
            if (carrito_iniciado == true) {
                $('#bot_finalizar_compra').hide();
                $('#bot_enviar_pedido').show();    
                $('#div_form_datos_carrito').show();
            } else {
                $('#bot_finalizar_compra').show();
                $('#bot_enviar_pedido').hide();    
                $('#div_form_datos_carrito').hide();                
            }
        }
    },

    recuperar_carrito: function(data_json) {
        var self = this;
         $.each(data_json, function(index, value) {
            item_carrito_nomin = {"id":value.i,"cantidad":value.c,"oProducto":data_nice[value.i]}
            carrito_activo.push(item_carrito_nomin);
        });
        self.render_carrito(carrito_activo);
    },

    limpiar_carrito: function() {
        $('#carrito_content').remove();
        $.removeCookie('carrito_incompleto', { path: '/' });
        carrito_activo = [];
    },

    minificar_carrito_activo: function(data_json) {
        carrito_activo_minificado = [];
        var self = this;
        var m_item_carrito;
        var pre_min = data_json;
        $.each(pre_min, function(index, value) {
            carrito_activo_minificado.push({"i":value.id,"c":value.cantidad});
        });
        return carrito_activo_minificado;
    },

    iniciar_pedido: function() {
        var self = this;
        carrito_iniciado = true;
        $('#bot_finalizar_compra').hide();
        source = $("#tpl_form_datos_carrito").html();
        template = Handlebars.compile(source);

        data = {
          telefono: "",
          direccion: ""
        };

        $("#carrito_content").append(template(data));
        $('#bot_enviar_pedido').show();
        carta.acomodar_scroll('total_a_pagar');

        /*if (viewportWidth > 480) {
            console.log("big");
        } else {
            console.log("small");
        }*/
       
    },

    enviar_pedido: function() {
        var self = this;    
        console.log("enviando...");
    }
};