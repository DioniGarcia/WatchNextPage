const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


exports.solicitarDatosTarea3 = functions.https.onRequest((req, res) => {
  var idOprario = req.query.id;
  var tareas = [];

  return admin.firestore().collection('operariosConectados').doc(idOprario.toString()).get()
    .then(doc => {
      tareas=doc.data().tareas

      if (tareas.length == 0)
        return res.status(404).json({"error":"No hay tareas"});
      else
        try {
          return admin.firestore().collection('asignadas').doc(tareas[0].toString()).get()
            .then(doc => {
              var id = doc.get("id")
              var titulo = doc.get("titulo")
              var descripcion = doc.get("descripcion")
              var estimado = doc.get("estimado")
              var prioridad = doc.get("prioridad")
              var etiquetas = doc.get("etiquetas")
              var h_inicio = doc.get("h_inicio")
              var h_fin = doc.get("h_fin")
              var asignable = doc.get("asignable")
              var fecha_realizacion = doc.get("fecha_realizacion")

              res.status(200).json({
                "id": id,
                "titulo": titulo,
                "asignable" : asignable,
                "descripcion": descripcion,
                "fecha_realizacion" : fecha_realizacion,
                "estimado": estimado,
                "prioridad": prioridad,
                "h_inicio" : h_inicio,
                "h_fin" : h_fin,
                "etiquetas":etiquetas
                }
              );
            });
        }catch(e){
        return res.status(404).json({"error":e});
      }
    });
  });

exports.aceptarTarea = functions.https.onRequest((req, res) => {
  //Aceptar tarea (idTara, idOprario)
  //Calcular fecha fin
  //Crear tarea en asignadas
  //Eliminar tarea de sinAsignar
});

exports.loginOperario = functions.https.onRequest((req, res) => {
  var idOperario = req.query.id;
  var pass = req.query.pass;

  if(admin.firestore().collection("operarios").where("id","==",idOperario).where("pass","==",pass.toString())!=null) {
    return res.status(200).json({
      "type":"suscessful",
      "id_operario" : idOperario  ,
      "pass" : pass  ,
      "cosa": admin.firestore().collection("operarios").where("id","==",idOperario).where("pass","==",pass.toString()).get()
       }
    );
  }else {
    return res.status(404).json({
      "type":"error",
      "message" :"Operario does not exists"
    });
  }
});

//Funciones de prueba:
exports.salutare = functions.https.onRequest((req, res) => {
  var nombre = req.query.nombre;
  res.send(nombre+" te gusta comer t... dobladas y sudadas")
});





//Funciones de prueba:
exports.saludar = functions.https.onRequest((req, res) => {
  var nombre = req.query.nombre;
  res.send("Hola "+nombre)
});

exports.asignarTarea = functions.https.onRequest((req, res) => {
  var idOperario = req.query.id;
  console.log('Pide una tarea', idOperario);
  //TODO comprobar que funciona como toca...
  admin.firestore().collection("operariosConectados").doc(idOperario).get().then(snapshot => {
    var etiquetas = snapshot.get("etiquetas")
    var tareas = snapshot.get("tareas")
    console.log('Etiquetas y tareas del operario', etiquetas, tareas);

    admin.firestore().collection('sinAsignar').get().then(snapshot => {
      console.log('Entramos en sinAsignar', snapshot);
      var asignada = false
      for (x = 0; x < snapshot.docs.length && !asignada; x++) {
        var doc = snapshot.docs[x]
        if (doc.get("asignable")) {                //Si la tarea se puede asignar
          console.log('Documento tareas sin asignar', doc);
          console.log('Documentoid', doc.id);
          console.log('Documentoid', doc.data());
          if (etiquetas.length > 0) {           //Si el operario tiene etiquetas
            var etiquetasTarea = doc.get("etiquetas")
            if (etiquetasTarea.length > 0) {    //Solo si la tarea tiene etiquetas
              for (i = 0; i < etiquetasTarea.length; i++) {
                var etq = etiquetasTarea[i]
                if (etiquetas.indexOf(etq) >= 0) {
                  if (tareas.indexOf(doc.id) >= 0) {
                    break
                  } else {
                    admin.firestore().collection("sinAsignar").doc(doc.id).update({asignable: false})
                    admin.firestore().collection("asignadas").doc(doc.id).set(doc.data())
                    if (tareas.indexOf(doc.id) < 0) {
                      tareas.push(doc.id)
                    }
                    admin.firestore().collection("operariosConectados").doc(idOperario).update({"tareas": tareas})
                    asignada = true
                    return res.status(200).json({
                      "type": "exito",
                      "message": "Tarea" + doc.id + " asignada con exito al operario " + idOperario
                    });
                  }
                }
              }
            } else {                          //Si la tarea no tiene etiqueta se asigna automaticamente
              admin.firestore().collection("sinAsignar").doc(doc.id).update({asignable: false})
              admin.firestore().collection("asignadas").doc(doc.id).set(doc.data())
              if (tareas.indexOf(doc.id) < 0) {
                tareas.push(doc.id)
              }
              admin.firestore().collection("operariosConectados").doc(idOperario).update({"tareas": tareas})
              asignada = true
              return res.status(200).json({
                "type": "exito",
                "message": "Tarea" + doc.id + " asignada con exito al operario " + idOperario
              });
            }
          } else {                              //El operario no tiene etiquetas
            if (etiquetasTarea.length == 0) { //Solo miramos las tareas sin etiquetas
              admin.firestore().collection("sinAsignar").doc(doc.id).update({asignable: false})
              admin.firestore().collection("asignadas").doc(doc.id).set(doc.data())
              if (tareas.indexOf(doc.id) < 0) {
                tareas.push(doc.id)
              }
              admin.firestore().collection("operariosConectados").doc(idOperario).update({"tareas": tareas})
              asignada = true
              return res.status(200).json({
                "type": "exito",
                "message": "Tarea" + doc.id + " asignada con exito al operario " + idOperario
              });
            }
          }
        }
        if (asignada) {
          break
        }
      }
      if (!asignada) {
        return res.status(200).json({
          "type": "error",
          "message": "No hay tareas disponibles"
        });
      }
    }).catch(function (error) {
      return res.status(200).json({
        "type": "error",
        "message": e.toString()
      });
    }).catch(function (error) {
      return res.status(200).json({
        "type": "error",
        "message": e.toString()
      });
    });
  }).catch(function (error) {
    return res.status(200).json({
      "type": "error",
      "message": e.toString()
    });
  });
});

