"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, Check, ChevronRight, CircleDollarSign, LayoutDashboard, LogOut, Menu, Plus, ReceiptText, Search, Settings, Users, X } from "lucide-react";

type Member = { id:number; name:string; studentId:string; role:string; paid:boolean; paidAt:string };
type Expense = { id:number; title:string; category:string; amount:number; date:string; memo:string };
type Workspace = { members:Member[]; expenses:Expense[] };

const STORAGE_KEY = "duesy-demo-v1";
const DUES = 120000;
const initialData: Workspace = {
  members: [
    [1,"김서연","20231234","회장",true,"2026. 03. 05."],[2,"이준호","20231235","부회장",true,"2026. 03. 06."],[3,"박민지","20231236","운영팀",true,"2026. 03. 07."],[4,"최현우","20231237","운영팀",true,"2026. 03. 08."],[5,"정다은","20231238","기획팀",true,"2026. 03. 09."],[6,"한지민","20231239","기획팀",true,"2026. 03. 10."],[7,"이서진","20231240","디자인팀",true,"2026. 03. 11."],[8,"김도윤","20231241","디자인팀",true,"2026. 03. 12."],[9,"남지훈","20231242","홍보팀",false,"-"],[10,"오세린","20231243","홍보팀",false,"-"],[11,"유하늘","20231244","학술팀",false,"-"],[12,"신예은","20231245","학술팀",true,"2026. 03. 13."],
  ].map(([id,name,studentId,role,paid,paidAt])=>({id:Number(id),name:String(name),studentId:String(studentId),role:String(role),paid:Boolean(paid),paidAt:String(paidAt)})),
  expenses: [
    {id:1,title:"회의실 대관료",category:"공간",amount:120000,date:"2026. 04. 12.",memo:"4월 정기회의"},
    {id:2,title:"총동아리연합회 분담금",category:"운영",amount:250000,date:"2026. 04. 05.",memo:"학기 분담금"},
    {id:3,title:"간식비 (스터디)",category:"식비",amount:85000,date:"2026. 03. 28.",memo:"신입생 스터디"},
    {id:4,title:"홍보 포스터 인쇄",category:"홍보",amount:70000,date:"2026. 03. 20.",memo:"A2 포스터 20장"},
    {id:5,title:"OT 다과비",category:"식비",amount:110000,date:"2026. 03. 14.",memo:"신입생 OT"},
  ],
};

const money = new Intl.NumberFormat("ko-KR", { style:"currency", currency:"KRW", maximumFractionDigits:0 });

