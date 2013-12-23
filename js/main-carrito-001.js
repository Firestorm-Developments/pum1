var carrito_incompleto;
var carrito_activo;
var carrito_activo_minificado = [];
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
        listado = "";
        $.each(data_json, function(index, value) {
                listado += "<li>"+value.cantidad+" "+data_nice[value.oProducto.parent_id].name+" "+value.oProducto.name+"</li>";
        });        

        loading = "<div id=\"sumando\" style=\"display:none\">Anotado!</div>";
        quemas = "<div id=\"quemas\" style=\"display:none\">Que Mas? </div>";
        boton_finalizar = "<div onclick=\"carrito.iniciar_pedido()\" id=\"finalizar_compra\" style=\"display:none\">Realizar Pedido</div>";
        str = "<div id=\"carrito_content\" class=\"carrito_content_fixed\" onclick=\"carrito.abrir_carrito()\"><div id=\"tupedido\">Tu Pedido</div>";
        str += loading+quemas;
        str += "<ul class=\"listado_productos\">"+listado+"</ul>";
        str += boton_finalizar + "</div>";
        $('#tree_content').prepend(str);
        if(animar){$('#sumando').fadeIn(300).delay(300).fadeOut(300, function() {$('#quemas').fadeIn(200).delay(700).fadeOut(200)});}
    },

    abrir_carrito: function() {
        $('.listado_productos').toggle();
        $('#finalizar_compra').toggle();
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
        
        $('#contenedor_header').hide();
        $('#tree_breadcrumb').hide();
        $('.ficha').hide();


        
        $('#carrito_content').removeClass( "carrito_content_fixed" ).addClass( "carrito_content_ficha" );
        this.abrir_carrito();

        if (viewportWidth > 480) {
            //big display
            console.log("big");
        } else {
            //small display
            console.log("small");
        }
    }
};