exports.finalizarTarea = functions.https.onRequest((req, res) => {
  var idOperario = req.query.idOperario;
  var idTarea = req.query.idTarea;
  var tareas1 = []
  var tarea =
  admin.firestore().collection("operariosConectados").doc(idOperario.toString()).get().then(snapshot => {
    console.log('Tareas dentro snapshot.', snapshot.get("tareas"));
    var tareas1 = snapshot.get("tareas")
    tareas1.indexOf(parseInt(idTarea))
    console.log('Posicion de la tarea', tareas1.indexOf(parseInt(idTarea)))
    tareas1.splice(tareas1.indexOf(parseInt(idTarea)), 1)
    admin.firestore().collection("operariosConectados").doc(idOperario.toString()).update({"tareas": tareas1}).then(function () {
      admin.firestore().collection("asignadas").doc(idTarea).get().then(tarea =>{
        admin.firestore().collection("finalizadas").doc(tarea.id).set(tarea.data()).then(function () {
          admin.firestore().collection("finalizadas").doc(tarea.id).update({"operario" : idOperario})
          admin.firestore().collection("asignadas").doc(idTarea).delete().then(function () {
            return res.status(200).json({
              "status": "finalizada"
            })
          }).catch(function (error) {
            return res.status(400).json({
              "error": error.toString(),
              "mensaje": "Error al borrar"
            })
          })
        }).catch(function (error) {
          return res.status(400).json({
            "error": error.toString(),
            "mensaje": "Error al mover"
          })
        })
      }).catch(function (error) {
        return res.status(400).json({
          "error": error.toString(),
          "mensaje": "Error al actualizar"
        })
      })
    })
    // .catch(function (error) {
    //   return res.status(400).json({
    //     "error": error.toString(),
    //     "mensaje": "Error al actualizar"
    //   })
    // })
  }).catch(function (error) {
    return res.status(400).json({
      "error en snapshot": error.toString(),
      "mensaje": "Error al acceder al operario"
    })
  })
});

exports.PruebasAbry = functions.https.onRequest((req, res) => {
  var idOperario = req.query.id;
  //TODO leer las etiquetas y las tareas como vectores.
  var etiquetasTarea = ["CASA", "CACA", "COLOFON"]
  var entra = false
  try {
    etiquetas = admin.firestore().collection("operariosConectados").doc(idOperario.toString()).onSnapshot(snapshot=>{
      var etiquetas=snapshot.get("etiquetas")
      var tareas=snapshot.get("tareas")
      for( i=0;i<etiquetasTarea.length;i++) {
        var etq=etiquetasTarea[i]
        if (etiquetas.indexOf(etq) >= 0) {
          return res.status(200).json({
            "status" : "encontrada",
            "etiqueta": etq,
            "posicion": etiquetas.indexOf(etq),
            "etiquetasTarea" : etiquetasTarea,
          });
        }
      }
      return res.status(200).json({
        "etiquetas" : etiquetas,
        "tareas": tareas,
        "entre":entra,
        "etiquetasTarea" : etiquetasTarea,
      });
    })

  }catch(e){
    return res.status(400).json({
      "error":e.toString()
    });
  }
});