export default function DemoPage() {
  const [workspace,setWorkspace]=useState<Workspace>(initialData);
  const [view,setView]=useState<"dashboard"|"members"|"expenses"|"public">("dashboard");
  const [query,setQuery]=useState("");
  const [status,setStatus]=useState<"all"|"paid"|"unpaid">("all");
  const [modal,setModal]=useState(false);
  const [mobileNav,setMobileNav]=useState(false);
  const [toast,setToast]=useState("");
  const [ready,setReady]=useState(false);

  useEffect(()=>{const handle=window.setTimeout(()=>{const saved=localStorage.getItem(STORAGE_KEY);if(saved){try{setWorkspace(JSON.parse(saved) as Workspace);}catch{localStorage.removeItem(STORAGE_KEY);}}setReady(true);},0);return()=>window.clearTimeout(handle);},[]);
  useEffect(()=>{if(ready)localStorage.setItem(STORAGE_KEY,JSON.stringify(workspace));},[ready,workspace]);

  const paidCount=workspace.members.filter(member=>member.paid).length;
  const income=paidCount*DUES;
  const spending=workspace.expenses.reduce((sum,item)=>sum+item.amount,0);
  const balance=income-spending;
  const filteredMembers=useMemo(()=>workspace.members.filter(member=>(status==="all"||status==="paid"&&member.paid||status==="unpaid"&&!member.paid)&&`${member.name}${member.studentId}`.includes(query.trim())),[workspace.members,query,status]);

  function notify(message:string){setToast(message);window.setTimeout(()=>setToast(""),2200);}
  function togglePaid(id:number){setWorkspace(current=>({...current,members:current.members.map(member=>member.id===id?{...member,paid:!member.paid,paidAt:member.paid?"-":"2026. 04. 18."}:member)}));notify("납부 상태를 변경했습니다.");}
  function addExpense(form:FormData){const title=String(form.get("title")||"").trim();const amount=Number(form.get("amount"));if(!title||amount<=0)return;setWorkspace(current=>({...current,expenses:[{id:Date.now(),title,category:String(form.get("category")),amount,date:"2026. 04. 18.",memo:String(form.get("memo")||"")},...current.expenses]}));setModal(false);notify("지출이 장부에 등록되었습니다.");}
  function resetDemo(){setWorkspace(initialData);notify("데모 데이터를 초기화했습니다.");}

  const navItems=[{id:"dashboard",label:"대시보드",icon:LayoutDashboard},{id:"members",label:"회비 관리",icon:Users},{id:"expenses",label:"지출 내역",icon:ReceiptText},{id:"public",label:"공개 장부",icon:BookOpen}] as const;
  const title={dashboard:"2026 봄학기 운영비",members:"회비 관리",expenses:"지출 내역",public:"구성원 공개 장부"}[view];

  return <main className="app-shell">
    <aside className={`sidebar ${mobileNav?"sidebar-open":""}`}><div className="sidebar-head"><Link href="/" className="brand">Duesy<span>.</span></Link><button className="icon-button mobile-only" onClick={()=>setMobileNav(false)} aria-label="메뉴 닫기"><X size={20}/></button></div><nav>{navItems.map(item=><button key={item.id} className={view===item.id?"active":""} onClick={()=>{setView(item.id);setMobileNav(false)}}><item.icon size={19}/>{item.label}</button>)}</nav><div className="sidebar-bottom"><button onClick={resetDemo}><Settings size={19}/>데모 초기화</button><Link href="/login"><LogOut size={19}/>로그아웃</Link></div></aside>
    <section className="app-main"><header className="app-topbar"><button className="icon-button mobile-only" onClick={()=>setMobileNav(true)} aria-label="메뉴 열기"><Menu/></button><div className="top-user"><span>김</span><b>김서연</b></div></header><div className="app-content"><div className="page-heading"><div><h1>{title}</h1><p>{view==="public"?"구성원이 로그인 없이 확인하는 읽기 전용 화면입니다.":"우리 동아리의 회비와 지출을 투명하게 관리해요."}</p></div><div className="period">운영 기간&nbsp; 2026. 03. 01. &nbsp;–&nbsp; 2026. 06. 30.</div></div>
      {view==="dashboard"?<><section className="stats"><article><span>현재 잔액</span><strong>{money.format(balance)}</strong><p>총 수입 {money.format(income)} <i/> 총 지출 {money.format(spending)}</p></article><article><span>회비 납부율</span><div className="stat-line"><strong>{Math.round(paidCount/workspace.members.length*100)}%</strong><p>{paidCount} / {workspace.members.length}명</p></div><div className="progress"><i style={{width:`${paidCount/workspace.members.length*100}%`}}/></div></article><article><span>최근 지출</span><strong>{money.format(workspace.expenses[0]?.amount||0)}</strong><p>{workspace.expenses[0]?.date} · {workspace.expenses[0]?.title}</p></article></section><section className="dashboard-grid"><MemberLedger members={filteredMembers} query={query} status={status} onQuery={setQuery} onStatus={setStatus} onToggle={togglePaid}/><RecentExpenses expenses={workspace.expenses} onAdd={()=>setModal(true)} onViewAll={()=>setView("expenses")}/></section></>:null}
      {view==="members"?<section className="single-panel"><div className="panel-title"><div><h2>전체 회원</h2><p>{paidCount}명 납부 · {workspace.members.length-paidCount}명 미납</p></div></div><MemberLedger members={filteredMembers} query={query} status={status} onQuery={setQuery} onStatus={setStatus} onToggle={togglePaid} bare/></section>:null}
      {view==="expenses"?<section className="single-panel"><div className="panel-title"><div><h2>전체 지출</h2><p>누적 {money.format(spending)} · {workspace.expenses.length}건</p></div><button className="button button-lime" onClick={()=>setModal(true)}><Plus size={17}/>지출 등록</button></div><ExpenseTable expenses={workspace.expenses}/></section>:null}
      {view==="public"?<PublicLedger balance={balance} income={income} spending={spending} expenses={workspace.expenses}/>:null}
    </div></section>
    {modal?<ExpenseModal onClose={()=>setModal(false)} onSubmit={addExpense}/>:null}{toast?<div className="toast"><Check size={16}/>{toast}</div>:null}
  </main>;
}

