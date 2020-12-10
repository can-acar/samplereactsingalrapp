//@flow
export type GirisPayload={name:string,clientId:string};


export type IGiris=(payload:GirisPayload)=>({type:"GIRIS",payload:GirisPayload})


type Actions=
    |IGiris


export const onGirisAction=(payload:IGiris):IGiris=>({type:"GIRIS",payload:payload})


