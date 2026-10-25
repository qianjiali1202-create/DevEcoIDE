(function(){
  'use strict';
  const R=window.LAYOUT_RESEARCH;
  const $=(s,e=document)=>e.querySelector(s);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const wire=p=>`<div class="wire${p.top==='shown'?'':' no-app-top'}" data-layout="${p.id}" aria-hidden="true"><i class="wtop"></i><i class="wleft"></i><i class="wmain"></i><i class="wright"></i><i class="wbottom"></i></div>`;

  $('#patternGrid').innerHTML=R.patterns.map(p=>`<article class="pattern-card"><div class="pattern-visual">${wire(p)}</div><div class="pattern-copy"><header><h3>${esc(p.name)}</h3><span class="tag">${esc(p.tag)}</span></header><p><strong>常见：</strong>${esc(p.examples)}</p><p>${esc(p.use)}</p><p><strong>应用顶部区：</strong>${p.top==='shown'?'此模式示意开启':'默认不占整行，可按任务开启'}</p><p><strong>注意：</strong>${esc(p.risk)}</p></div></article>`).join('');
  const byId=Object.fromEntries(R.sources.map(s=>[s.id,s]));
  $('#comparisonRows').innerHTML=R.products.map(p=>`<tr><td><strong>${esc(p.name)}</strong><span class="evidence">${esc(p.type)}</span></td><td>${esc(p.structure)}<a class="source-pill" href="${byId[p.source].url}" target="_blank" rel="noreferrer">[${p.source}] 官方来源 ↗</a></td><td>${esc(p.task)}</td><td>${esc(p.lesson)}</td></tr>`).join('');
  $('#sourceList').innerHTML=R.sources.map(s=>`<article class="source-item"><span class="source-code">${s.id}</span><div><h3>${esc(s.title)} <small>${esc(s.org)}</small></h3><p>${esc(s.note)}</p></div><a class="button" href="${s.url}" target="_blank" rel="noreferrer">查看来源</a></article>`).join('');

  const defaults={
    top:{name:'顶部栏 + 内容',top:48,left:0,right:0,bottom:0},
    left:{name:'左侧导航 + 内容',top:0,left:240,right:0,bottom:0},
    list:{name:'目录 + 列表 + 详情',top:0,left:220,right:420,bottom:0},
    three:{name:'目录 + 内容 + 其他',top:0,left:240,right:320,bottom:0},
    workbench:{name:'IDE 工作台',top:44,left:240,right:320,bottom:200},
    canvas:{name:'画布 + 双侧面板',top:0,left:240,right:320,bottom:0},
    dashboard:{name:'顶部栏 + 卡片网格',top:48,left:0,right:0,bottom:0},
    settings:{name:'设置目录 + 单列内容',top:0,left:220,right:0,bottom:0}
  };
  const type=$('#layoutType');
  type.innerHTML=R.patterns.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('');
  type.value='three';
  $('#presetButtons').innerHTML=R.presets.map(p=>`<button class="button" type="button" data-preset="${p.id}">${esc(p.name)}</button>`).join('');

  const fields={width:$('#windowWidth'),height:$('#windowHeight'),top:$('#topHeight'),left:$('#leftWidth'),right:$('#rightWidth'),bottom:$('#bottomHeight')};
  const topEnabled=$('#topEnabled');
  const autoAdapt=$('#autoAdapt');
  const frame=$('#layoutFrame'),stage=$('#layoutStage');
  let state={width:1440,height:960,top:0,left:240,right:320,bottom:0};
  let lastTop=48;
  let savedPanels={left:240,right:320,bottom:200};
  let currentScale=1;
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  function read(){Object.keys(fields).forEach(k=>state[k]=Math.max(0,Number(fields[k].value)||0));}
  function write(){Object.keys(fields).forEach(k=>fields[k].value=state[k]);topEnabled.checked=state.top>0;fields.top.disabled=!topEnabled.checked;}
  function adaptPanels(){
    if(!autoAdapt.checked)return;
    const d=defaults[type.value];
    if(state.width<1280&&state.right){savedPanels.right=state.right;state.right=0}
    if(state.width<960&&state.left){savedPanels.left=state.left;state.left=0}
    if(state.width>=960&&!state.left&&d.left){state.left=Math.min(savedPanels.left||d.left,Math.max(0,state.width-state.right-640))}
    if(state.width>=1280&&!state.right&&d.right){state.right=Math.min(savedPanels.right||d.right,Math.max(0,state.width-state.left-640))}
  }
  function applyType(reset=true){
    const d=defaults[type.value];
    if(reset){Object.assign(state,{top:d.top,left:d.left,right:d.right,bottom:d.bottom});if(d.left)savedPanels.left=d.left;if(d.right)savedPanels.right=d.right;if(d.bottom)savedPanels.bottom=d.bottom;adaptPanels()}
    $('#previewTitle').textContent=d.name;
    frame.dataset.layout=type.value;
    frame.querySelector('.lf-top').hidden=!state.top;
    frame.querySelector('.lf-left').hidden=!state.left;
    frame.querySelector('.lf-right').hidden=!state.right;
    frame.querySelector('.lf-bottom').hidden=!state.bottom;
    $('#labRule').textContent=R.patterns.find(p=>p.id===type.value).use;
    write();render();
  }
  function render(){
    read();
    const center=Math.max(0,state.width-state.left-state.right);
    const body=Math.max(0,state.height-state.top-state.bottom);
    frame.style.setProperty('--ww',state.width);frame.style.setProperty('--wh',state.height);frame.style.setProperty('--th',state.top);frame.style.setProperty('--lw',state.left);frame.style.setProperty('--rw',state.right);frame.style.setProperty('--bh',state.bottom);
    frame.querySelector('.lf-top').hidden=!state.top;frame.querySelector('.lf-left').hidden=!state.left;frame.querySelector('.lf-right').hidden=!state.right;frame.querySelector('.lf-bottom').hidden=!state.bottom;
    const scale=Math.min((stage.clientWidth-56)/state.width,(stage.clientHeight-56)/state.height,1);
    currentScale=Math.max(.15,scale);
    frame.style.transform=`scale(${currentScale})`;
    $('#previewSize').textContent=`${state.width} × ${state.height} px · 预览 ${Math.round(currentScale*100)}%`;
    const issues=[];
    if(center<640)issues.push(`主内容仅 ${center}px，低于建议的 640px`);
    if(body<480)issues.push(`主体高度仅 ${body}px`);
    if(state.width<1280&&state.right)issues.push('当前宽度建议把辅助列改成抽屉');
    const mode=state.width>=1600?'完整并行':state.width>=1280?'标准工作区':state.width>=960?'紧凑工作区':'单区切换';
    $('#layoutResult').innerHTML=`<span>主内容宽 <strong>${center}px</strong> · 主体高 <strong>${body}px</strong></span><span>响应状态 <strong>${mode}</strong></span><span class="${issues.length?'warn':''}">${issues.length?issues.join('；'):'当前组合可作为首轮布局验证'}</span>`;
    frame.querySelector('.resize-left').hidden=!state.left;frame.querySelector('.resize-right').hidden=!state.right;frame.querySelector('.resize-bottom').hidden=!state.bottom;
    $('#resizeStatus').textContent=`窗口 ${state.width}×${state.height} · 左 ${state.left||'折叠'} · 中 ${center} · 右 ${state.right||'折叠'}${autoAdapt.checked?' · 自动折叠已开启':''}`;
    document.querySelectorAll('[data-preset]').forEach(b=>{const p=R.presets.find(x=>x.id===b.dataset.preset);b.setAttribute('aria-pressed',p.width===state.width&&p.height===state.height)});
  }
  type.addEventListener('change',()=>applyType(true));
  fields.width.addEventListener('input',()=>{read();adaptPanels();write();render()});
  fields.height.addEventListener('input',render);
  [fields.top,fields.left,fields.right,fields.bottom].forEach(i=>i.addEventListener('input',()=>{render();if(state.top>0)lastTop=state.top;if(state.left)savedPanels.left=state.left;if(state.right)savedPanels.right=state.right;if(state.bottom)savedPanels.bottom=state.bottom;write()}));
  autoAdapt.addEventListener('change',()=>{adaptPanels();write();render()});
  topEnabled.addEventListener('change',()=>{if(topEnabled.checked){state.top=lastTop||48}else{if(state.top>0)lastTop=state.top;state.top=0}write();render()});
  $('#presetButtons').addEventListener('click',e=>{const b=e.target.closest('[data-preset]');if(!b)return;const p=R.presets.find(x=>x.id===b.dataset.preset);state.width=p.width;state.height=p.height;adaptPanels();write();render()});
  $('#resetLayout').addEventListener('click',()=>{state={width:1440,height:960,top:0,left:240,right:320,bottom:0};lastTop=48;savedPanels={left:240,right:320,bottom:200};autoAdapt.checked=true;type.value='three';applyType(false)});
  document.querySelectorAll('[data-resize]').forEach(handle=>{
    handle.addEventListener('pointerdown',event=>{
      event.preventDefault();read();
      const kind=handle.dataset.resize,startX=event.clientX,startY=event.clientY,base={...state},scale=currentScale;
      document.body.classList.add('is-resizing');handle.setPointerCapture(event.pointerId);
      const move=e=>{
        const dx=(e.clientX-startX)/scale,dy=(e.clientY-startY)/scale;
        if(kind==='window'){
          state.width=Math.round(clamp(base.width+dx,800,2560));state.height=Math.round(clamp(base.height+dy,600,1600));adaptPanels();
        }else if(kind==='left'){
          const max=Math.max(0,state.width-state.right-640);state.left=Math.round(max>=200?clamp(base.left+dx,200,Math.min(480,max)):max);savedPanels.left=state.left;
        }else if(kind==='right'){
          const max=Math.max(0,state.width-state.left-640);state.right=Math.round(max>=280?clamp(base.right-dx,280,Math.min(560,max)):max);savedPanels.right=state.right;
        }else if(kind==='bottom'){
          const max=Math.max(0,state.height-state.top-480);state.bottom=Math.round(max>=160?clamp(base.bottom-dy,160,Math.min(480,max)):max);savedPanels.bottom=state.bottom;
        }
        write();render();
      };
      const end=()=>{document.body.classList.remove('is-resizing');handle.removeEventListener('pointermove',move);handle.removeEventListener('pointerup',end);handle.removeEventListener('pointercancel',end)};
      handle.addEventListener('pointermove',move);handle.addEventListener('pointerup',end);handle.addEventListener('pointercancel',end);
    });
  });
  window.addEventListener('resize',render);
  applyType(false);

  const links=[...document.querySelectorAll('.sidebar nav a')];
  const io=new IntersectionObserver(entries=>{const hit=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!hit)return;links.forEach(a=>a.setAttribute('aria-current',a.hash==='#'+hit.target.id?'page':'false'))},{rootMargin:'-64px 0px -65% 0px',threshold:[0,.2,.5]});
  document.querySelectorAll('.chapter').forEach(s=>io.observe(s));
})();
