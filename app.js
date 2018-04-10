
// AJAX 
const ROOT_PATH = "http://127.0.0.1:8080";
 const COLLABORATEURS_URI = ROOT_PATH + "/api/collaborateurs";



        const xhttp = new XMLHttpRequest();



        function ajax(xhttp, method, uri, data, callback, xhttpConfig) {
            // console.log("ajax method ", method, " uri ", uri, " data ", data, " callback " + callback);
            xhttp.onreadystatechange = function (event) {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200 || this.status === 201) {
                        //console.log("reponse " + this.responseText);
                        callback(JSON.parse(this.responseText));
                    } else {
                        console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                    }
                }
            };
            xhttp.open(method, uri, true);
            if (xhttpConfig) {
                xhttpConfig(data);
            } else {
                xhttp.send();
            }
        }

        function getAjax(xhttp, uri) {
            //console.log("getAjax " + uri);
            ajax(xhttp, "GET", uri, null, inflateRows, (data) => {
              xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
              xhttp.send();
            });
        }
        function putAjax(xhttp, uri, data) {
            ajax(xhttp, 'PUT', uri, data, (data) => getAjax(xhttp, uri), (data) => {
                xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhttp.setRequestHeader('Content-Type', 'application/json');
                xhttp.send(JSON.stringify(data));
            });
        }
        var sendData = (event) => {
            event.preventDefault();
            var uri = "http://loisirs-web-backend.cleverapps.io/users";
            var name = document.getElementById("name").value;
            var password = document.getElementById("password").value;
            // transformer
            var object = {
                id: "",
                "name": name,
                "password": password
            };
            // console.log(object);
            postAjax(xhttp, uri, object);
        }

// fin AJAX


        //document.getElementById('post').onsubmit = sendData;





var inflateRows = (colabs) => {
  colabs.forEach( c => {
    document.getElementById('bodyTableBanque').appendChild(createRow(c.matricule, c.identite.nom, c.identite.prenom));
  });
}

var inflateBanqueForm = (matricule, banque, iban, bic) => {
  document.getElementById("inputBanque").value = banque;
  document.getElementById("inputIban").value = iban;
  document.getElementById("inputBic").value = bic;
};


var createRow = (matricule, nom, prenom) => {

  var parent = document.createElement('tr');
  parent.setAttribute("id", matricule);
  parent.setAttribute("onclick", inflateBanqueForm(event));

  var td1 = document.createElement('td');
  td1.appendChild(document.createTextNode(matricule));
  var td2 = document.createElement('td');
  td2.appendChild(document.createTextNode(nom));
  var td3 = document.createElement('td');
  td3.appendChild(document.createTextNode(prenom));

  parent.appendChild(td1);
  parent.appendChild(td2);
  parent.appendChild(td3);

  return parent;
}

var colabs = [{ matricule: "ZERZER", nom: "Ksdfsdf", prenom: "Gdfsdf"},
{ matricule: "M00033", nom: "Cvsvs", prenom: "Fsdfsdf"}];

//inflateRows(colabs);

// récupérer la list et l'afficher


getAjax(xhttp, COLLABORATEURS_URI);






