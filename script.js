const header=document.querySelector('.site-header');
const menuToggle=document.querySelector('.menu-toggle');
menuToggle?.addEventListener('click',()=>{const open=header.classList.toggle('menu-open');menuToggle.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('menu-open')));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const industryData={
  property:{title:'Estate Agency Workspace',description:'Manage properties, tenants, landlords, maintenance and compliance without losing the full history.',metrics:[['Open maintenance','14'],['Certificates due','6'],['Rent follow-ups','3']],items:['Full property and contact history','Automated compliance reminders','Context-aware email drafting','One timeline for every property']},
  accounting:{title:'Accounting Practice Workspace',description:'Keep clients, deadlines, payroll, VAT, AML and HMRC work together in one organised system.',metrics:[['Deadlines this week','18'],['Payrolls due','4'],['Client queries','9']],items:['Client records and document requests','VAT and payroll deadline tracking','AML and due diligence workflows','AI-assisted client communication']},
  marketing:{title:'Marketing Agency Workspace',description:'Connect leads, clients, campaigns, approvals, files and performance in one clear workspace.',metrics:[['Active campaigns','12'],['Approvals waiting','7'],['Leads this month','36']],items:['Campaign and project visibility','Client approval workflows','Shared files and communications','Automated reporting reminders']},
  services:{title:'Professional Services Workspace',description:'Manage clients, projects, documents, billing and follow-ups without adding unnecessary complexity.',metrics:[['Active clients','42'],['Open projects','11'],['Invoices due','8']],items:['Connected client and project records','Simple document organisation','Billing and follow-up visibility','Flexible workflows for your team']}
};
const preview=document.getElementById('industryPreview');
document.querySelectorAll('[data-industry]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-industry]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const d=industryData[btn.dataset.industry];preview.innerHTML=`<div class="preview-top"><span class="status">LIVE WORKSPACE</span><span>Today</span></div><h3>${d.title}</h3><p>${d.description}</p><div class="preview-columns">${d.metrics.map(m=>`<div><small>${m[0]}</small><strong>${m[1]}</strong></div>`).join('')}</div><ul>${d.items.map(i=>`<li><span>✓</span>${i}</li>`).join('')}</ul>`;}));

const modal=document.getElementById('modal');
const modalContent=document.getElementById('modalContent');
function openModal(type){const template=document.getElementById(`${type}Template`);if(!template)return;modalContent.innerHTML='';modalContent.appendChild(template.content.cloneNode(true));modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';bindForms();modalContent.querySelector('input,select,textarea')?.focus();}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelectorAll('[data-modal]').forEach(btn=>btn.addEventListener('click',()=>openModal(btn.dataset.modal)));
document.querySelectorAll('[data-close]').forEach(btn=>btn.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
function success(formType){const titles={waitlist:'You are on the waitlist.',demo:'Your demo request is ready.',login:'Login will open with the Estavo application.',register:'Your interest has been registered.'};modalContent.innerHTML=`<div class="success-message"><div class="success-icon">✓</div><h2>${titles[formType]||'Thank you.'}</h2><p>Thank you. Your request has been received in this prototype. Connect the form to your chosen email or database service before publishing.</p><button class="btn btn-primary" data-close>Close</button></div>`;modalContent.querySelector('[data-close]').addEventListener('click',closeModal);}
function bindForms(){modalContent.querySelector('[data-register]')?.addEventListener('click',()=>openModal('register'));modalContent.querySelectorAll('form[data-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();success(form.dataset.form);}));}
document.querySelectorAll('main form[data-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();openModal('demo');setTimeout(()=>success(form.dataset.form),150);}));


const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const target=Number(el.dataset.count);let value=0;const step=Math.max(1,Math.ceil(target/18));const timer=setInterval(()=>{value=Math.min(target,value+step);el.textContent=value;if(value>=target)clearInterval(timer);},45);counterObserver.unobserve(el);}),{threshold:.7});
counters.forEach(el=>counterObserver.observe(el));
