export class PacienteModel{
    //id: number= 0;
    //titulo?: string;
    static utlimo_id: number = 0;

    constructor(public id: number, public fecha: Date, public titulo: string, public obraSocial: string, public sexo: string, public edad: string, public dni: string){
      PacienteModel.utlimo_id++;
      id = PacienteModel.utlimo_id;
      //new Date(year, monthIndex, day, hours, minutes, seconds)

    }
}
