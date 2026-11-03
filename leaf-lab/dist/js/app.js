/* 页面行为：原生 JavaScript；双击 index.html 即可使用。 */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const defaultConditions = () => ({light:false,water:false,co2:false,chlorophyll:false});
  const state = {language:'zh', period:'day', observing:false, observationStarted:false, conditions:defaultConditions(), experimentSignatures:new Set(), baseline:false, prediction:null, result:null, helpOpen:false, soundEnabled:true};
  let audioContext, feedbackTimer, soundGeneration=0;
  const activeTones=new Set();
  const t = (key, values={}) => LAB_CONTENT.languages[state.language][key].replace(/\{(\w+)\}/g,(_,name)=>values[name] ?? '');
  const conditions = () => LAB_CONTENT.conditions.map(c=>({...c,...LAB_CONTENT.languages[state.language].conditions[c.id]}));
  function setLanguage(language) {
    if(!LAB_CONTENT.languages[language])return;
    clearFeedback();
    state.language=language;
    document.documentElement.lang=t('lang');
    document.title=t('title');
    document.querySelector('meta[name="description"]').content=t('description');
    document.querySelector('.brand').setAttribute('aria-label',t('home'));
    $('language-switch').setAttribute('aria-label',t('languageLabel'));
    document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
    document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
    updateSoundButton();
    renderExperiment();
  }
  function updateSoundButton() {
    $('sound-toggle').textContent=t(state.soundEnabled?'soundOn':'soundOff');
    $('sound-toggle').setAttribute('aria-pressed',String(state.soundEnabled));
  }
  function stopSound() {
    soundGeneration++;
    activeTones.forEach(tone=>{try {tone.stop();} catch { /* 音符可能已经结束。 */ }});
    activeTones.clear();
  }
  // 用浏览器合成短音效，无需音频文件或网络；只在学生操作后播放。
  async function playFeedbackSound(correct) {
    stopSound();
    if(!state.soundEnabled)return;
    const generation=soundGeneration;
    try {
      const AudioContextClass=window.AudioContext || window.webkitAudioContext;
      if(!AudioContextClass)return;
      if(!audioContext)audioContext=new AudioContextClass();
      if(audioContext.state==='suspended')await audioContext.resume();
      if(!state.soundEnabled || generation!==soundGeneration || audioContext.state!=='running')return;
      const notes=correct?[523.25,659.25,783.99]:[293.66,220];
      const start=audioContext.currentTime;
      notes.forEach((frequency,index)=>{
        const tone=audioContext.createOscillator();
        const volume=audioContext.createGain();
        const at=start+index*.13;
        tone.type='sine';tone.frequency.value=frequency;
        volume.gain.setValueAtTime(0,at);
        volume.gain.linearRampToValueAtTime(.07,at+.015);
        volume.gain.exponentialRampToValueAtTime(.001,at+.20);
        tone.connect(volume);volume.connect(audioContext.destination);
        activeTones.add(tone);
        tone.onended=()=>{activeTones.delete(tone);tone.disconnect();volume.disconnect();};
        tone.start(at);tone.stop(at+.22);
      });
    } catch { /* 浏览器不支持或禁止声音时，视觉反馈仍可正常使用。 */ }
  }
  function clearFeedback() {
    clearTimeout(feedbackTimer);
    stopSound();
    document.querySelectorAll('.feedback-success,.feedback-error').forEach(el=>el.classList.remove('feedback-success','feedback-error'));
    document.querySelector('.effect-badge')?.remove();
  }
  function showFeedback(correct) {
    clearFeedback();
    const result=$('experiment-result');
    const scene=$('plant-scene');
    // 重新触发动画，连续点击也能得到反馈。
    void result.offsetWidth;
    const effect=correct?'feedback-success':'feedback-error';
    result.classList.add(effect);scene.classList.add(effect);
    const badge=document.createElement('span');
    badge.className='effect-badge';badge.textContent=correct?'✓':'!';badge.setAttribute('aria-hidden','true');
    badge.dataset.label=t(state.result==='prediction'?'choosePrediction':correct?'predictionRight':'predictionWrong');
    scene.append(badge);
    playFeedbackSound(correct);
    const feedbackTarget=correct?scene:result;
    feedbackTarget.scrollIntoView({block:correct?'start':'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    feedbackTimer=setTimeout(()=>{
      result.classList.remove(effect);scene.classList.remove(effect);badge.remove();
    },1000);
  }
  function plantScene() {
    // 真实条件决定展示哪种过程；预测答对后才播放，答错时暂停动画。
    const particles=(gas,count)=>Array.from({length:count},(_,i)=>`<span class="gas-particle ${gas==='O₂'?'gas-oxygen':'gas-carbon'}" style="--gas-delay:${-i*1.15}s">${gas}</span>`).join('');
    const gasLayers=`<div class="gas-process-label" id="gas-process-label"></div><div class="gas-layer photo-gases" aria-hidden="true"><div class="gas-route photo-oxygen">${particles('O₂',3)}</div><div class="gas-route photo-carbon">${particles('CO₂',2)}</div><span class="gas-path-arrow photo-out">↗</span><span class="gas-path-arrow photo-in">↙</span></div><div class="gas-layer respiration-gases" aria-hidden="true"><div class="gas-route breath-oxygen">${particles('O₂',3)}</div><div class="gas-route breath-carbon">${particles('CO₂',3)}</div><span class="gas-path-arrow breath-in">→</span><span class="gas-path-arrow breath-out">↗</span></div>`;
    return `<div class="scene" id="plant-scene" role="img" aria-label="${t('sceneLabel')}"><span class="scene-badge">${t('sceneBadge')}</span><div class="sun"><span class="sun-face">◡</span></div><div class="moon" aria-hidden="true">☾</div><div class="stars" aria-hidden="true">✦ · ✧</div><span class="flow-label flow-light">${conditions()[0].name} ↘</span>
    <svg class="plant-svg" viewBox="0 0 200 280" aria-hidden="true"><defs><linearGradient id="pot" x1="0" x2="1"><stop stop-color="#d9a57d"/><stop offset="1" stop-color="#c58e65"/></linearGradient></defs><ellipse cx="100" cy="264" rx="62" ry="9" fill="#9b8164" opacity=".1"/><path d="M68 211H133L124 259Q100 270 77 259Z" fill="url(#pot)"/><path d="M77 237Q100 242 126 237" stroke="#e6b895" stroke-width="2" fill="none"/><ellipse cx="100" cy="211" rx="34" ry="9" fill="#b98058"/><ellipse cx="100" cy="210" rx="28" ry="6" fill="#6d5a3e"/><path d="M101 213Q106 145 100 55" stroke="#618e4c" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M102 181Q80 160 57 155M103 148Q127 126 149 120M102 115Q78 98 60 92M101 83Q119 64 133 54" stroke="#618e4c" stroke-width="3" fill="none"/>
    <path class="plant-leaf" d="M98 177C57 181 39 162 40 137C68 136 90 147 98 177Z" fill="#82ad62"/><path d="M48 144L94 174" stroke="#a8c68b" stroke-width="1.5"/>
    <path class="plant-leaf" d="M106 147C110 112 134 98 163 102C160 132 139 151 106 147Z" fill="#669e55"/><path d="M113 143L154 111" stroke="#9dc386" stroke-width="1.5"/>
    <path class="plant-leaf" d="M100 117C69 119 47 97 49 73C77 70 96 86 100 117Z" fill="#83b368"/><path d="M57 81L96 112" stroke="#b0cd91" stroke-width="1.5"/>
    <path class="plant-leaf" d="M102 86C104 59 120 40 144 39C145 65 129 84 102 86Z" fill="#739f51"/><path d="M107 80L137 47" stroke="#a6c080" stroke-width="1.5"/>
    <path class="plant-leaf" d="M100 59C80 49 75 29 83 13C104 22 111 41 100 59Z" fill="#9dbd6b"/><path d="M87 23L99 52" stroke="#c4d69e" stroke-width="1.5"/></svg>
    <span class="flow-label flow-water"><span class="flow-icon">💧</span>${conditions()[1].name} <span>→</span></span><span class="flow-label flow-co2"><span class="flow-icon">☁️</span>${t('gasCarbon')} ↙</span><span class="flow-label flow-oxygen">↗ ${t('gasOxygen')}</span><span class="flow-label flow-sugar">${t('sugar')} <span class="flow-icon">✧</span></span>${gasLayers}<span class="scene-state" id="scene-state"></span></div>`;
  }
  function renderExperiment() {
    const conditionCards=conditions().map(c=>`<label class="switch-control"><input type="checkbox" role="switch" data-switch="${c.id}" ${state.conditions[c.id]?'checked':''} aria-label="${t('provide',{condition:c.name})}"><span class="condition-art" aria-hidden="true">${c.icon}</span><span class="switch-name">${c.name}</span><small>${c.source}</small><span class="condition-toggle" aria-hidden="true"><span></span></span><span class="condition-state">${t(state.conditions[c.id]?'conditionOn':'conditionOff')}</span></label>`).join('');
    const predictions=['yes','no'].map(value=>`<label class="prediction-option"><input type="radio" name="prediction" value="${value}" ${state.prediction===value?'checked':''}><span class="prediction-option-body"><span class="prediction-art" aria-hidden="true">${value==='yes'?'🌱':'⏸'}</span><span>${t(value)}</span><span class="prediction-choice" aria-hidden="true">✓</span></span></label>`).join('');
    const periodControls=`<div class="period-controls" role="group" aria-label="${t('periodLabel')}"><button type="button" data-period="day" aria-pressed="${state.period==='day'}">${t('day')}</button><button type="button" data-period="night" aria-pressed="${state.period==='night'}">${t('night')}</button><span>${t('periodHint')}</span></div>`;
    const breathing=`<div class="life-processes"><p id="period-summary" class="period-summary" aria-live="polite"></p><div class="respiration"><strong>${t('respiration')}</strong><div class="respiration-flow"><div class="breath-lane"><span class="gas-caption">${t('gasOxygen')}</span><div class="breath-track" aria-hidden="true"><span class="track-arrow">→</span><span class="track-gas gas-oxygen">O₂</span><span class="track-gas gas-oxygen second">O₂</span></div><small>${t('breathIn')}</small></div><span class="breath-plant">🌱<span>${t('breathPlant')}</span></span><div class="breath-lane"><span class="gas-caption">${t('gasCarbon')}</span><div class="breath-track" aria-hidden="true"><span class="track-arrow">→</span><span class="track-gas gas-carbon">CO₂</span><span class="track-gas gas-carbon second">CO₂</span></div><small>${t('breathOut')}</small></div></div><p class="gas-note">${t('gasNote')}</p></div></div>`;
    const dayControls=`<p class="condition-prompt">${t('conditionPrompt')}</p><div class="switch-grid">${conditionCards}</div><fieldset class="prediction"><legend>${t('predictionHint')}</legend>${predictions}</fieldset><button id="run-experiment" class="primary-button run-button">${t('run')}</button><div id="experiment-result" class="result-box" role="status" hidden></div><details class="condition-help" ${state.helpOpen?'open':''}><summary>${t('help')}</summary>${conditions().map(c=>`<p><strong>${c.icon} ${c.name}: </strong>${c.detail}</p>`).join('')}</details><p class="model-note">${t('modelNote')}</p>`;
    const nightControls=`<button id="run-experiment" class="primary-button run-button observation-button" type="button" aria-pressed="${state.observing}">${t(state.observing?'pauseNight':'observeNight')}</button><p class="observation-note">${t('observationNote')}</p>`;
    $('activity-content').innerHTML=periodControls+plantScene()+breathing+(state.period==='night'?nightControls:dayControls);
    document.querySelector('.condition-help')?.addEventListener('toggle',e=>state.helpOpen=e.target.open);
    updateScene(Boolean(state.result?.works));
    renderResult();
  }
  function updateScene(producing) {
    const scene=$('plant-scene');if(!scene)return;
    const night=state.period==='night';
    const answered=Boolean(state.result && state.result!=='prediction');
    const running=night?state.observing:answered && state.result.correct;
    const paused=!night && answered && !state.result.correct;
    scene.classList.toggle('respiring',running);
    document.querySelector('.respiration').classList.toggle('running',running);
    const gasStatus=night?t(state.observing?'respiration':state.observationStarted?'nightPaused':'nightWaiting'):paused?t('animationPaused'):running?t(producing?'photosynthesis':'respiration'):t('gasWait');
    $('gas-process-label').textContent=gasStatus;
    scene.classList.toggle('no-light',night || !state.conditions.light);scene.classList.toggle('no-chlorophyll',!night && !state.conditions.chlorophyll);scene.classList.toggle('off-water',!night && !state.conditions.water);scene.classList.toggle('off-co2',!night && !state.conditions.co2);scene.classList.toggle('producing',!night && producing && running);
    scene.classList.toggle('night',night);
    // 夜间为独立观察模式，不显示光合作用条件或要求预测。
    const modeLabels={introText:night?'observationIntro':'introText',labTag:night?'observationTag':'labTag',heading:night?'observationHeading':'heading',instruction:night?'observationInstruction':'instruction',steps:night?'observationSteps':'steps',reset:night?'nightReset':'reset'};
    Object.entries(modeLabels).forEach(([key,value])=>document.querySelector(`[data-i18n="${key}"]`).textContent=t(value));
    document.querySelectorAll('[data-switch]').forEach(input=>{
      const card=input.closest('.switch-control');
      card.classList.toggle('is-selected',input.checked);
      card.querySelector('.condition-state').textContent=t(input.checked?'conditionOn':'conditionOff');
    });
    document.querySelectorAll('[data-period]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.period===state.period)));
    const periodSummary=t(night?'nightSummary':state.conditions.light?'daySummary':'dayNoLightSummary');
    $('period-summary').textContent=periodSummary;
    const status=night?t(state.observing?'nightRunning':state.observationStarted?'nightPaused':'nightWaiting'):t(paused?'animationPaused':running?producing?'producing':'stopped':'waiting');
    scene.setAttribute('aria-label',periodSummary+' '+(night?status:t('sceneSummary',{conditions:conditions().map(c=>`${c.name}: ${t(state.conditions[c.id]?'present':'absent')}`).join(t('separator')),status}))+(running?' '+t('breathIn')+'; '+t('breathOut'):''));
    $('scene-state').textContent=status;
  }
  function renderResult() {
    const result=$('experiment-result');
    if(!result)return;
    result.hidden=!state.result;
    if(!state.result)return;
    const correct=state.result!=='prediction' && state.result.correct;
    result.classList.toggle('result-correct',Boolean(correct));
    result.classList.toggle('result-incorrect',!correct);
    if(state.result==='prediction'){result.textContent=t('needPrediction');result.classList.add('warning');return;}
    const {works,missing,compared}=state.result;
    if(!correct){result.textContent=t('retryPrediction');result.classList.add('warning');return;}
    let text=works?t('success'):t('missing',{conditions:missing.map(id=>LAB_CONTENT.languages[state.language].conditions[id].name).join(t('separator'))});
    if(missing.length>1)text+=' '+t('fairTest');
    result.textContent=t('correct')+text+(compared?' '+t('compared'):'');
    result.classList.toggle('warning',!correct);
  }
  function runExperiment() {
    if(state.period==='night'){
      clearFeedback();
      state.observing=!state.observing;
      state.observationStarted=true;
      updateScene(false);
      $('run-experiment').textContent=t(state.observing?'pauseNight':'observeNight');
      $('run-experiment').setAttribute('aria-pressed',String(state.observing));
      if(state.observing)$('plant-scene').scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
      return;
    }
    if(!state.prediction){state.result='prediction';renderResult();showFeedback(false);return;}
    const missing=LAB_CONTENT.conditions.filter(c=>!state.conditions[c.id]).map(c=>c.id);
    const works=missing.length===0;
    const correct=(state.prediction==='yes')===works;
    if(works)state.baseline=true;
    if(missing.length===1)state.experimentSignatures.add(missing[0]);
    state.result={works,correct,missing,prediction:state.prediction,compared:state.baseline&&state.experimentSignatures.size>0};
    updateScene(works);renderResult();showFeedback(correct);
  }
  $('activity-content').addEventListener('click',e=>{
    if(e.target.closest('#run-experiment'))runExperiment();
    const period=e.target.closest('[data-period]');
    if(period){
      if(state.period!==period.dataset.period){
        clearFeedback();
        state.period=period.dataset.period;
        state.observing=false;
        state.observationStarted=false;
        state.result=null;
        state.prediction=null;
        renderExperiment();
      }
    }
  });
  $('activity-content').addEventListener('change',e=>{
    if(e.target.matches('[data-switch]')){
      clearFeedback();
      state.conditions[e.target.dataset.switch]=e.target.checked;
      state.result=null;
      state.prediction=null;
      updateScene(false);
      $('experiment-result').hidden=true;
      document.querySelectorAll('input[name="prediction"]').forEach(input=>input.checked=false);
    }
    if(e.target.matches('input[name="prediction"]')){
      clearFeedback();
      state.prediction=e.target.value;
      state.result=null;
      updateScene(false);
      renderResult();
    }
  });
  $('reset-activity').addEventListener('click',()=>{
    clearFeedback();
    state.conditions=defaultConditions();
    state.observing=false;
    state.observationStarted=false;
    state.baseline=false;
    state.experimentSignatures.clear();
    state.prediction=null;
    state.result=null;
    state.helpOpen=false;
    renderExperiment();
  });
  $('teacher-toggle').addEventListener('click',()=>{
    const hidden=!$('teacher-guide').hidden;
    $('teacher-guide').hidden=hidden;
    $('teacher-toggle').setAttribute('aria-expanded',String(!hidden));
  });
  $('language-switch').addEventListener('click',e=>{
    const button=e.target.closest('[data-language]');
    if(button)setLanguage(button.dataset.language);
  });
  $('sound-toggle').addEventListener('click',()=>{
    state.soundEnabled=!state.soundEnabled;
    if(!state.soundEnabled)stopSound();
    updateSoundButton();
  });
  setLanguage('zh');
})();
