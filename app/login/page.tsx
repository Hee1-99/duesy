"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const DEMO_ID = "demo@duesy.app";
const DEMO_PASSWORD = "duesy2026";

export default function LoginPage() {
  const router = useRouter();
  const [id, setId] = useState(DEMO_ID);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (id !== DEMO_ID || password !== DEMO_PASSWORD) {
      setError("데모 계정 정보를 확인해주세요.");
      return;
    }
    sessionStorage.setItem("duesy-demo-session", "active");
    router.push("/demo");
  }

  return <main className="login-shell"><section className="login-copy"><Link href="/" className="back-link"><ArrowLeft size={16}/>소개 페이지</Link><Link href="/" className="brand login-brand">Duesy<span>.</span></Link><h1>회비 장부를<br/>확인해볼까요?</h1><p>미리 입력된 봄학기 동아리 데이터로 핵심 기능을 바로 체험할 수 있습니다.</p><div className="login-proof"><b>데모에서 가능한 작업</b><span>회원 회비 납부 처리</span><span>새 지출 등록과 잔액 확인</span><span>구성원용 공개 장부 전환</span></div></section><section className="login-panel"><form onSubmit={submit}><p className="form-label">Demo workspace</p><h2>로그인</h2><p className="form-description">아래 데모 계정이 미리 입력되어 있습니다.</p><label>이메일<input value={id} onChange={event=>setId(event.target.value)} type="email" autoComplete="username"/></label><label>비밀번호<div className="password-field"><input value={password} onChange={event=>setPassword(event.target.value)} type={visible?"text":"password"} autoComplete="current-password"/><button type="button" aria-label={visible?"비밀번호 숨기기":"비밀번호 보기"} onClick={()=>setVisible(value=>!value)}>{visible?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label>{error?<p className="form-error">{error}</p>:null}<button className="button button-lime login-submit" type="submit">데모 로그인</button><div className="credentials"><span>ID</span><code>{DEMO_ID}</code><span>PW</span><code>{DEMO_PASSWORD}</code></div></form></section></main>;
}
