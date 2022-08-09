import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "filterPatient"
})

export class SearchPatientPipe implements PipeTransform {

    transform(value:any[],searchString:string ){

       if(!searchString){
        //  console.log('no search')
         return value  
       }

       return value.filter(it=>{   
           const builderId = it.doctorName.toString().includes(searchString) 
           const groupName = it.status.toLowerCase().includes(searchString.toLowerCase())
           return (builderId + groupName );      
       }) 
    }
}