const demoData = {
  properties: [
    ['18 Willow Close','PE3 9QJ','Emma Carter','£925','Occupied','Good'],
    ['42 Thorpe Road','PE3 6AP','Daniel Hughes','£1,250','Occupied','Due soon'],
    ['7 Orchard Mews','PE2 8LF','Priya Shah','£1,050','Occupied','Good'],
    ['116 Park Road','PE1 2TR','—','£895','Available','Good'],
    ['29 Riverside Walk','PE2 9BF','Oliver Reed','£1,175','Occupied','Action'],
    ['5 Cathedral View','PE1 1YX','Sophie Grant','£975','Occupied','Good']
  ],
  landlords: [
    ['Amelia Hart','8','£8,725','amelia.hart@example.com','Active'],
    ['James Whitmore','5','£5,340','james.whitmore@example.com','Active'],
    ['Nina Patel','4','£4,150','nina.patel@example.com','Active'],
    ['Oliver Grant','3','£3,275','oliver.grant@example.com','Active']
  ],
  tenants: [
    ['Emma Carter','18 Willow Close','£925','12 Feb 2025','Active'],
    ['Daniel Hughes','42 Thorpe Road','£1,250','04 Jun 2024','Active'],
    ['Priya Shah','7 Orchard Mews','£1,050','18 Nov 2025','Active'],
    ['Oliver Reed','29 Riverside Walk','£1,175','01 Mar 2026','Arrears'],
    ['Sophie Grant','5 Cathedral View','£975','22 Sep 2025','Active']
  ],
  applicants: [
    ['Marcus Green','116 Park Road','Viewing booked','31 Jul 2026 · 16:30','New'],
    ['Lily Bennett','116 Park Road','References','29 Jul 2026','In progress'],
    ['Adam Clarke','18 Willow Close','Enquiry','28 Jul 2026','New']
  ],
  compliance: [
    ['18 Willow Close','Gas Safety','18 Aug 2026','18 days','Due soon'],
    ['42 Thorpe Road','EICR','04 Aug 2026','4 days','Action required'],
    ['7 Orchard Mews','EPC','11 Nov 2027','468 days','Valid'],
    ['29 Riverside Walk','Smoke & CO','31 Jul 2026','Today','Action required'],
    ['5 Cathedral View','Gas Safety','22 Sep 2026','53 days','Valid']
  ],
  maintenance: [
    ['M-2048','29 Riverside Walk','Leaking kitchen tap','Medium','Contractor assigned'],
    ['M-2047','42 Thorpe Road','Intermittent boiler pressure','High','Awaiting visit'],
    ['M-2046','18 Willow Close','Loose cupboard hinge','Low','Reported'],
    ['M-2045','7 Orchard Mews','Bathroom extractor fan','Medium','Quote received']
  ],
  documents: [
    ['Gas-Safety-18-Willow.pdf','18 Willow Close','Compliance','30 Jul 2026'],
    ['Inventory-42-Thorpe.pdf','42 Thorpe Road','Inventory','28 Jul 2026'],
    ['Tenancy-Agreement-7-Orchard.pdf','7 Orchard Mews','Tenancy','24 Jul 2026'],
    ['Contractor-Quote-M2047.pdf','42 Thorpe Road','Maintenance','23 Jul 2026'],
    ['Landlord-Statement-July.pdf','Amelia Hart','Finance','31 Jul 2026']
  ],
  finance: [
    ['18 Willow Close','Emma Carter','01 Jul 2026','£925.00','£925.00','£0.00','Paid'],
    ['42 Thorpe Road','Daniel Hughes','01 Jul 2026','£1,250.00','£1,250.00','£0.00','Paid'],
    ['7 Orchard Mews','Priya Shah','01 Jul 2026','£1,050.00','£1,050.00','£0.00','Paid'],
    ['29 Riverside Walk','Oliver Reed','01 Jul 2026','£1,175.00','£250.00','£925.00','Part paid'],
    ['5 Cathedral View','Sophie Grant','01 Jul 2026','£975.00','£975.00','£0.00','Paid']
  ]
};

