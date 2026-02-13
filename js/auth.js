import { auth, db } from "./firebase.js";
import { toast } from "./utils.js";
import { logAction } from "./logger.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
  doc, setDoc, getDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

export async function registerUser({name, email, phone, password}){
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  await setDoc(doc(db, "users", uid), {
    name, email, phone,
    role: "user",
    createdAt: serverTimestamp()
  });

  await logAction({
    action: "USER_REGISTER",
    performedBy: uid,
    role: "user",
    details: `User registered: ${email}`
  });

  toast("Account created successfully.");
  window.location.href = "login.html";
}

export async function loginUser({email, password}){
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  const snap = await getDoc(doc(db, "users", uid));
  const role = snap.exists() ? snap.data().role : "user";

  console.log("UID =", uid);
  console.log("ROLE FROM FIRESTORE =", role);


  await logAction({
    action: "USER_LOGIN",
    performedBy: uid,
    role,
    details: `Login success: ${email}`
  });

  toast("Login successful.");

  if(role === "admin") window.location.href = "dashboard-admin.html";
  else if(role === "staff") window.location.href = "dashboard-staff.html";
  else window.location.href = "dashboard-user.html";
}

export async function logoutUser(){
  const uid = auth.currentUser?.uid || "";
  let role = "unknown";
  try{
    if(uid){
      const snap = await getDoc(doc(db,"users",uid));
      role = snap.exists() ? snap.data().role : "unknown";
    }
  }catch(e){}

  await logAction({
    action: "USER_LOGOUT",
    performedBy: uid,
    role,
    details: "User logged out"
  });

  await signOut(auth);
  window.location.href = "index.html";
}

export function protectPage({allowedRoles=[]}){
  // Call this on protected pages.
  return new Promise((resolve, reject)=>{
    onAuthStateChanged(auth, async (user)=>{
      if(!user){
        window.location.href = "login.html";
        return;
      }
      const snap = await getDoc(doc(db,"users", user.uid));
      const data = snap.exists() ? snap.data() : {role:"user"};
      if(allowedRoles.length && !allowedRoles.includes(data.role)){
        toast("Unauthorized access.", false);
        window.location.href = "index.html";
        return;
      }
      resolve({user, profile:data});
    });
  });
}
