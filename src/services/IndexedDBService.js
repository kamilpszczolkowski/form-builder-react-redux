import * as DBErrors from "./IndexedDBErrors";

const objectStoreName = "inputs";

export class IndexedDBService {
  static openDB = callbackFcn => {
    if (!window.indexedDB) {
      window.alert(DBErrors.NoIndexedDBSupport);
    } else {
      let request = window.indexedDB.open("FormBuilderDB", 1);
      request.onerror = () => {
        alert(DBErrors.ErorrOpenDB);
      };
      request.onsuccess = () => {
        let objectStore = request.result
          .transaction(objectStoreName)
          .objectStore(objectStoreName)
          .getAll();
        objectStore.onsuccess = () => {
          callbackFcn(request.result, event.target.result);
        };
        objectStore.onerror = () => {
          alert(DBErrors.ErorrReadDB);
        };
      };
      request.onupgradeneeded = () => {
        event.target.result.createObjectStore(objectStoreName, { keyPath: "id" });
      };
    }
  };

  static addInput = (dbConnected, inputs, callbackFcn) => {
    let newId;
    if (inputs.length) {
      newId = inputs[inputs.length - 1].id + 1;
    } else {
      newId = 0;
    }

    let request = dbConnected
      .transaction([objectStoreName], "readwrite")
      .objectStore(objectStoreName)
      .add({
        id: newId,
        question: "",
        type: "text",
        value: "",
        subinputs: []
      });

    request.onsuccess = () => {
      let objectStore = dbConnected
        .transaction(objectStoreName)
        .objectStore(objectStoreName)
        .getAll();
      objectStore.onsuccess = event => {
        callbackFcn(event.target.result);
      };
      objectStore.onerror = () => {
        alert(DBErrors.ErorrReadDB);
      };
    };

    request.onerror = () => {
      alert(DBErrors.ErrorAddData);
    };
  };

  static updateInput = (dbConnected, inputData, callbackFcn) => {
    let request = dbConnected
      .transaction([objectStoreName], "readwrite")
      .objectStore(objectStoreName)
      .put(inputData);

    request.onsuccess = () => {
      let objectStore = dbConnected
        .transaction(objectStoreName)
        .objectStore(objectStoreName)
        .getAll();
      objectStore.onsuccess = event => {
        callbackFcn(event.target.result);
      };
      objectStore.onerror = () => {
        alert(DBErrors.ErorrReadDB);
      };
    };

    request.onerror = () => {
      alert(DBErrors.ErrorUpdateData);
    };
  };

  static deleteInput = (dbConnected, inputId, callbackFcn) => {
    let request = dbConnected
      .transaction([objectStoreName], "readwrite")
      .objectStore(objectStoreName)
      .delete(inputId);

    request.onsuccess = () => {
      let objectStore = dbConnected
        .transaction(objectStoreName)
        .objectStore(objectStoreName)
        .getAll();
      objectStore.onsuccess = event => {
        callbackFcn(event.target.result);
      };
      objectStore.onerror = () => {
        alert(DBErrors.ErorrReadDB);
      };
    };

    request.onerror = () => {
      alert(DBErrors.ErrorUpdateData);
    };
  };
}
