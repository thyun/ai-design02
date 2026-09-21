const menuItems = [
  { label: 'Overview', meta: 'Home', active: true },
  { label: 'Payments', meta: 'Billing', active: false },
  { label: 'Customers', meta: 'CRM', active: false },
  { label: 'Analytics', meta: 'Data', active: false },
  { label: 'Developers', meta: 'API', active: false },
];

const summaryCards = [
  { title: 'Gross volume', value: '₩128.4M', change: '+12.8%', tone: 'positive' },
  { title: 'Net revenue', value: '₩24.7M', change: '+6.2%', tone: 'positive' },
  { title: 'New customers', value: '2,481', change: '+4.3%', tone: 'positive' },
  { title: 'Risk reviews', value: '184', change: '-2.1%', tone: 'negative' },
] as const;

const activities = [
  { title: '신규 결제 승인', detail: '해외 카드 결제 3건이 승인되었습니다.', time: '방금 전' },
  { title: '정산 리포트 생성', detail: '이번 주 정산 리포트가 재무팀에 공유되었습니다.', time: '18분 전' },
  { title: 'API 키 재발급', detail: '프로덕션 키가 보안 정책에 따라 갱신되었습니다.', time: '1시간 전' },
];

const bars = [
  { label: 'Mon', value: '₩12M', height: 34 },
  { label: 'Tue', value: '₩18M', height: 56 },
  { label: 'Wed', value: '₩15M', height: 48 },
  { label: 'Thu', value: '₩24M', height: 76 },
  { label: 'Fri', value: '₩20M', height: 64 },
  { label: 'Sat', value: '₩28M', height: 88 },
  { label: 'Sun', value: '₩22M', height: 70 },
];

function App() {
  return (
    <div className="page-shell">
      <div className="hero-mesh" aria-hidden="true">
        <div className="mesh mesh-cream" />
        <div className="mesh mesh-lemon" />
        <div className="mesh mesh-lavender" />
        <div className="mesh mesh-indigo" />
        <div className="mesh mesh-ruby" />
      </div>

      <div className="dashboard-shell">
        <aside className="sidebar">
          <div className="brand-block">
            <div className="brand-mark">A</div>
            <div>
              <p className="brand-eyebrow">Admin Pro</p>
              <strong>Operations</strong>
            </div>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <button key={item.label} className={`nav-item${item.active ? ' active' : ''}`}>
                <span>{item.label}</span>
                <small>{item.meta}</small>
              </button>
            ))}
          </nav>

          <article className="sidebar-card">
            <span className="eyebrow">Monthly target</span>
            <strong className="tabular">78%</strong>
            <p>이번 달 거래액 목표 달성까지 22% 남았습니다.</p>
            <button className="dark-button">View milestones</button>
          </article>
        </aside>

        <main className="content">
          <header className="hero-card">
            <div className="hero-copy">
              <span className="soft-pill">Overview</span>
              <h1>결제와 운영 상태를 한 화면에서 관리하세요</h1>
              <p>
                DESIGN.md의 Stripi 규칙에 맞춘 메인 대시보드입니다. 핵심 수치, 매출 추이,
                운영 이벤트를 빠르게 파악할 수 있도록 구성했습니다.
              </p>
            </div>

            <div className="hero-actions">
              <button className="secondary-button">Docs</button>
              <button className="primary-button">Download report</button>
            </div>
          </header>

          <section className="stats-grid">
            {summaryCards.map((card) => (
              <article key={card.title} className="feature-card">
                <span className="card-label">{card.title}</span>
                <strong className="card-value tabular">{card.value}</strong>
                <p className={`card-change ${card.tone}`}>{card.change} from last month</p>
              </article>
            ))}
          </section>

          <section className="main-grid">
            <article className="mockup-card">
              <div className="section-head">
                <div>
                  <span className="eyebrow">Performance</span>
                  <h2>주간 거래액 추이</h2>
                </div>
                <span className="section-note tabular">Updated 5 min ago</span>
              </div>

              <div className="chart-area">
                {bars.map((bar) => (
                  <div key={bar.label} className="bar-column">
                    <span className="bar-value tabular">{bar.value}</span>
                    <div className="bar-rail">
                      <div className="bar-fill" style={{ height: `${bar.height}%` }} />
                    </div>
                    <span className="bar-label">{bar.label}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="cream-card">
              <div className="section-head">
                <div>
                  <span className="eyebrow">Live</span>
                  <h2>최근 활동</h2>
                </div>
              </div>

              <div className="activity-list">
                {activities.map((activity) => (
                  <div key={activity.title} className="activity-item">
                    <div className="activity-badge" />
                    <div className="activity-copy">
                      <strong>{activity.title}</strong>
                      <p>{activity.detail}</p>
                    </div>
                    <span className="activity-time tabular">{activity.time}</span>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
