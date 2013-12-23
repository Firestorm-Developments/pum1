var data_plain;
var data_nice;
//var carta_full;
var carta_activa;
var carta = {

    init: function() {
        var self = this;
		data_plain = Main_data(0);
		var data_temp = {};
		for (var i=0;i<data_plain.length;i++) {
			var obj = data_plain[i];
			data_temp[obj.id] = obj;
		}
		data_nice = data_temp;
		self.generate_tree(data_plain, '1');
		carta_activa = self.get_tree(data_plain, '1');
		self.render_tree(carta_activa);
		self.render_breadcrumb(carta_activa);
    },

    generate_tree: function(data_array, parent_id) {
		var tree = {};
	    for(var i = 0; i < data_array.length; i++){
	        var obj = data_array[i];
	        obj.items= [];
	        tree[obj.id] = obj;
	        var parent = obj.parent_id || '0';
	        if(!tree[parent]){
	            tree[parent] = {
	                items: []
	            };
	        }
	        tree[parent].items.push(obj);
	    }
	    return tree[parent_id].items;
    },
    get_tree: function(data_array, parent_id) {
   		var obj_seccion = null;
	    for(var i = 0; i < data_array.length; i++){
	        var obj = data_array[i];
	        if(obj.id == parent_id) {
	        	obj_seccion = obj;
	        }
	    }
	    return obj_seccion;
    },

    render_tree: function(data_array){
		str = "";
		$('#tree_content').html(str);
		$.each(data_array.items, function(index, value) {
			opciones = "<div><p>Elegir <select id=\"slct_"+value.id+"\">";			
			$.each(this.rangos, function(index1, value1) {
				opciones += "<option value='"+value1.valor+"'>"+value1.nombre+"</option>";
			})
			opciones += "</select>";
			opciones += "&nbsp;</p>";
			opciones += "<p style=\"float:right\"><button class='agregar-button' onclick='carrito.agregar_item(\""+value.id+"\")'>Quiero!</button></p><div style=\"height: 6em\" class=\"cf\"></div></div>";
			ficha_opc = "<div id='opc_"+value.id+"' class='ficha-opciones'>"+opciones+"</div>";
			accion = (value.items.length > 0)?" onclick='carta.go_to(\""+value.id+"\")'":" onclick='$(\".ficha-opciones\").hide();$(\"#opc_"+value.id+"\").show();'";
			if(value.mostrar == "imagen") {
				str += "<div class='g3 ficha'><h4>"+value.name+"</h4><div class='foto-retro'>"+ficha_opc+"<img width='100%' "+accion+" data-original='"+value.img_path+"' src='images/grey.gif' class='lazy' /></div></div>";
			} else {
				str += "<div class='g3 ficha'><h4"+accion+">"+value.name+"</h4>"+ficha_opc+"</div></div>";
			}

		});
		$('#tree_content').html(str);
		$("img.lazy").lazyload();

		var pos = $("#tree_content").position();
		window.scrollTo(0,pos.top);
    },

    go_to: function(donde) {
    	var self = this;
    	carta_activa = self.get_tree(data_plain, donde);
    	self.render_tree(carta_activa);
    	self.render_breadcrumb(carta_activa);
    	if (carrito_activo.length > 0) {
    		carrito.render_carrito(carrito_activo);
    	}
    },

    render_breadcrumb: function(data_json) {
    	accion = (data_json.parent_id == "0")?"":" onclick='carta.go_to(\""+data_json.parent_id+"\")'";
    	icono = (data_json.parent_id == "0")?"":"<img class=\"menu-icon\" src=\"images/level-up-icon.png\" />";
		str = "<ul id=\"tree_breadcrumb\"><li"+accion+">"+icono+data_json.name+"</li></ul>";
    	$('#tree_content').prepend(str);
    }
};

$(document).ready(function() {
	carta.init();
	carrito.init();
});
$(window).hashchange( function(){
	console.log( location.hash );
})