const content = document.getElementById('demoContent');
const navItems = [...document.querySelectorAll('#demoNav [data-view]')];
const statusClass = (value) => /action|arrears|overdue|high/i.test(value) ? 'danger' : /due soon|part paid|medium|progress|new/i.test(value) ? 'warning' : 'success';
const badge = (value) => `<span class="status-badge ${statusClass(value)}">${value}</span>`;
const readonly = `<div class="demo-readonly-note"><i class="fa-solid fa-lock"></i>This is a read-only demo. All records are fictional and actions are disabled.</div>`;

function dashboard() {
  content.innerHTML = `
    <section class="dashboard-welcome" aria-labelledby="dashboardGreeting">
      <div class="dashboard-welcome-copy">
        <p class="dashboard-date">Friday, 31 July 2026</p>
        <h1 id="dashboardGreeting">Good morning, Alex.</h1>
        <p class="dashboard-welcome-text">Here is what needs your attention across your portfolio today.</p>
      </div>
      <img src="assets/property-hub-logo.png" alt="Estavo" class="dashboard-welcome-logo">
    </section>

    <section class="stats">
      <div class="stat-card"><span class="stat-card-icon"><i class="fa-regular fa-building"></i></span><h3>Managed Properties</h3><p>49</p><small>Portfolio total</small></div>
      <div class="stat-card"><span class="stat-card-icon"><i class="fa-regular fa-handshake"></i></span><h3>Landlords</h3><p>28</p><small>Client records</small></div>
      <div class="stat-card"><span class="stat-card-icon"><i class="fa-solid fa-users"></i></span><h3>Active Tenants</h3><p>46</p><small>Current records</small></div>
      <div class="stat-card"><span class="stat-card-icon"><i class="fa-solid fa-wrench"></i></span><h3>Open Maintenance</h3><p>4</p><small>Items requiring action</small></div>
    </section>

    <section class="dashboard-grid">
      <div class="dashboard-card">
        <div class="tasks-header"><div class="tasks-heading-actions"><h2>Today's Tasks</h2><a class="add-task-link"><i class="fa-solid fa-plus"></i> Add Task</a></div>
          <div class="task-filters"><button class="task-filter active">Today</button><button class="task-filter">This Week</button><button class="task-filter">Urgent</button><button class="task-filter">All</button></div>
        </div>
        <div class="task-summary"><div class="task-summary-card overdue"><span>Overdue</span><strong>1</strong></div><div class="task-summary-card today"><span>Today</span><strong>4</strong></div><div class="task-summary-card week"><span>Next 7 days</span><strong>9</strong></div></div>
        <div class="demo-task-list">
          ${[['Gas Safety expires today','29 Riverside Walk','Today'],['Inventory appointment · 10:00','116 Park Road','10:00'],['Rent review · 14:00','42 Thorpe Road','14:00'],['Applicant viewing · 16:30','116 Park Road','16:30']].map(([a,b,c])=>`<div class="activity-item"><div><strong>${a}</strong><small>${b}</small></div><span>${c}</span></div>`).join('')}
        </div>
      </div>

      <div class="dashboard-card quick-actions-card"><h2>Quick Actions</h2><div class="quick-actions-grid">
        <button><i class="fa-solid fa-building"></i><span>Add Property</span></button>
        <button><i class="fa-solid fa-file-circle-plus"></i><span>Add Certificate</span></button>
        <button><i class="fa-regular fa-rectangle-list"></i><span>Book Inventory</span></button>
        <button><i class="fa-solid fa-upload"></i><span>Upload Document</span></button>
        <button class="full-width"><i class="fa-solid fa-wrench"></i><span>Report Maintenance</span></button>
      </div></div>

      <div class="dashboard-card needs-attention-card"><h2>Needs Attention</h2><div class="needs-attention-groups">
        ${[['fa-fire-flame-curved','Gas Safety',9],['fa-bolt','EICR',12],['fa-bell','Smoke & CO',7],['fa-house','EPC',3],['fa-ellipsis','Other',4]].map(([icon,label,count])=>`<div class="attention-column"><h3><i class="fa-solid ${icon}"></i>${label}<span class="attention-count">${count}</span></h3><div class="attention-list"><div class="attention-item"><strong>${count > 7 ? 'Review required' : 'Upcoming renewals'}</strong><span>${count} records</span></div></div></div>`).join('')}
      </div></div>
    </section>

    <section class="dashboard-card recent-activity"><h2>Recent Activity</h2><ul class="activity-list"><li>Payment recorded for 18 Willow Close</li><li>Gas Safety certificate uploaded for 42 Thorpe Road</li><li>New applicant added for 116 Park Road</li><li>Maintenance issue assigned to approved contractor</li></ul></section>`;
}

