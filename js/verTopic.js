var topicId = getParameterByName('topic_id');
var url="https://examen-laboratoria-sprint-5.herokuapp.com/topics/";
var urlRespuestas= url+topicId+"/responses";

var cargarPagina = function(){
  cargarTema();
  cargarRespuestas();
  $("#nuevoComentario").submit(crearComentario);
};

var cargarTema = function(){
  var urlTopic= url+topicId;
  $.get(urlTopic,function(response){
    mostrarTema(response);
  });
};

var cargarRespuestas = function(){
  $.get(urlRespuestas,function(response){
    response.forEach(function(respuesta){
      mostrarRespuestas(respuesta);
    });
  });
};

var mostrarTema = function(response){
  var $h1= $("<h1/>");
  var $label= $("<label/>");
  $h1.text(response.content);
  $label.text("Por: "+response.author_name);
  $("#tema").append($h1);
  $("#tema").append($label);
};

var mostrarRespuestas = function(respuesta){
  var $contenidoRes=$("<p/>");
  var $autorRes=$("<label/>");
  var $hr = $("<hr/>");
  $contenidoRes.text(respuesta.content);
  $autorRes.text(respuesta.author_name);
  $("#respuestas").append($contenidoRes);
  $("#respuestas").append($autorRes);
  $("#respuestas").append($hr);
};

var crearComentario = function(e){
    e.preventDefault();
    var respuesta = {
      comentario: $("#respuesta").val(),
      autor : $("#autor").val(),
    }
    $.post(urlRespuestas,{
      content : respuesta.comentario,
      author_name : respuesta.autor
    },function(res){
      console.log(res)
      $("#myModal").modal("hide");
      mostrarRespuestas(res);
    });
};
$(document).ready(cargarPagina);
