import { Activity, AlertTriangle, Gauge, Radio, TrainFront, Wrench, Zap } from 'lucide-react'
import { alarms, kpis } from './data'
import './styles.css'

function Panel({title,code,children,className=''}:any){
  return <section className={`panel ${className}`}>
    <header className="panel-head">
      <div><span className="panel-code">{code}</span><h3>{title}</h3></div>
      <span className="status-dot"/>
    </header>
    <div className="panel-body">{children}</div>
  </section>
}

function Hero(){
  return <section className="hero">
    <div className="hero-top">
      <div>
        <span className="eyebrow">SYSTEM HERO / DIGITAL TWIN</span>
        <h2>铁路网络实时运营数字孪生</h2>
      </div>
      <div className="hero-state">全网运行正常</div>
    </div>

    <div className="twin">
      <svg viewBox="0 0 980 570" className="twin-svg">
        <defs>
          <linearGradient id="track">
            <stop offset="0%" stopColor="#1f3855"/>
            <stop offset="55%" stopColor="#27d3e2"/>
            <stop offset="100%" stopColor="#1f3855"/>
          </linearGradient>
        </defs>

        {[0,1,2,3,4,5,6].map(i =>
          <line key={i} x1="90" y1={150+i*44} x2="890" y2={110+i*48} stroke="#17314b" strokeWidth="1"/>
        )}

        <polygon points="295,215 650,190 772,300 405,338" fill="#0d2237" stroke="#294b68" strokeWidth="2"/>
        <polygon points="333,244 612,224 698,285 416,308" fill="#102b45" stroke="#315873"/>

        {[0,1,2,3].map(i =>
          <line key={i} x1="120" y1={245+i*48} x2="865" y2={210+i*53} stroke="url(#track)" strokeWidth="7"/>
        )}

        <g transform="translate(470 230) rotate(-4)">
          <rect x="-110" y="-23" width="220" height="46" rx="22" fill="#dfeaf4"/>
          <rect x="-63" y="-10" width="105" height="19" rx="8" fill="#17344f"/>
          <path d="M110,-23 Q145,0 110,23 Z" fill="#eaf5fc"/>
        </g>

        {[
          ['北京南',260,120],['南京南',710,160],['上海虹桥',850,300],['济南西',460,365]
        ].map(([n,x,y]) =>
          <g key={String(n)}>
            <circle cx={Number(x)} cy={Number(y)} r="7" fill="#27d3e2"/>
            <circle cx={Number(x)} cy={Number(y)} r="16" fill="none" stroke="#27d3e2" strokeOpacity=".35"/>
            <text x={Number(x)+18} y={Number(y)+4} fill="#c8e8f2" fontSize="14">{n}</text>
          </g>
        )}

        <path d="M260 120 C390 100,570 130,710 160 S810 250,850 300" fill="none" stroke="#27d3e2" strokeDasharray="8 9" strokeWidth="2.5"/>
      </svg>

      <div className="hero-overlay top-left"><span>运行列车</span><b>1,847</b><small>实时同步</small></div>
      <div className="hero-overlay bottom-right"><span>平均间隔偏差</span><b>+18s</b><small>轻微偏高</small></div>
    </div>

    <div className="hero-footer">
      <span><Radio size={15}/> 调度同步 100%</span>
      <span><Activity size={15}/> 遥测节点 128</span>
      <span><Gauge size={15}/> 数据延迟 42ms</span>
    </div>
  </section>
}

