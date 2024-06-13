import { ErrorHandler } from "../utils/error";
import { User } from "./user.model";

const getUsersProfileService = async (id:string) => {   
  const user = await User.findById(id); 
  return user;
};



const updateUsersProfileService = async (id: string, payload: Record<string,  string >) => {  
  const updates: Record<string, unknown> = {}
  const allowedUpdates = ["name", "phone"];

  if(payload && typeof payload === "object"){
    for(const key in payload) {
      if(allowedUpdates.includes(key)) {
        updates[key] = payload[key]
      }
    }
  }
  
  const result = await User.findByIdAndUpdate(id, updates, {new: true, });
  return result;
};

export const userService = {
  getUsersProfileService, 
  updateUsersProfileService
}
