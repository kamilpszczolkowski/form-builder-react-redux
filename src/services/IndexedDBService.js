export class IndexedDBService {
  static openDB = callbackFcn => {
    let request = window.indexedDB.open("FormBuilderDB", 1);
    request.onerror = function() {
      alert("Error while opening the database");
    };
    request.onsuccess = function() {
      let objectStore = request.result
        .transaction("inputs")
        .objectStore("inputs")
        .getAll();
      objectStore.onsuccess = function(event) {
        callbackFcn(request.result, event.target.result);
      };
      objectStore.onerror = function() {
        alert("Error while reading from the database");
      };
    };
    request.onupgradeneeded = function(event) {
      event.target.result.createObjectStore("inputs", { keyPath: "id" });
    };
  };

  static addInput = (dbConnected, inputs, callbackFcn) => {
    let newId;
    if (inputs.length) {
      newId = inputs[inputs.length - 1].id + 1;
    } else {
      newId = 0;
    }

    let request = dbConnected
      .transaction(["inputs"], "readwrite")
      .objectStore("inputs")
      .add({
        id: newId,
        question: "",
        type: "text",
        value: "",
        subinputs: []
      });

    request.onsuccess = function() {
      let objectStore = dbConnected
        .transaction("inputs")
        .objectStore("inputs")
        .getAll();
      objectStore.onsuccess = function(event) {
        callbackFcn(event.target.result);
      };
      objectStore.onerror = function() {
        alert("Error while reading from the database");
      };
    };

    request.onerror = function() {
      alert("Unable to add data to database");
    };
  };

  static updateInput = function(dbConnected, inputData, callbackFcn) {
    let request = dbConnected
      .transaction(["inputs"], "readwrite")
      .objectStore("inputs")
      .put(inputData);

    request.onsuccess = function() {
      let objectStore = dbConnected
        .transaction("inputs")
        .objectStore("inputs")
        .getAll();
      objectStore.onsuccess = function(event) {
        callbackFcn(event.target.result);
      };
      objectStore.onerror = function() {
        alert("Error while reading from the database");
      };
    };

    request.onerror = function() {
      alert("Error while updating data");
    };
  };

  static deleteInput = function(dbConnected, inputId, callbackFcn) {
    let request = dbConnected
      .transaction(["inputs"], "readwrite")
      .objectStore("inputs")
      .delete(inputId);

    request.onsuccess = function() {
      let objectStore = dbConnected
        .transaction("inputs")
        .objectStore("inputs")
        .getAll();
      objectStore.onsuccess = function(event) {
        callbackFcn(event.target.result);
      };
      objectStore.onerror = function() {
        alert("Error while reading from the database");
      };
    };

    request.onerror = function() {
      alert("Error while updating data");
    };
  };
}
