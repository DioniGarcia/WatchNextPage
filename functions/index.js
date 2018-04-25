const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

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


