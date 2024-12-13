import commonApi from "./commonApi"

// User LOGIN & REGISTER VERIFICATIONS
export const userRegister=(data)=>{
  return commonApi("POST",data,"http://127.0.0.1:8000/register/","")
}

export const userLogin=(data)=>{
  return commonApi("POST",data,"http://127.0.0.1:8000/token","")
}

export const user_data=(header)=>{
  return commonApi("GET","","http://127.0.0.1:8000/users/",header)
}
export const update_user=(data,id,header)=>{
  return commonApi("PUT",data,`http://127.0.0.1:8000/users/${id}/`,header)
}


// 

// RENTEL ITEM MANAGEMENT
export const rental_items=(header)=>{
  return commonApi("GET","","http://127.0.0.1:8000/rental-items/",header)
}

export const list_my_items=(header)=>{
  return commonApi("GET","","http://127.0.0.1:8000/rental-items/list_my_items/",header)
}
export const add_new_item=(data,header)=>{
  return commonApi("POST",data,"http://127.0.0.1:8000/rental-items/",header)
}


// ADDRESSES MANAGEMET

export const user_addresses=(header)=>{
  return commonApi("GET","","http://127.0.0.1:8000/addresses/",header)
}

export const add_addresses=(data,header)=>{
  return commonApi("POST",data,"http://127.0.0.1:8000/addresses/",header)
}

export const update_address=(data,id,header)=>{
  return commonApi("PUT",data,`http://127.0.0.1:8000/addresses/${id}/`,header)
}




