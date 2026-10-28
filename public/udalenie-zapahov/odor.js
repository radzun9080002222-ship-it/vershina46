(() => {
  'use strict';
  const cases = {
    tobacco: {reason:'Табак', n:'01', title:'Съехали арендаторы.\nТабак остался.', description:'Запах может удерживаться в текстиле, мебели и осевших загрязнениях на поверхностях.', plan:'Отмывка поверхностей, оценка текстиля и мебели. Затем — подбор дополнительной дезодорации.'},
    pets: {reason:'Животные', n:'02', title:'Любимый питомец.\nНелюбимый запах.', description:'Локальные метки могут впитаться в обивку, швы и нижние слои покрытия.', plan:'Поиск загрязнения, специализированная очистка, при необходимости химчистка и сушка. Глубоко повреждённый материал может потребовать замены.'},
    damp: {reason:'Сырость', n:'03', title:'Вода ушла.\nСырость осталась.', description:'После протечки запах может сохраняться в непросохших материалах. Обработка воздуха не устраняет влагу.', plan:'Сначала устранить протечку, оценить влажность и состояние материалов. При необходимости — осушение и профильный специалист.'},
    smoke: {reason:'Гарь', n:'04', title:'Следы дыма\nне только в воздухе.', description:'Копоть и повреждённые материалы требуют отдельной оценки. Бытовой запах и последствия пожара — не одна услуга.', plan:'Уточнить масштаб, составить отдельную смету на очистку и восстановление. При серьёзных повреждениях нужна профильная оценка.'},
    drain: {reason:'Канализация', n:'05', title:'Иногда дело\nне в уборке.', description:'Запах может быть связан с сифонами, соединениями или вентиляцией.', plan:'Сначала проверить инженерную причину с профильным специалистом. Дезодорация не заменяет ремонт сантехники.'},
    new: {reason:'После ремонта', n:'06', title:'Ремонт новый.\nВоздух — тяжёлый.', description:'Источник может находиться в мебели, покрытиях или отделочных материалах. Универсальная обработка подходит не всегда.', plan:'Определить источник выделений и условия вентиляции. При необходимости обсудить замену материала или специализированную очистку воздуха.'}
  };
  const tabs = [...document.querySelectorAll('[data-case]')];
  let selected = 'tobacco';
  function chooseCase(key, focus = false) {
    selected = key;
    const data = cases[key];
    tabs.forEach(tab => {const active = tab.dataset.case === key; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; if (active && focus) tab.focus();});
    document.getElementById('case-index').textContent = `${data.n} / 06`;
    const title = document.getElementById('case-title'); title.replaceChildren();
    data.title.split('\n').forEach((line, i) => {if(i) title.append(document.createElement('br')); title.append(document.createTextNode(line));});
    document.getElementById('case-description').textContent = data.description;
    document.getElementById('case-plan').textContent = data.plan;
    document.getElementById('situation-panel').setAttribute('aria-labelledby',`tab-${key}`);
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => chooseCase(tab.dataset.case));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault(); chooseCase(tabs[next].dataset.case, true);
    });
  });
  const form = document.getElementById('odor-brief');
  const area = document.getElementById('odor-area');
  const duration = document.getElementById('odor-duration');
  function updateBrief() {
    const reason = form.querySelector('input[name="reason"]:checked').value;
    document.getElementById('area-output').textContent = area.value;
    document.getElementById('summary-area').textContent = `${area.value} м²`;
    document.getElementById('summary-reason').textContent = reason;
    document.getElementById('summary-duration').textContent = duration.value;
    const message = `Здравствуйте! Хочу обсудить удаление запаха в Курске. Причина: ${reason}. Площадь: ${area.value} м². Давность: ${duration.value}. Подскажите подходящий состав работ и стоимость.`;
    document.getElementById('brief-whatsapp').href = `https://wa.me/79224539145?text=${encodeURIComponent(message)}`;
  }
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', updateBrief);
  form.addEventListener('change', updateBrief);
  document.getElementById('case-cta').addEventListener('click', () => {
    const radio = [...form.querySelectorAll('input[name="reason"]')].find(input => input.value === cases[selected].reason);
    if(radio) radio.checked = true;
    updateBrief();
  });
  updateBrief();
})();
