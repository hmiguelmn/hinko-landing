/* HINKO Ingeniería — comportamiento compartido por todas las páginas */
(function(){
  /* ---------- nav ---------- */
  const nav=document.getElementById('nav');
  const onScroll=()=>nav.classList.toggle('scrolled',window.scrollY>40);
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  const mt=document.getElementById('menuToggle');
  const closeMenu=()=>{document.body.classList.remove('menu-open');mt.setAttribute('aria-expanded','false');};
  mt.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');mt.setAttribute('aria-expanded',open?'true':'false');});
  document.querySelectorAll('#mobile-menu a').forEach(a=>a.addEventListener('click',closeMenu));
  window.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

  /* ---------- reveal ---------- */
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.16,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

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

  /* ---------- clics en WhatsApp (medición en GTM) ---------- */
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a=>a.addEventListener('click',()=>{
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({'event':'whatsapp_click','pagina':location.pathname});
  }));

  /* ---------- formularios de cotización ---------- */
  document.querySelectorAll('form.reg-form').forEach(form=>{
    const box=form.parentElement;
    const success=box.querySelector('.form-success');
    const error=form.querySelector('.form-error-msg');
    const submit=form.querySelector('button[type=submit]');
    const label=submit.innerHTML;
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      error.style.display='none';
      submit.disabled=true;
      submit.textContent='Enviando…';
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
        window.dataLayer=window.dataLayer||[];
        window.dataLayer.push({'event':'formulario_enviado','servicio':data.servicio||'','pagina':location.pathname});
        form.style.display='none';success.style.display='block';
      }catch(err){
        error.style.display='block';
        submit.disabled=false;
        submit.innerHTML=label;
      }
    });
  });

  /* ---------- barra fija móvil: se oculta cuando el formulario está a la vista ---------- */
  const mbar=document.querySelector('.mbar');
  const target=document.getElementById('cotizar');
  if(mbar&&target){
    document.body.classList.add('has-mbar');
    new IntersectionObserver(([e])=>mbar.classList.toggle('hide',e.isIntersecting),{threshold:.2}).observe(target);
  }
})();
