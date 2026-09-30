import Link from "next/link";
import { ArrowRight, Check, LockKeyhole, ReceiptText, Users } from "lucide-react";

export default function Home() {
  return <main className="landing">
    <nav className="landing-nav"><Link href="/" className="brand">Duesy<span>.</span></Link><div><Link href="#features">기능</Link><Link href="/login" className="button button-dark">데모 로그인</Link></div></nav>
    <section className="hero"><div className="hero-copy"><h1>동아리 회계,<br/>누구나 이해할 수 있게</h1><p>회비 납부부터 지출 내역, 잔액까지 한 화면에서 관리하고 구성원에게 투명하게 공유하세요.</p><div className="hero-actions"><Link href="/login" className="button button-lime">데모 사용하기 <ArrowRight size={18}/></Link><a href="#workflow" className="text-link">작동 방식 보기</a></div><p className="demo-note">데모 계정 · demo@duesy.app / duesy2026</p></div><div className="hero-ledger"><div className="mini-head"><b>2026 봄학기 운영비</b><span>공개 중</span></div><strong>₩1,240,000</strong><p>현재 사용할 수 있는 잔액</p><div className="meter"><i/></div><div className="mini-row"><span>회비 납부</span><b>18 / 24명</b></div><div className="mini-row"><span>이번 달 지출</span><b>₩275,000</b></div></div></section>
    <section id="features" className="feature-band"><article><Users/><h2>납부 현황</h2><p>미납자를 검색하고 납부 상태를 바로 갱신합니다.</p></article><article><ReceiptText/><h2>지출 장부</h2><p>사용처와 금액을 기록하면 잔액이 자동 계산됩니다.</p></article><article><LockKeyhole/><h2>투명 공개</h2><p>민감한 정보 없이 구성원용 공개 장부를 공유합니다.</p></article></section>
    <section id="workflow" className="workflow"><div><p className="section-index">01</p><h2>총무의 반복 업무를<br/>하나의 흐름으로</h2></div><ol><li><Check/><div><b>회원과 회비를 등록</b><p>학번, 역할, 납부 여부를 한 명씩 확인합니다.</p></div></li><li><Check/><div><b>지출을 기록</b><p>카테고리와 사용처를 남기면 예산 현황이 갱신됩니다.</p></div></li><li><Check/><div><b>장부를 공유</b><p>구성원은 로그인 없이 공개 내역을 확인합니다.</p></div></li></ol></section>
    <footer><span className="brand">Duesy<span>.</span></span><p>학생 팀이 만든 동아리 회계 관리 MVP</p><Link href="/login">데모 열기</Link></footer>
  </main>;
}
