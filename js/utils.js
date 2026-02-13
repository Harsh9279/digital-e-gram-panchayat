export function qs(sel){ return document.querySelector(sel); }
export function qsa(sel){ return [...document.querySelectorAll(sel)]; }

export function fmtTime(ts){
  try{
    if(!ts) return "-";
    const d = ts?.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString();
  }catch(e){ return String(ts); }
}

export function safeText(s){
  if(s === null || s === undefined) return "";
  return String(s);
}

export function statusBadge(status){
  const s = (status||"").toLowerCase();
  if(s === "approved") return {cls:"ok", label:"Approved"};
  if(s === "rejected") return {cls:"danger", label:"Rejected"};
  if(s === "under review") return {cls:"warn", label:"Under Review"};
  return {cls:"warn", label:"Pending"};
}

export function toast(msg, ok=true){
  const t = document.querySelector("#toast");
  if(!t){ alert(msg); return; }
  t.style.display = "block";
  t.innerHTML = `<div style="font-weight:700;margin-bottom:2px">${ok?"✅":"❌"} ${ok?"Success":"Error"}</div>
                 <div class="small">${safeText(msg)}</div>`;
  setTimeout(()=> t.style.display="none", 3200);
}

export function requireQueryParam(name){
  const u = new URL(window.location.href);
  const v = u.searchParams.get(name);
  if(!v) throw new Error(`Missing query param: ${name}`);
  return v;
}
