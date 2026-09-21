const menuItems = [
  { label: 'Overview', active: true },
  { label: 'Orders', active: false },
  { label: 'Customers', active: false },
  { label: 'Analytics', active: false },
  { label: 'Settings', active: false },
];

const summaryCards = [
  { title: 'Total Revenue', value: '₩128.4M', change: '+12.8%', tone: 'positive' },
  { title: 'Active Users', value: '2,481', change: '+4.3%', tone: 'positive' },
  { title: 'Pending Orders', value: '184', change: '-2.1%', tone: 'negative' },
  { title: 'Conversion Rate', value: '6.24%', change: '+0.8%', tone: 'positive' },
] as const;

const activities = [
  { title: '신규 결제 완료', detail: 'Enterprise 플랜 3건이 결제되었습니다.', time: '방금 전' },
  { title: '재고 임계치 도달', detail: '상위 판매 상품 2개의 재고가 10개 이하입니다.', time: '12분 전' },
  { title: '주간 리포트 생성', detail: '운영 리포트가 자동 생성되어 공유되었습니다.', time: '1시간 전' },
];

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <strong>Admin Pro</strong>
            <p>Operations Center</p>
          </div>
        </div>

        <nav className="menu">
          {menuItems.map((item) => (
            <button key={item.label} className={`menu-item${item.active ? ' active' : ''}`}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <span>이번 달 목표</span>
          <strong>78%</strong>
          <p>매출 목표까지 22% 남았습니다.</p>
        </div>
      </aside>

      <main className="content">
        <header className="hero">
          <div>
            <span className="eyebrow">Dashboard</span>
            <h1>서비스 현황을 한눈에 확인하세요</h1>
            <p>핵심 지표와 최근 활동을 빠르게 확인할 수 있는 어드민 메인 페이지입니다.</p>
          </div>
          <button className="primary-button">Download Report</button>
        </header>

        <section className="card-grid">
          {summaryCards.map((card) => (
            <article key={card.title} className="stat-card">
              <span>{card.title}</span>
              <strong>{card.value}</strong>
              <p className={card.tone === 'positive' ? 'positive' : 'negative'}>{card.change} from last month</p>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="panel panel-wide">
            <div className="panel-header">
              <div>
                <span className="eyebrow">Performance</span>
                <h2>매출 추이</h2>
              </div>
              <span className="pill">Updated 5 min ago</span>
            </div>

            <div className="chart">
              {[42, 68, 54, 80, 61, 88, 72].map((height, index) => (
                <div key={index} className="bar-group">
                  <div className="bar" style={{ height: `${height}%` }} />
                  <span>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">Live</span>
                <h2>최근 활동</h2>
              </div>
            </div>

            <div className="activity-list">
              {activities.map((activity) => (
                <div key={activity.title} className="activity-item">
                  <div className="activity-dot" />
                  <div>
                    <strong>{activity.title}</strong>
                    <p>{activity.detail}</p>
                  </div>
                  <span>{activity.time}</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
