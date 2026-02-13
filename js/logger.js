import { db } from "./firebase.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

export async function logAction({action, performedBy, role, details}){
  // Logging is mandatory for every action per requirement.
  try{
    await addDoc(collection(db, "logs"), {
      action,
      performedBy: performedBy || "anonymous",
      role: role || "unknown",
      details: details || "",
      timestamp: serverTimestamp()
    });
  }catch(e){
    // Never throw logging errors to user flows.
    console.warn("Logging failed:", e);
  }
}