export default function Dashboard(){
  return <main className="dashboard-shell">
    <div className="dashboard">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark"><TrainFront size={20}/></div>
          <div>
            <strong>智慧铁路运营指挥中心</strong>
            <span>SMART RAILWAY OPERATION CENTER</span>
          </div>
        </div>
        <div className="top-meta">
          <span>SHIFT A</span>
          <span>2026-08-09 19:42:18</span>
          <span className="global-state">● NETWORK NORMAL</span>
        </div>
      </header>

      <section className="kpi-row">
        {kpis.map((k,i)=>
          <article className="kpi" key={k[0]}>
            <div className="kpi-top"><span>{k[0]}</span><span className={i===4?'warn':''}>{k[3]}</span></div>
            <div className="kpi-value">{k[1]}<small>{k[2]}</small></div>
            <div className="microbars">
              {[22,35,28,42,54,46,63,58,72,68].map((v,n)=><i key={n} style={{height:`${v}%`}}/> )}
            </div>
          </article>
        )}
      </section>

      <section className="grid">
        <div className="left-stack">
          <Panel title="线路运行负载" code="OPS / 01">
            {['京沪高铁','京广高铁','沪昆高铁','郑西高铁'].map((x,i)=>
              <div className="bar-row" key={x}>
                <div className="bar-label"><span>{x}</span><b>{[82,76,69,58][i]}%</b></div>
                <div className="bar-track"><i style={{width:`${[82,76,69,58][i]}%`}}/></div>
              </div>
            )}
          </Panel>

          <Panel title="旅客流量趋势" code="FLOW / 02">
            <svg className="chart" viewBox="0 0 360 160" preserveAspectRatio="none">
              <path d="M0 140 C45 120,65 70,110 92 S175 135,220 80 S290 45,360 60" fill="none" stroke="#27d3e2" strokeWidth="3"/>
              <path d="M0 148 C45 138,70 130,110 126 S175 98,220 108 S290 78,360 85" fill="none" stroke="#5f7690" strokeWidth="2"/>
            </svg>
          </Panel>

          <Panel title="能源消耗" code="ENERGY / 03">
            <div className="energy">
              <Zap size={24}/>
              <div><b>12.7 GWh</b><span>牵引供电 / 今日</span></div>
              <div className="energy-index">-1.9%</div>
            </div>
          </Panel>
        </div>

        <Hero/>

        <div className="right-stack">
          <Panel title="关键告警" code="ALERT / 04">
            <div className="alarm-list">
              {alarms.map(a =>
                <div className={`alarm ${a[0]}`} key={a[1]}>
                  <AlertTriangle size={15}/>
                  <div><b>{a[1]}</b><span>{a[2]} · {a[3]}</span></div>
                </div>
              )}
            </div>
          </Panel>

          <Panel title="设备健康度" code="ASSET / 05">
            <div className="health-grid">
              {['信号','道岔','供电','通信'].map((x,i)=>
                <div key={x}>
                  <span>{x}</span><b>{[99.8,98.9,99.4,99.7][i]}%</b>
                  <i style={{width:`${[99.8,98.9,99.4,99.7][i]}%`}}/>
                </div>
              )}
            </div>
          </Panel>

          <Panel title="维护与工单" code="MRO / 06">
            <div className="maintenance">
              <Wrench size={22}/>
              <div><b>23</b><span>开放工单</span></div>
              <div><b>7</b><span>处理中</span></div>
              <div><b>16</b><span>待派发</span></div>
            </div>
          </Panel>
        </div>
      </section>

      <section className="bottom-row">
        <Panel title="事件时间线" code="INCIDENT / 07" className="bottom-panel">
          <div className="timeline">
            {['19:24 南京南信号异常','19:31 调度确认','19:36 班组到场','19:42 预计恢复'].map((x,i)=>
              <div key={x}><i className={i===0?'hot':''}/><span>{x}</span></div>
            )}
          </div>
        </Panel>

        <Panel title="恢复进度" code="RECOVERY / 08" className="bottom-panel">
          <div className="recovery"><span>事件恢复计划</span><b>68%</b><div><i style={{width:'68%'}}/></div></div>
        </Panel>

        <Panel title="调度指令" code="DISPATCH / 09" className="bottom-panel">
          <div className="dispatch"><span>限速命令</span><b>2</b><span>站台调整</span><b>3</b><span>备用编组</span><b>4</b></div>
        </Panel>
      </section>
    </div>
  </main>
}
