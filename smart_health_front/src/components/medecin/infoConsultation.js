import React from 'react';
import ConAnciennes from './consAnciennes';

export default function InfoConsultation({counter}){
    return (
        <div className="flex flex-col h-full  ">
                <ConAnciennes counter={counter}/>
      </div>
      
   

    );
}