function tablePage({eyebrow, title, subtitle, button, headers, rows}) {
  content.innerHTML = `
    <section class="page-header"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${subtitle}</p></div>${button ? `<button class="primary-action"><i class="fa-solid fa-plus"></i> ${button}</button>` : ''}</section>
    ${readonly}
    <section class="dashboard-card">
      <div class="finance-toolbar"><div><h2>${title}</h2><p>Sample records from Harbour &amp; Key Lettings.</p></div><div class="finance-filters"><input class="demo-search" type="search" placeholder="Search ${title.toLowerCase()}" aria-label="Search"></div></div>
      <div class="table-scroll"><table class="finance-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>
    </section>`;
  const input = content.querySelector('.demo-search');
  input?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    content.querySelectorAll('tbody tr').forEach(row => row.hidden = !row.textContent.toLowerCase().includes(q));
  });
}

function properties(){tablePage({eyebrow:'Portfolio',title:'Properties',subtitle:'Manage properties, occupancy and linked records.',button:'Add Property',headers:['Property','Postcode','Tenant','Rent','Occupancy','Compliance'],rows:demoData.properties.map(r=>`<tr><td class="demo-table-link">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${badge(r[4])}</td><td>${badge(r[5])}</td></tr>`)})}
function landlords(){tablePage({eyebrow:'People',title:'Landlords',subtitle:'Client records and managed portfolios.',button:'Add Landlord',headers:['Landlord','Properties','Monthly rent','Email','Status'],rows:demoData.landlords.map(r=>`<tr><td class="demo-table-link">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${badge(r[4])}</td></tr>`)})}
function tenants(){tablePage({eyebrow:'People',title:'Tenants',subtitle:'Active tenancy records across the portfolio.',button:'Add Tenant',headers:['Tenant','Property','Rent','Tenancy start','Status'],rows:demoData.tenants.map(r=>`<tr><td class="demo-table-link">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${badge(r[4])}</td></tr>`)})}
function applicants(){tablePage({eyebrow:'Lettings Pipeline',title:'Applicants',subtitle:'Track enquiries, viewings and references.',button:'Add Applicant',headers:['Applicant','Property','Stage','Last activity','Status'],rows:demoData.applicants.map(r=>`<tr><td class="demo-table-link">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${badge(r[4])}</td></tr>`)})}
function compliance(){tablePage({eyebrow:'Property Safety',title:'Compliance',subtitle:'Certificates grouped by urgency and expiry date.',button:'Add Certificate',headers:['Property','Certificate','Expiry','Time remaining','Status'],rows:demoData.compliance.map(r=>`<tr><td class="demo-table-link">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${badge(r[4])}</td></tr>`)})}
function maintenance(){tablePage({eyebrow:'Repairs',title:'Maintenance',subtitle:'Track every issue from report to completion.',button:'Report Issue',headers:['Reference','Property','Issue','Priority','Status'],rows:demoData.maintenance.map(r=>`<tr><td class="demo-table-link">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${badge(r[3])}</td><td>${r[4]}</td></tr>`)})}
function documents(){tablePage({eyebrow:'Records',title:'Documents',subtitle:'Files connected to the correct property and person.',button:'Upload Document',headers:['File','Linked record','Category','Uploaded'],rows:demoData.documents.map(r=>`<tr><td class="demo-table-link"><i class="fa-regular fa-file-pdf"></i> ${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`)})}

