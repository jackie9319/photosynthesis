/* 三语文字集中在这里；三个语言包使用相同 key，四项条件 ID 请保持不变。 */
const LAB_CONTENT = {
  conditions:[{id:'light',icon:'☀️'},{id:'water',icon:'💧'},{id:'co2',icon:'☁️'},{id:'chlorophyll',icon:'🍃'}],
  languages:{
    zh:{
      observationIntro:'黑夜没有光合作用，但植物仍然会呼吸。一起观察气体怎样移动。',
      observationTag:'夜间观察区',observationHeading:'黑夜里，植物怎样呼吸？',observationInstruction:'点击下方按钮，观察 O₂ 进入植物、CO₂ 从植物飘出。植物白天也会呼吸。',observationSteps:'点击 → 观察 → 发现',observeNight:'▶ 观察夜间呼吸',pauseNight:'⏸ 暂停观察',nightWaiting:'点击「观察夜间呼吸」，看看气体怎样移动',nightRunning:'正在呼吸：吸收氧气，释放二氧化碳',nightPaused:'观察动画已暂停；植物仍然会呼吸',observationNote:'这里观察的是正常植物的呼吸过程：利用氧气和储存的糖，释放二氧化碳、水及维持生命所需的能量。叶绿素不是呼吸所需条件。',nightReset:'↻ 重新观察',
      conditionPrompt:'光合作用条件 · 点卡片添加',conditionOn:'已提供',conditionOff:'点一下添加',
      nightConditionsNote:'这些卡片表示光合作用所需的条件。黑夜没有光照，即使提供这些条件也不能进行光合作用。植物仍会呼吸：吸收 O₂ 氧气，释放 CO₂ 二氧化碳。',
      retryPrediction:'预测还不对，检查条件后再试一次。答对后会播放气体动画。',animationPaused:'动画已暂停，请修改预测后再试一次',
      predictionLabel:'你的预测',actualLabel:'实验发现',cannotPhoto:'不能进行光合作用',predictionRight:'✓ 你的预测正确！',predictionWrong:'! 你的预测需要修正',predictionHint:'先猜一猜（不会改变实验条件）',predictionNote:'红色提示表示预测答错；气泡按实际条件展示实验结果。',choosePrediction:'先选择预测',
      photosynthesis:'光合作用',gasOxygen:'O₂ 氧气',gasCarbon:'CO₂ 二氧化碳',gasWait:'按「开始实验」，观察气体流动',gasNote:'气泡表示气体移动，数量和速度不代表真实比例。',
      periodLabel:'选择白天或黑夜',day:'☀️ 白天',night:'🌙 黑夜',
      periodHint:'白天可关闭阳光来模拟遮光；黑夜没有阳光。本模拟不包含人工灯光。',
      dayNoLightSummary:'白天遮光：没有阳光时不能进行光合作用，但植物仍会呼吸。',
      daySummary:'白天有阳光：其他条件齐全时，光合作用与呼吸同时进行。',
      nightSummary:'黑夜没有光照：不能进行光合作用，但植物仍然会呼吸。',
      respiration:'呼吸 · 白天和黑夜都在进行',breathPlant:'植物',breathIn:'吸收氧气',breathOut:'释放二氧化碳',
      soundOn:'🔊 声音：开',soundOff:'🔇 声音：关',
      lang:'zh-Hans',title:'光合作用 · 小小植物实验室',brand:'小小植物实验室',home:'植物实验室首页',description:'动手探索光合作用的条件与过程。',grade:'四年级 · 科学',teacher:'ⓘ 教师指南',teacherTitle:'教师指南',languageLabel:'选择语言',
      teacherText:'建议用时 10–15 分钟。先在四项条件齐全时做实验，再一次只关闭一项条件，预测并比较结果。教材依据：所提供课本印刷页 59–76（PDF 第 70–87 页），重点为印刷页 67–74 的光合作用。本工具为概念模拟，没有时间、产量或生长速度的测量意义。植物在白天和夜晚都会呼吸；没有光时不能进行光合作用。',
      intro:'一起发现植物的秘密',topic:'光合作用',introText:'先预测，再切换条件，看看植物还能不能制造食物。',labTag:'互动实验区',steps:'预测 → 操作 → 观察',heading:'少了一个条件，会怎样？',instruction:'先在条件齐全时试一试，再只关闭一个条件，比较两次结果。',reset:'↻ 重新开始实验',footer:'🌱 观察 · 尝试 · 发现',footerBrand:'小小植物实验室 · 四年级科学',
      sceneLabel:'植物示意图：根吸收水，叶子利用阳光和二氧化碳制造糖并释放氧气。',sceneBadge:'LEAF LAB / 概念示意',oxygen:'氧气',sugar:'糖',provide:'提供{condition}',prediction:'我的预测：',yes:'能进行光合作用',no:'不能',run:'▷ 开始实验，看看结果',help:'这些条件有什么作用？',
      modelNote:'概念模拟：开关只表示条件有或无，不代表真实时间或产量。建议先做条件齐全的基准实验，再一次只改变一个条件。',sceneSummary:'植物概念模拟。{conditions}。{status}',present:'有',absent:'无',separator:'、',producing:'正在制造糖，并释放氧气',waiting:'改变条件后，点击开始实验',stopped:'条件不足，无法进行光合作用',needPrediction:'先选一个预测吧：你认为植物能进行光合作用吗？',
      success:'四项条件齐全，植物能进行光合作用，制造糖并释放氧气。',missing:'缺少{conditions}，植物不能进行光合作用。它仍会呼吸，也可能利用储存的食物维持生命。',fairTest:'想知道某一项条件的作用？恢复其他条件，再一次只改变一项。',correct:'✓ 预测正确！',reconsider:'再想一想：',compared:'✓ 已完成基准与单项条件的比较！',
      conditions:{
        light:{name:'阳光',source:'来自太阳',detail:'阳光为光合作用提供能量。叶子里的叶绿素能吸收阳光。'},
        water:{name:'水',source:'根部吸收',detail:'植物的根吸收水，再由茎把水输送到叶子。水是制造食物的原料。'},
        co2:{name:'二氧化碳',source:'来自空气',detail:'空气中的二氧化碳通过叶子上的气孔进入叶子，是制造食物的原料。'},
        chlorophyll:{name:'叶绿素',source:'藏在叶子里',detail:'叶绿素能吸收阳光，帮助植物进行光合作用。模拟中叶子变黄仅用来表示没有叶绿素。'}
      }
    },
    ms:{
      observationIntro:'Fotosintesis tidak berlaku pada waktu malam, tetapi tumbuhan masih bernafas. Mari perhatikan pergerakan gas.',
      observationTag:'Pemerhatian malam',observationHeading:'Bagaimanakah tumbuhan bernafas pada waktu malam?',observationInstruction:'Tekan butang di bawah. Perhatikan O₂ masuk dan CO₂ keluar daripada tumbuhan. Tumbuhan juga bernafas pada waktu siang.',observationSteps:'Tekan → Perhati → Teroka',observeNight:'▶ Perhatikan pernafasan malam',pauseNight:'⏸ Jeda pemerhatian',nightWaiting:'Tekan butang pemerhatian untuk melihat pergerakan gas',nightRunning:'Bernafas: menyerap oksigen dan membebaskan karbon dioksida',nightPaused:'Animasi dijeda; tumbuhan masih bernafas',observationNote:'Perhatikan pernafasan tumbuhan biasa: oksigen dan gula yang disimpan digunakan untuk membebaskan karbon dioksida, air dan tenaga bagi mengekalkan kehidupan. Klorofil tidak diperlukan untuk pernafasan.',nightReset:'↻ Ulang pemerhatian',
      conditionPrompt:'Keperluan fotosintesis · Ketik kad untuk tambah',conditionOn:'Dibekalkan',conditionOff:'Ketik untuk tambah',
      nightConditionsNote:'Kad ini menunjukkan keperluan fotosintesis. Tanpa cahaya pada waktu malam, fotosintesis tidak berlaku walaupun keperluan ini dibekalkan. Tumbuhan masih bernafas: menyerap O₂ (oksigen) dan membebaskan CO₂ (karbon dioksida).',
      retryPrediction:'Ramalan belum tepat. Semak keperluan dan cuba lagi. Animasi gas dimainkan selepas ramalan yang betul.',animationPaused:'Animasi dijeda. Ubah ramalan dan cuba lagi.',
      predictionLabel:'Ramalan anda',actualLabel:'Hasil eksperimen',cannotPhoto:'Fotosintesis tidak boleh berlaku',predictionRight:'✓ Ramalan anda betul!',predictionWrong:'! Semak semula ramalan anda',predictionHint:'Teka dahulu (tidak mengubah keperluan)',predictionNote:'Petunjuk merah bermaksud ramalan perlu dibetulkan. Gelembung menunjukkan hasil berdasarkan keperluan sebenar.',choosePrediction:'Pilih ramalan dahulu',
      photosynthesis:'Fotosintesis',gasOxygen:'O₂ Oksigen',gasCarbon:'CO₂ Karbon dioksida',gasWait:'Jalankan eksperimen untuk melihat aliran gas',gasNote:'Gelembung menunjukkan pergerakan gas, bukan kuantiti atau kadar sebenar.',
      periodLabel:'Pilih siang atau malam',day:'☀️ Siang',night:'🌙 Malam',
      periodHint:'Pada waktu siang, matikan cahaya matahari untuk meniru keadaan terlindung daripada cahaya. Tiada cahaya matahari pada waktu malam. Simulasi ini tidak menggunakan lampu.',
      dayNoLightSummary:'Siang tanpa cahaya: fotosintesis tidak berlaku, tetapi tumbuhan masih bernafas.',
      daySummary:'Siang dengan cahaya matahari: apabila keperluan lain dipenuhi, fotosintesis dan pernafasan berlaku serentak.',
      nightSummary:'Malam tanpa cahaya: fotosintesis tidak berlaku, tetapi tumbuhan masih bernafas.',
      respiration:'Pernafasan · Berlaku siang dan malam',breathPlant:'Tumbuhan',breathIn:'Menyerap oksigen',breathOut:'Membebaskan karbon dioksida',
      soundOn:'🔊 Bunyi: hidup',soundOff:'🔇 Bunyi: mati',
      lang:'ms',title:'Fotosintesis · Makmal Tumbuhan Mini',brand:'Makmal Tumbuhan Mini',home:'Laman utama makmal tumbuhan',description:'Terokai keperluan dan proses fotosintesis melalui eksperimen interaktif.',grade:'Tahun 4 · Sains',teacher:'ⓘ Panduan guru',teacherTitle:'Panduan guru',languageLabel:'Pilih bahasa',
      teacherText:'Cadangan masa: 10–15 minit. Jalankan eksperimen dengan keempat-empat keperluan dipenuhi, kemudian matikan satu keperluan sahaja pada satu-satu masa. Buat ramalan dan bandingkan hasil. Rujukan: buku teks yang diberikan, halaman bercetak 59–76 (halaman PDF 70–87), khususnya fotosintesis pada halaman bercetak 67–74. Ini ialah simulasi konsep, bukan ukuran masa, kuantiti hasil atau kadar pertumbuhan sebenar. Tumbuhan bernafas pada waktu siang dan malam. Tanpa cahaya, fotosintesis tidak berlaku.',
      intro:'Mari terokai rahsia tumbuhan',topic:'Fotosintesis',introText:'Buat ramalan, ubah keperluan dan lihat sama ada tumbuhan masih boleh membuat makanan.',labTag:'Eksperimen interaktif',steps:'Ramal → Cuba → Perhati',heading:'Apa berlaku jika satu keperluan tiada?',instruction:'Cuba dengan semua keperluan dipenuhi. Kemudian matikan satu sahaja dan bandingkan hasilnya.',reset:'↻ Mulakan semula eksperimen',footer:'🌱 Perhati · Cuba · Teroka',footerBrand:'Makmal Tumbuhan Mini · Sains Tahun 4',
      sceneLabel:'Rajah tumbuhan: akar menyerap air. Daun menggunakan cahaya matahari dan karbon dioksida untuk menghasilkan gula serta membebaskan oksigen.',sceneBadge:'LEAF LAB / Simulasi konsep',oxygen:'Oksigen',sugar:'Gula',provide:'Bekalkan {condition}',prediction:'Ramalan saya:',yes:'Fotosintesis boleh berlaku',no:'Tidak boleh',run:'▷ Jalankan eksperimen',help:'Apakah fungsi setiap keperluan?',
      modelNote:'Simulasi konsep: suis hanya menunjukkan sama ada sesuatu keperluan ada atau tiada, bukan masa atau kuantiti hasil sebenar. Cuba dengan semua keperluan dipenuhi dahulu, kemudian ubah satu sahaja pada satu-satu masa.',sceneSummary:'Simulasi tumbuhan. {conditions}. {status}',present:'ada',absent:'tiada',separator:', ',producing:'Menghasilkan gula dan membebaskan oksigen',waiting:'Ubah keperluan, kemudian jalankan eksperimen',stopped:'Keperluan tidak lengkap: fotosintesis tidak berlaku',needPrediction:'Pilih ramalan dahulu: bolehkah tumbuhan menjalankan fotosintesis?',
      success:'Keempat-empat keperluan dipenuhi. Tumbuhan boleh menjalankan fotosintesis untuk menghasilkan gula dan membebaskan oksigen.',missing:'Tanpa {conditions}, tumbuhan tidak boleh menjalankan fotosintesis. Tumbuhan masih bernafas dan mungkin menggunakan makanan yang disimpan untuk terus hidup.',fairTest:'Ingin mengetahui kesan satu keperluan? Pulihkan keperluan lain, kemudian ubah satu sahaja pada satu-satu masa.',correct:'✓ Ramalan betul! ',reconsider:'Fikir semula: ',compared:'✓ Anda telah membandingkan keadaan lengkap dengan keadaan yang kekurangan satu keperluan!',
      conditions:{
        light:{name:'Cahaya matahari',source:'Daripada matahari',detail:'Cahaya matahari membekalkan tenaga untuk fotosintesis. Klorofil dalam daun menyerap cahaya matahari.'},
        water:{name:'Air',source:'Diserap oleh akar',detail:'Akar menyerap air. Batang mengangkut air ke daun. Air ialah bahan yang digunakan untuk membuat makanan.'},
        co2:{name:'Karbon dioksida',source:'Daripada udara',detail:'Karbon dioksida dalam udara masuk ke dalam daun melalui stoma. Gas ini digunakan untuk membuat makanan.'},
        chlorophyll:{name:'Klorofil',source:'Di dalam daun',detail:'Klorofil menyerap cahaya matahari untuk membantu fotosintesis. Daun kuning dalam simulasi ini hanya mewakili keadaan tanpa klorofil.'}
      }
    },
    en:{
      observationIntro:'There is no photosynthesis at night, but plants still respire. Watch how the gases move.',
      observationTag:'Night observation',observationHeading:'How does a plant respire at night?',observationInstruction:'Press the button below. Watch O₂ enter and CO₂ leave the plant. Plants also respire during the day.',observationSteps:'Press → Observe → Discover',observeNight:'▶ Observe night respiration',pauseNight:'⏸ Pause observation',nightWaiting:'Press the observation button to watch the gases move',nightRunning:'Respiring: taking in oxygen and releasing carbon dioxide',nightPaused:'Animation paused; the plant still respires',observationNote:'Observe respiration in a normal plant: it uses oxygen and stored sugar, releasing carbon dioxide, water and energy to stay alive. Chlorophyll is not needed for respiration.',nightReset:'↻ Restart observation',
      conditionPrompt:'Photosynthesis needs · Tap a card to add',conditionOn:'Provided',conditionOff:'Tap to add',
      nightConditionsNote:'These cards show the needs for photosynthesis. Without light at night, photosynthesis cannot happen even if these needs are met. The plant still respires: taking in O₂ (oxygen) and releasing CO₂ (carbon dioxide).',
      retryPrediction:'Not quite! Check the conditions and try again. Gas animations play after a correct prediction.',animationPaused:'Animation paused. Change your prediction and try again.',
      predictionLabel:'Your prediction',actualLabel:'Experiment result',cannotPhoto:'Photosynthesis cannot happen',predictionRight:'✓ Your prediction is correct!',predictionWrong:'! Revise your prediction',predictionHint:'Take a guess (this does not change the conditions)',predictionNote:'Red feedback means the prediction needs correcting. Bubbles show the result based on the actual conditions.',choosePrediction:'Choose a prediction first',
      photosynthesis:'Photosynthesis',gasOxygen:'O₂ Oxygen',gasCarbon:'CO₂ Carbon dioxide',gasWait:'Run the experiment to watch the gases move',gasNote:'Bubbles show gas movement, not real quantities or rates.',
      periodLabel:'Choose day or night',day:'☀️ Day',night:'🌙 Night',
      periodHint:'During the day, turn off sunlight to model blocking the light. There is no sunlight at night. This model does not include artificial lighting.',
      dayNoLightSummary:'Daytime with light blocked: photosynthesis cannot happen, but the plant still respires.',
      daySummary:'Daylight: when the other needs are met, photosynthesis and respiration happen at the same time.',
      nightSummary:'Night without light: photosynthesis cannot happen, but the plant still respires.',
      respiration:'Respiration · Happens day and night',breathPlant:'Plant',breathIn:'Takes in oxygen',breathOut:'Releases carbon dioxide',
      soundOn:'🔊 Sound: on',soundOff:'🔇 Sound: off',
      lang:'en',title:'Photosynthesis · Little Leaf Lab',brand:'Little Leaf Lab',home:'Plant lab home',description:'Explore the needs and process of photosynthesis with an interactive experiment.',grade:'Year 4 · Science',teacher:'ⓘ Teacher guide',teacherTitle:'Teacher guide',languageLabel:'Choose language',
      teacherText:'Suggested time: 10–15 minutes. First run the experiment with all four needs met. Then turn off just one at a time, predict and compare the results. Based on the supplied textbook, printed pages 59–76 (PDF pages 70–87), especially photosynthesis on printed pages 67–74. This is a concept simulation, not a measurement of real time, yield or growth rate. Plants respire during both day and night. Without light, photosynthesis cannot take place.',
      intro:'Discover the secrets of plants',topic:'Photosynthesis',introText:'Make a prediction, change the conditions and see if the plant can still make food.',labTag:'Interactive experiment',steps:'Predict → Try → Observe',heading:'What if one need is missing?',instruction:'Try with all four needs met. Then turn off just one and compare the results.',reset:'↻ Restart experiment',footer:'🌱 Observe · Try · Discover',footerBrand:'Little Leaf Lab · Year 4 Science',
      sceneLabel:'Plant diagram: roots absorb water. Leaves use sunlight and carbon dioxide to make sugar and release oxygen.',sceneBadge:'LEAF LAB / Concept model',oxygen:'Oxygen',sugar:'Sugar',provide:'Provide {condition}',prediction:'My prediction:',yes:'Photosynthesis can happen',no:'It cannot',run:'▷ Run the experiment',help:'What does each condition do?',
      modelNote:'Concept simulation: switches show whether a need is met, not real time or yield. Start with all four needs met, then change just one at a time.',sceneSummary:'Plant simulation. {conditions}. {status}',present:'present',absent:'absent',separator:', ',producing:'Making sugar and releasing oxygen',waiting:'Change the conditions, then run the experiment',stopped:'A need is missing: photosynthesis cannot happen',needPrediction:'Choose a prediction first: can the plant carry out photosynthesis?',
      success:'All four needs are met. The plant can carry out photosynthesis, making sugar and releasing oxygen.',missing:'Without {conditions}, the plant cannot carry out photosynthesis. It still respires and may use stored food to stay alive.',fairTest:'Want to find out what one condition does? Restore the other conditions, then change just one at a time.',correct:'✓ Correct prediction! ',reconsider:'Think again: ',compared:'✓ You compared all needs met with one need missing!',
      conditions:{
        light:{name:'Sunlight',source:'From the Sun',detail:'Sunlight provides energy for photosynthesis. Chlorophyll in the leaves absorbs sunlight.'},
        water:{name:'Water',source:'Absorbed by roots',detail:'Roots absorb water, and the stem carries it to the leaves. Water is a raw material for making food.'},
        co2:{name:'Carbon dioxide',source:'From the air',detail:'Carbon dioxide from the air enters the leaves through tiny openings called stomata. It is a raw material for making food.'},
        chlorophyll:{name:'Chlorophyll',source:'Inside the leaves',detail:'Chlorophyll absorbs sunlight to help photosynthesis. Yellow leaves in this simulation only represent the absence of chlorophyll.'}
      }
    }
  }
};
