const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


exports.solicitarDatosTarea = functions.https.onRequest((req, res) => {

  var idOprario = req.query.id;
  var tareas = [];

  return admin.firestore().collection('operariosConectados').doc(idOprario.toString()).get()
    .then(doc => {
      tareas=doc.data().tareas

      if (tareas.length == 0)
        res.status(404).send("No hay tareas");
      else

        return admin.firestore().collection('sinAsignar').doc(tareas[0]).get()
          .then(doc => {
            var titulo = doc.data().titulo
            var descripcion = doc.data().descripcion
            var estimado=  doc.data().estimado
            var prioridad=  doc.data().prioridad

            res.status(200).json("{ "+
              "titulo: '"+titulo+"', "+
              "descripcion: '"+descripcion+"', "+
              "estimado: '"+estimado+"', "+
              "prioridad: '"+prioridad+"'"
              +" }"
            );
          });
    });
  });



  //operariosConectados.doc(idOprario).get(tareas)
  //if tareas.lenght = 0
  //   resp "No hay tareas"
  //else
  //   resp "tarea.json"

exports.saludar = functions.https.onRequest((req, res) => {

  var nombre = req.query.nombre;

  res.send("Hola "+nombre)

});

exports.asignarTarea = functions.https.onRequest((req, res) => {
  var titulo = req.query.titulo;

  return admin.firestore().collection('sinAsignar').doc('123456').set({
    asignable: true,
    descripcion: "Descripción",
    estimado: parseInt(20),
    pausable: true,
    titulo: titulo
  }).then((snapshot) => {
    res.send("Tarea creada")
  });
});