function finance() {
  content.innerHTML = `
    <section class="page-header finance-header"><div><p class="eyebrow">Rent Management</p><h1>Finance</h1><p>Track rent due, payments received and arrears.</p></div><button class="primary-action"><i class="fa-solid fa-plus"></i> Record Payment</button></section>
    <section class="finance-summary">
      <article class="finance-stat"><span>Rent Due</span><strong>£46,875.00</strong><small>July 2026</small></article>
      <article class="finance-stat success"><span>Received</span><strong>£45,950.00</strong><small>Payments recorded</small></article>
      <article class="finance-stat danger"><span>Outstanding</span><strong>£925.00</strong><small>Due less received</small></article>
      <article class="finance-stat"><span>Collection Rate</span><strong>98.0%</strong><small>For selected month</small></article>
    </section>
    ${readonly}
    <section class="dashboard-card finance-ledger-card">
      <div class="finance-toolbar"><div><h2>Rent Ledger</h2><p>July 2026 · 49 active tenancies</p></div><div class="finance-filters"><input type="month" value="2026-07"><select><option>All statuses</option><option>Paid</option><option>Part paid</option><option>Due</option></select><input id="financeSearch" type="search" placeholder="Search property or tenant"></div></div>
      <div class="table-scroll"><table class="finance-table"><thead><tr><th>Property</th><th>Tenant</th><th>Due Date</th><th>Rent Due</th><th>Paid</th><th>Balance</th><th>Status</th><th></th></tr></thead><tbody>${demoData.finance.map(r=>`<tr><td class="demo-table-link">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td>${badge(r[6])}</td><td><button class="secondary-action">View</button></td></tr>`).join('')}</tbody></table></div>
    </section>`;
  document.getElementById('financeSearch')?.addEventListener('input', e => { const q=e.target.value.toLowerCase(); content.querySelectorAll('tbody tr').forEach(row=>row.hidden=!row.textContent.toLowerCase().includes(q)); });
}

function placeholder(title, icon, text) {
  content.innerHTML = `<section class="page-header"><div><p class="eyebrow">Demo Workspace</p><h1>${title}</h1><p>${text}</p></div></section>${readonly}<section class="dashboard-card demo-empty-card"><i class="fa-solid ${icon}"></i><h2>${title}</h2><p>This screen uses the same Estavo application shell and visual system. Sample functionality is intentionally limited in the public read-only demo.</p></section>`;
}

const views = {
  dashboard,
  properties,
  landlords,
  tenants,
  applicants,
  compliance,
  inventory:()=>placeholder('Inventory','fa-rectangle-list','Manage check-ins, check-outs and property condition reports.'),
  maintenance,
  diary:()=>placeholder('Diary','fa-calendar','View appointments, inspections and portfolio tasks.'),
  documents,
  finance,
  reports:()=>placeholder('Reports','fa-chart-column','Portfolio reporting and performance insights.'),
  settings:()=>placeholder('Settings','fa-gear','Workspace configuration and user preferences.')
};

function openView(name, updateHash=true) {
  const view = views[name] || dashboard;
  navItems.forEach(item => item.classList.toggle('active', item.dataset.view === name));
  view();
  if (updateHash) history.replaceState(null,'',`#${name}`);
  window.scrollTo({top:0, behavior:'smooth'});
}

navItems.forEach(item => item.addEventListener('click', event => { event.preventDefault(); openView(item.dataset.view); }));
document.querySelector('.demo-disabled-action')?.addEventListener('click', event => event.preventDefault());
openView(location.hash.replace('#','') || 'dashboard', false);
