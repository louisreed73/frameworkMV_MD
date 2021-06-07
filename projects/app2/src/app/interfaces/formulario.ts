export interface Formulario {
    id:number;
    formGroup_Title:string;
    multi?:boolean;
    type:string;
    formGroup_controls:Array<{
        for_label:string;
        formControl_Name:string;
        value:string;
    }>
}
