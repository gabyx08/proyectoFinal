var url="https://examen-laboratoria-sprint-5.herokuapp.com/topics";
var cargarPagina = function(){
  cargarTemas();
  $("#nuevoTema").submit(crearTema);
  $("#buscar").submit(buscarTema);
  $(document).on("click",$(".topic"), irVerTopic);
};
var cargarTemas = function(){
  var urlTemas= url;
  $.get(urlTemas,function(response){
    response.forEach(function(tema){
      mostrarTemas(tema);
    });
  });
};

var mostrarTemas = function(tema){
  var infoTema = {
    nombreTema: tema.content,
    respuestas : tema.responses_count,
    autor : tema.author_name,
    id : tema.id
  };
  var $seccionTemas = $("#temas");
  var $tr= $("<tr/>");
  var $hr = $("<hr/>");
  var $tdTema= $("<td/>",{"class":"topic","data-id":infoTema.id});
  $tdTema.text(infoTema.nombreTema);
  var $tdAutor= $("<td/>");
  $tdAutor.text("Por: " +infoTema.autor);
  var $tdRespuestas= $("<td/>");
  $tdRespuestas.text("Respuestas: "+infoTema.respuestas);
  $tr.append($tdTema);
  $tr.append($tdAutor);
  $tr.append($tdRespuestas);
  $seccionTemas.append($tr);
  $seccionTemas.append($hr);
};

var buscarTema = function(e){
  e.preventDefault();
  var arrayTema = [];
  $.get(url,function(response){
      response.forEach(function(tema){
      arrayTema.push(tema);
    });
  });
  filtrar(arrayTema);
};

var filtrar = function (arreglo){
  var aBuscar = $("#aBuscar").val().toLowerCase();
  var temasFiltrados = arreglo.filter(function(topic){
    return topic.content.toLowerCase().indexOf(aBuscar) >= 0;
	});
console.log("temasFiltrados",temasFiltrados)
};

var crearTema = function(e){
  e.preventDefault();
  var nuevoTema = {
    nombreTema: $("#nombreTema").val(),
    autor : $("#autor").val(),
  }
  $.post(url,{
    content : nuevoTema.nombreTema,
    author_name : nuevoTema.autor,
  },function(tema){
    $("#myModal").modal("hide");
    mostrarTemas(tema);
    console.log("crearTema",tema)
  });
};

var irVerTopic = function(){
  var tema = $(event.target)
  var id= tema.data("id");
  location.href = "verTopic.html?topic_id="+id;
};

$(document).ready(cargarPagina);