function MemberLedger({members,query,status,onQuery,onStatus,onToggle,bare=false}:{members:Member[];query:string;status:string;onQuery:(v:string)=>void;onStatus:(v:"all"|"paid"|"unpaid")=>void;onToggle:(id:number)=>void;bare?:boolean}){return <section className={bare?"ledger-bare":"panel member-panel"}>{bare?null:<div className="panel-title"><h2>회비 관리 <small>{members.length}명</small></h2></div>}<div className="table-tools"><label><Search size={17}/><input value={query} onChange={event=>onQuery(event.target.value)} placeholder="이름 또는 학번으로 검색"/></label><select value={status} onChange={event=>onStatus(event.target.value as "all"|"paid"|"unpaid")}><option value="all">전체 상태</option><option value="paid">납부 완료</option><option value="unpaid">미납</option></select></div><div className="table-wrap"><table><thead><tr><th>이름</th><th>학번</th><th>역할</th><th>납부 상태</th><th>납부일</th><th>금액</th></tr></thead><tbody>{members.map(member=><tr key={member.id}><td><b>{member.name}</b></td><td>{member.studentId}</td><td>{member.role}</td><td><button className={`status ${member.paid?"paid":"unpaid"}`} onClick={()=>onToggle(member.id)}><i/>{member.paid?"납부 완료":"미납"}</button></td><td>{member.paidAt}</td><td>{member.paid?money.format(DUES):"-"}</td></tr>)}</tbody></table></div></section>}
function RecentExpenses({expenses,onAdd,onViewAll}:{expenses:Expense[];onAdd:()=>void;onViewAll:()=>void}){return <aside className="panel expenses-rail"><div className="panel-title"><h2>최근 지출</h2><button onClick={onViewAll}>전체 보기 <ChevronRight size={15}/></button></div><div>{expenses.slice(0,5).map(item=><article key={item.id}><div><b>{item.title}</b><span>{item.date}</span></div><strong>-{money.format(item.amount)}</strong></article>)}</div><button className="button button-lime full" onClick={onAdd}><Plus size={18}/>지출 등록</button></aside>}
function ExpenseTable({expenses}:{expenses:Expense[]}){return <div className="table-wrap"><table><thead><tr><th>사용처</th><th>분류</th><th>날짜</th><th>메모</th><th>금액</th></tr></thead><tbody>{expenses.map(item=><tr key={item.id}><td><b>{item.title}</b></td><td>{item.category}</td><td>{item.date}</td><td>{item.memo||"-"}</td><td><b>-{money.format(item.amount)}</b></td></tr>)}</tbody></table></div>}
function PublicLedger({balance,income,spending,expenses}:{balance:number;income:number;spending:number;expenses:Expense[]}){return <section className="public-ledger"><div className="public-intro"><div><span>Duesy 공개 장부</span><h2>프론티어 기획동아리<br/>2026 봄학기</h2><p>2026년 4월 18일 기준으로 총무가 공개한 내역입니다.</p></div><div className="public-balance"><span>현재 잔액</span><strong>{money.format(balance)}</strong><p>수입 {money.format(income)} · 지출 {money.format(spending)}</p></div></div><div className="public-list"><div><b>최근 공개 지출</b><span>총 {expenses.length}건</span></div>{expenses.map(item=><article key={item.id}><time>{item.date}</time><b>{item.title}</b><span>{item.category}</span><strong>-{money.format(item.amount)}</strong></article>)}</div><p className="public-foot">회원 이름, 학번, 납부 상태는 공개 장부에 표시하지 않습니다.</p></section>}
function ExpenseModal({onClose,onSubmit}:{onClose:()=>void;onSubmit:(form:FormData)=>void}){return <div className="modal-backdrop" role="presentation" onMouseDown={event=>{if(event.currentTarget===event.target)onClose()}}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="expense-title"><div className="modal-head"><div><p>Expense</p><h2 id="expense-title">지출 등록</h2></div><button className="icon-button" onClick={onClose} aria-label="닫기"><X/></button></div><form action={onSubmit}><label>사용처<input name="title" placeholder="예: 정기회의 대관료" required autoFocus/></label><div className="form-grid"><label>분류<select name="category"><option>공간</option><option>식비</option><option>홍보</option><option>운영</option><option>기타</option></select></label><label>금액<input name="amount" type="number" min="1" placeholder="120000" required/></label></div><label>메모<textarea name="memo" placeholder="구성원이 이해할 수 있도록 사용 목적을 적어주세요."/></label><div className="modal-actions"><button className="button button-ghost" type="button" onClick={onClose}>취소</button><button className="button button-lime" type="submit">장부에 등록</button></div></form></section></div>}
