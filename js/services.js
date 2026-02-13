import { db } from "./firebase.js";
import { logAction } from "./logger.js";

import {
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
  serverTimestamp, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

export async function listServices(){
  const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d=>({id:d.id, ...d.data()}));
}

export async function createService({serviceName, description, requiredDocs, isActive, adminUid}){
  const docRef = await addDoc(collection(db, "services"), {
    serviceName,
    description,
    requiredDocs: requiredDocs || [],
    isActive: !!isActive,
    createdBy: adminUid,
    createdAt: serverTimestamp()
  });

  await logAction({
    action:"ADMIN_CREATE_SERVICE",
    performedBy: adminUid,
    role:"admin",
    details:`Created service: ${serviceName} (${docRef.id})`
  });

  return docRef.id;
}

export async function updateService({serviceId, patch, adminUid}){
  await updateDoc(doc(db,"services",serviceId), patch);

  await logAction({
    action:"ADMIN_UPDATE_SERVICE",
    performedBy: adminUid,
    role:"admin",
    details:`Updated service: ${serviceId}`
  });
}

export async function deleteService({serviceId, adminUid}){
  await deleteDoc(doc(db,"services",serviceId));

  await logAction({
    action:"ADMIN_DELETE_SERVICE",
    performedBy: adminUid,
    role:"admin",
    details:`Deleted service: ${serviceId}`
  });
}
