import { FormArray, FormControl, FormGroup } from "@angular/forms";

/**
 *
 * Properties, values
 * and types of different filters
 * forms - Documentos
 * config1
 *
 */
let config1 = [
  {
    tipo: "array",
    name: "tipo_documental",
  },
  {
    tipo: "date",
    name: "fecha_tramitacion",
    values: ["desde", "hasta"],
  },
  {
    tipo: "array",
    name: "tipo_procedimiento",
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

/**
 *
 * Forms Groups reactive Forms
 * different filters
 * forms - Documentos
 * config3
 *
 */
let form1: FormGroup = new FormGroup({
  [`arrayData0`]: new FormArray([]),

  ["fecha_tramitacion"]: new FormGroup({
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
 * Properties, values
 * and types of different filters
 * forms - Resoluciones
 * config2
 *
 */
let config2 = [
  {
    tipo: "array",
    name: "tipo_documental",
  },
  {
    tipo: "date",
    name: "fecha_tramitacion",
    values: ["desde", "hasta"],
  },
  {
    tipo: "array",
    name: "tipo_procedimiento",
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
    name: "tipo_resolucion",
    multi: true,
    values: [],
  },
  {
    tipo: "date",
    name: "fecha_resolucion",
    values: [],
  },
];

/**
 *
 * Forms Groups reactive Forms
 * different filters
 * forms - Resoluciones
 * config3
 *
 */
let form2: FormGroup = new FormGroup({
  [`arrayData0`]: new FormArray([]),

  ["fecha_tramitacion"]: new FormGroup({
    ["desde"]: new FormControl(""),
    ["hasta"]: new FormControl(""),
  }),

  [`arrayData2`]: new FormArray([]),

  ["procedimiento nº / año"]: new FormGroup({
    ["numero"]: new FormControl(""),
    ["año"]: new FormControl(""),
  }),

  [`arrayData4`]: new FormArray([]),

  ["tipo_resolucion"]: new FormGroup({
    ["auto"]: new FormControl(""),
    ["sentencia"]: new FormControl(""),
  }),

  ["fecha_resolucion"]: new FormGroup({
    ["desde"]: new FormControl(""),
    ["hasta"]: new FormControl(""),
  }),
});

/**
 *
 * Properties, values
 * and types of different filters
 * forms - Escritos
 * config3
 *
 */
let config3 = [
  {
    tipo: "array",
    name: "tipo_documental",
  },
  {
    tipo: "date",
    name: "fecha_tramitacion",
    values: ["desde", "hasta"],
  },
  {
    tipo: "array",
    name: "tipo_procedimiento",
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
    name: "tipo_escrito",
  },
  {
    tipo: "date",
    name: "fecha_presentacion",
  },
];

/**
 *
 * Forms Groups reactive Forms
 * different filters
 * forms - Escritos
 * config3
 *
 */
let form3: FormGroup = new FormGroup({
  [`arrayData0`]: new FormArray([]),

  ["fecha_tramitacion"]: new FormGroup({
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

  ["fecha_presentacion"]: new FormGroup({
    ["desde"]: new FormControl(""),
    ["hasta"]: new FormControl(""),
  }),
});

/**
 *
 * Exporting configuration
 * base for filters forms
 *
 */
export { config1, config2, config3, form1, form2, form3 };
