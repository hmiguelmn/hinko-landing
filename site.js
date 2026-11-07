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

  /* ---------- aviso de cookies (Google Consent Mode v2) ---------- */
  // El consentimiento por defecto ("denied") se fija en el <head> antes de GTM. Aquí se pregunta y se actualiza.
  // La decisión dura 12 meses; luego se vuelve a preguntar.
  const CK='hk_cookies';
  let ck=null;
  try{ck=JSON.parse(localStorage.getItem(CK)||'null');}catch(e){}
  if(ck&&!(Date.now()-ck.t<31536e6))ck=null;
  const gtag=window.gtag||function(){window.dataLayer.push(arguments);};
  const bar=document.createElement('div');
  bar.className='ckbar';bar.setAttribute('role','region');bar.setAttribute('aria-label','Aviso de cookies');
  bar.innerHTML='<p>Usamos cookies propias y de Google para medir las visitas y la efectividad de nuestros anuncios. Puede aceptarlas o rechazarlas: el sitio funciona igual. <a href="/tratamiento-de-datos#cookies">Más información</a></p>'+
    '<div class="b"><button type="button" data-ck="rechazadas">Rechazar</button><button type="button" data-ck="aceptadas">Aceptar</button></div>';
  bar.hidden=!!ck;
  document.body.appendChild(bar);
  bar.addEventListener('click',e=>{
    const b=e.target.closest('[data-ck]');if(!b)return;
    const v=b.dataset.ck,g=v==='aceptadas'?'granted':'denied';
    try{localStorage.setItem(CK,JSON.stringify({v,t:Date.now()}));}catch(_){}
    gtag('consent','update',{analytics_storage:g,ad_storage:g,ad_user_data:g,ad_personalization:g});
    window.dataLayer.push({event:'cookie_consent',decision:v});
    bar.hidden=true;
  });
  document.addEventListener('click',e=>{if(e.target.closest('.ck-open')){bar.hidden=false;bar.querySelector('[data-ck]').focus();}});

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
  const POLITICA='v1 del 7/11/2026'; // actualizar si cambia tratamiento-de-datos.html
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
        form.classList.add('tried');
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
        // Prueba de la autorización de datos personales (Ley 1581 de 2012): queda guardada en el CRM con el contacto
        delete data.autoriza_datos;
        const fecha=new Date().toLocaleString('es-CO',{timeZone:'America/Bogota',dateStyle:'short',timeStyle:'short'});
        const autoriza='[Autorizó el tratamiento de datos personales · Política '+POLITICA+' · '+fecha+']';
        data.mensaje=[(data.mensaje||'').trim(),extras.join(' · '),origenTxt(),autoriza].filter(Boolean).join('\n');
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
