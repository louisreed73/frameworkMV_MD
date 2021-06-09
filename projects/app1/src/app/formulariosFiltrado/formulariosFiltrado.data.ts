import { FormArray, FormControl, FormGroup } from "@angular/forms";

let config1 = [
     {
          tipo: "array",
          name: "tipo documental",
     },
     {
          tipo: "date",
          name: "fecha tramitacion",
          values: ["desde", "hasta"],
     },
     {
          tipo: "array",
          name: "tipo procedimiento",
     },
     {
          tipo: "input",
          name: "procedimiento nº / año",
          values: ["numero", "año"],
     },
     {
          tipo: "array",
          name: "magistrado",
     },
];

let form1: FormGroup = new FormGroup({
     [`arrayData0`]: new FormArray([]),

     ["fecha tramitacion"]: new FormGroup({
          ["desde"]: new FormControl(""),
          ["hasta"]: new FormControl(""),
     }),

     [`arrayData2`]: new FormArray([]),

     ["procedimiento nº / año"]: new FormGroup({
          ["numero"]: new FormControl(""),
          ["año"]: new FormControl(""),
     }),

     [`arrayData4`]: new FormArray([]),
});

/**
 *
 * Block comment
 *
 */

let config2 = [
     {
          tipo: "array",
          name: "tipo documental",
     },
     {
          tipo: "date",
          name: "fecha tramitacion",
          values: ["desde", "hasta"],
     },
     {
          tipo: "array",
          name: "tipo procedimiento",
     },
     {
          tipo: "input",
          name: "procedimiento nº / año",
          values: ["numero", "año"],
     },
     {
          tipo: "array",
          name: "magistrado",
     },
     {
          tipo: "checkbox",
          name: "tipo resolucion",
          multi: true,
          values: [],
     },
     {
          tipo: "date",
          name: "fecha resolucion",
          values: [],
     },
];

let form2: FormGroup = new FormGroup({
     [`arrayData0`]: new FormArray([]),

     ["fecha tramitacion"]: new FormGroup({
          ["desde"]: new FormControl(""),
          ["hasta"]: new FormControl(""),
     }),

     [`arrayData2`]: new FormArray([]),

     ["procedimiento nº / año"]: new FormGroup({
          ["numero"]: new FormControl(""),
          ["año"]: new FormControl(""),
     }),

     [`arrayData4`]: new FormArray([]),

     ["tipo resolucion"]: new FormGroup({
          ["auto"]: new FormControl(""),
          ["sentencia"]: new FormControl(""),
     }),

     ["fecha resolucion"]: new FormGroup({
          ["desde"]: new FormControl(""),
          ["hasta"]: new FormControl(""),
     }),
});

let config3 = [
     {
          tipo: "array",
          name: "tipo documental",
     },
     {
          tipo: "date",
          name: "fecha tramitacion",
          values: ["desde", "hasta"],
     },
     {
          tipo: "array",
          name: "tipo procedimiento",
     },
     {
          tipo: "input",
          name: "procedimiento nº / año",
          values: ["numero", "año"],
     },
     {
          tipo: "array",
          name: "magistrado",
     },

     {
          tipo: "array",
          name: "tipo escrito",
     },
     {
          tipo: "date",
          name: "fecha presentacion",
     },
];

let form3: FormGroup = new FormGroup({
     [`arrayData0`]: new FormArray([]),

     ["fecha tramitacion"]: new FormGroup({
          ["desde"]: new FormControl(""),
          ["hasta"]: new FormControl(""),
     }),

     [`arrayData2`]: new FormArray([]),

     ["procedimiento nº / año"]: new FormGroup({
          ["numero"]: new FormControl(""),
          ["año"]: new FormControl(""),
     }),

     [`arrayData4`]: new FormArray([]),

     [`arrayData5`]: new FormArray([]),

     ["fecha presentacion"]: new FormGroup({
          ["desde"]: new FormControl(""),
          ["hasta"]: new FormControl(""),
     }),
});

export { config1, config2, config3, form1, form2, form3 };
