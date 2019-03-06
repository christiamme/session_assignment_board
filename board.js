$(document).ready(function() {
  // Crear tabla Asignaciones
  tabla_asignaciones = $("#tabla_asignaciones").DataTable({
    responsive: true,
    columnDefs: [
      { responsivePriority: 1, targets: [0, 1, 2] },
      { targets: [0, 1, 2], className: 'center-cell' }
    ],
    language: {
      decimal: "",
      emptyTable: "Sin información disponible",
      info: "Mostrando registros _START_ a _END_ de _TOTAL_",
      infoEmpty: "Mostrando 0 registros de 0 disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ registros",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Busca por nómina, UF o salón:",
      zeroRecords: "Ningún registro encontrado",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Previo"
      },
      aria: {
        sortAscending: ": activar para ordenar ascendente",
        sortDescending: ": activar para ordenar descendente"
      }
    }
  });

  // Poblar tablas con los datos

  var url =
    "https://spreadsheets.google.com/feeds/list/1zQEgNDIwC8QBDTX0lu4hougGBuVmkXMYNOh7u8WzgBg/30/public/values?alt=json";

  $.getJSON(url, function(data) {
    var entry = data.feed.entry;
    $(entry).each(function() {
      add_a_Row(this, tabla_asignaciones);
    });
  });

});

function add_a_Row(objeto, tabla_a_actualizar){
  tabla_a_actualizar.row.add([
    objeto.gsx$nómina.$t,
    objeto.gsx$clave.$t,
    objeto.gsx$salón.$t
  ]).draw();
  return;
}
