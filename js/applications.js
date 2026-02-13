import { db } from "./firebase.js";
import { logAction } from "./logger.js";

import {
  collection, addDoc, getDocs, query, where, orderBy,
  doc, updateDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

export async function applyForService({userId, applicantName, serviceId, serviceName}){
  const docRef = await addDoc(collection(db,"applications"), {
    userId,
    serviceId,
    serviceName,
    applicantName,
    submittedAt: serverTimestamp(),
    status: "Pending",
    remarks: "",
    updatedBy: "",
    updatedAt: ""
  });

  await logAction({
    action:"USER_APPLIED_SERVICE",
    performedBy:userId,
    role:"user",
    details:`Applied for: ${serviceName} (${serviceId}) appId=${docRef.id}`
  });

  return docRef.id;
}

export async function listMyApplications({userId}){
  const q = query(
    collection(db,"applications"),
    where("userId","==",userId),
    orderBy("submittedAt","desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d=>({id:d.id, ...d.data()}));
}

export async function listAllApplications(){
  const q = query(collection(db,"applications"), orderBy("submittedAt","desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d=>({id:d.id, ...d.data()}));
}

export async function updateApplicationStatus({applicationId, status, remarks, updatedBy, role}){
  await updateDoc(doc(db,"applications",applicationId), {
    status,
    remarks: remarks || "",
    updatedBy,
    updatedAt: serverTimestamp()
  });

  await logAction({
    action:"UPDATE_APPLICATION_STATUS",
    performedBy: updatedBy,
    role,
    details:`Updated app ${applicationId} -> ${status}`
  });
}
