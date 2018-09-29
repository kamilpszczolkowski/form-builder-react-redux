export class FormService {
  static createFirstSubinput = (subInputs, objectId, parentType) => {
    const newSubInputs = [...subInputs];
    let id;
    if (newSubInputs.length) {
      const oldId = newSubInputs[newSubInputs.length - 1].id;
      const placeToCut = oldId.lastIndexOf("_");
      let newId = Number(oldId.slice(placeToCut + 1)) + 1;
      id = objectId + "_" + newId;
    } else {
      id = objectId + "_0";
    }

    let conditionValue = "";
    if (parentType === "yes_no") {
      conditionValue = "yes";
    }

    newSubInputs.push({
      id: id,
      question: "",
      type: "text",
      condition: "equals",
      conditionValue: conditionValue,
      value: "",
      subinputs: []
    });
    return newSubInputs;
  };

  static handleSubInputChange = (type, id, parent, value, callbackFcn) => {
    let newParent = { ...parent };

    let searchValue = array => {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          array[i][type] = value;
          break;
        } else {
          if (array[i].subinputs.length) {
            searchValue(array[i].subinputs);
          }
        }
      }
    };
    searchValue(newParent.subinputs);
    callbackFcn(newParent);
  };

  static deleteSubInput = (id, parent, callbackFcn) => {
    let newParent = { ...parent };

    let searchSubInput = array => {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          array.splice(i, 1);
          break;
        } else {
          if (array[i].subinputs.length) {
            searchSubInput(array[i].subinputs);
          }
        }
      }
    };

    searchSubInput(newParent.subinputs);
    callbackFcn(newParent);
  };

  static createSubInput = (id, parent, callbackFcn) => {
    let newParent = { ...parent };

    let searchSubInput = array => {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          let subId;
          if (array[i].subinputs.length) {
            const oldId = array[i].subinputs[array[i].subinputs.length - 1].id;
            const placeToCut = oldId.lastIndexOf("_");
            let newId = Number(oldId.slice(placeToCut + 1)) + 1;
            subId = id + "_" + newId;
          } else {
            subId = id + "_0";
          }

          array[i].subinputs.push({
            id: subId,
            question: "",
            type: "text",
            condition: "equals",
            conditionValue: "",
            value: "",
            subinputs: []
          });

          break;
        } else {
          if (array[i].subinputs.length) {
            searchSubInput(array[i].subinputs);
          }
        }
      }
    };

    searchSubInput(newParent.subinputs);
    callbackFcn(newParent);
  };

  static isInputVisible = (parent, object) => {
    if (parent.type === "text" || parent.type === "yes_no") {
      return parent.value === object.conditionValue;
    }
    if (object.condition === "equals") {
      return Number(parent.value) === Number(object.conditionValue);
    } else if (object.condition === "greater") {
      return Number(parent.value) > Number(object.conditionValue);
    }
    return Number(parent.value) < Number(object.conditionValue);
  };
}
