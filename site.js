/* HINKO Ingeniería — comportamiento compartido por todas las páginas */
(function(){
  const page=location.pathname.replace(/^\/|\.html$/g,'')||'inicio';
  const svc=document.body.dataset.svc||'';
  window.dataLayer=window.dataLayer||[];

  /* ---------- nav ---------- */
  const nav=document.getElementById('nav');
  const onScroll=()=>nav&&nav.classList.toggle('scrolled',window.scrollY>30);
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  const mt=document.getElementById('menuToggle');
  const closeMenu=()=>{document.body.classList.remove('menu-open');mt&&mt.setAttribute('aria-expanded','false');};
  mt&&mt.addEventListener('click',()=>{const o=document.body.classList.toggle('menu-open');mt.setAttribute('aria-expanded',o?'true':'false');});
  document.querySelectorAll('#mobile-menu a').forEach(a=>a.addEventListener('click',closeMenu));
  window.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

  /* ---------- reveal ---------- */
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  /* ---------- eventos de clic para GTM: call · whatsapp · agendar_click ---------- */
  document.addEventListener('click',e=>{
    const a=e.target.closest('[data-ev]');
    if(a)window.dataLayer.push({event:a.dataset.ev,servicio:svc||page,pagina:location.pathname});
  });

  /* ---------- origen de la visita (Google Ads / UTM) ---------- */
  // Se guarda en la sesión para no perderlo si el visitante navega a otra página antes de enviar.
  const KEYS=['utm_source','utm_medium','utm_campaign','utm_term','gclid'];
  let origen={};
  try{origen=JSON.parse(sessionStorage.getItem('hk_origen')||'{}');}catch(e){}
  const qs=new URLSearchParams(location.search);
  if(KEYS.some(k=>qs.get(k))){
    origen={};KEYS.forEach(k=>{if(qs.get(k))origen[k]=qs.get(k).slice(0,120);});
    try{sessionStorage.setItem('hk_origen',JSON.stringify(origen));}catch(e){}
  }
  const origenTxt=()=>{
    const p=['Página: '+location.pathname];
    if(origen.utm_campaign)p.push('Campaña: '+origen.utm_campaign);
    if(origen.utm_term)p.push('Término: '+origen.utm_term);
    if(origen.utm_source&&!origen.utm_campaign)p.push('Fuente: '+origen.utm_source);
    if(origen.gclid)p.push('Google Ads');
    return '['+p.join(' · ')+']';
  };

  /* ---------- formularios de visita → CRM (app.hinko.co) ---------- */
  document.querySelectorAll('form.hk-form').forEach(form=>{
    const box=form.parentElement;
    const ok=box.querySelector('.fok');
    const err=form.querySelector('.err');
    const btn=form.querySelector('button[type=submit]');
    const label=btn.innerHTML;
    const errTxt=err.textContent;
    form.addEventListener('input',e=>{e.target.style.borderColor='';});
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      err.style.display='none';err.textContent=errTxt;
      if(!form.checkValidity()){
        err.style.display='block';
        form.querySelectorAll(':invalid').forEach(x=>x.style.borderColor='#C27070');
        return;
      }
      btn.disabled=true;btn.textContent='Enviando…';
      try{
        const data=Object.fromEntries(new FormData(form));
        // Campos de calificación propios de cada página: van dentro del mensaje (el CRM no los conoce)
        const extras=[];
        form.querySelectorAll('[data-extra]').forEach(el=>{
          if(el.value)extras.push(el.dataset.extra+': '+el.value);
          delete data[el.name];
        });
        data.mensaje=[(data.mensaje||'').trim(),extras.join(' · '),origenTxt()].filter(Boolean).join('\n');
        const res=await fetch(form.action,{method:'POST',body:JSON.stringify(data),headers:{'Accept':'application/json','Content-Type':'application/json'}});
        if(!res.ok)throw new Error('server');
        window.dataLayer.push({event:'formulario_enviado',servicio:data.servicio||'',pagina:location.pathname});
        window.dataLayer.push({event:'generate_lead',servicio:data.servicio||'',pagina:location.pathname});
        form.style.display='none';ok.style.display='block';
      }catch(_){
        err.textContent='No se pudo enviar. Intente de nuevo o escríbanos por WhatsApp.';
        err.style.display='block';
        btn.disabled=false;btn.innerHTML=label;
      }
    });
  });
})();
