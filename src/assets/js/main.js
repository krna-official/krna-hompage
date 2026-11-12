// mobile menu
const btn = document.querySelector('.menu-btn');
if (btn) btn.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  btn.setAttribute('aria-expanded', open);
});

// case filters
const filters = document.querySelector('.filters');
if (filters) {
  const cards = document.querySelectorAll('#caseGrid .case');
  const apply = (f) => {
    filters.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.filter === f));
    cards.forEach(c => {
      const show = f === 'all' || c.dataset.industry === f || c.dataset.type === f;
      c.classList.toggle('hide', !show);
    });
  };
  filters.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    apply(b.dataset.filter);
    history.replaceState(null, '', b.dataset.filter === 'all' ? location.pathname : '#' + b.dataset.filter);
  });
  const h = decodeURIComponent(location.hash.slice(1));
  if (h && filters.querySelector(`[data-filter="${CSS.escape(h)}"]`)) apply(h);
}

// contact form
const form = document.getElementById('contactForm');
if (form) {
  const subj = new URLSearchParams(location.search).get('subject');
  if (subj) form.querySelector('#subject').value = subj + ' 견적 문의';
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = form.querySelector('.form-msg');
    const data = new FormData(form);
    if (data.get('_gotcha')) return;
    if (form.getAttribute('action')) {
      msg.textContent = '보내는 중입니다...';
      try {
        const r = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!r.ok) throw new Error();
        form.reset(); msg.textContent = '문의가 접수되었습니다. 빠르게 연락드리겠습니다.';
      } catch { msg.textContent = '전송에 실패했습니다. 전화나 이메일로 연락 부탁드립니다.'; }
    } else {
      const body = `회사명: ${data.get('company')}\n담당자: ${data.get('name')}\n연락처: ${data.get('phone')}\n이메일: ${data.get('email')}\n문의 유형: ${data.get('type')}\n\n${data.get('message')}`;
      location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent('[홈페이지 문의] ' + data.get('subject'))}&body=${encodeURIComponent(body)}`;
      msg.textContent = '메일 프로그램이 열리면 보내기를 눌러주세요.';
    }
  });
}
