const $input = document.getElementById('input');
const $todo  = document.getElementById('todo');
const $done  = document.getElementById('done');

const seedTodo = [];
const seedDone = [];

seedTodo.forEach(t => addTo($todo, t, 'done'));
seedDone.forEach(t => addTo($done, t, 'del'));

$input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); 
    const v = $input.value.trim();
    if (!v) return;
    addTo($todo, v, 'done');
    $input.value = '';
  }
});

document.body.addEventListener('click', (e) => {
  const target = e.target;
  if (!(target instanceof Element)) return;

  const btn = target.closest('button[data-act]');
  if (!btn) return;

  const li = btn.closest('li.item');
  if (!li) return;

  const txtEl = li.querySelector('.txt');
  const text = txtEl ? txtEl.textContent : '';

  if (btn.dataset.act === 'done') {
    li.remove();
    addTo($done, text, 'del');
  }
  if (btn.dataset.act === 'del') {
    li.remove();
  }
});

function addTo(listEl, text, action) {
  const li = document.createElement('li');
  li.className = 'item';
  li.innerHTML = `
    <span class="txt">${escapeHtml(text)}</span>
    <button class="btn" data-act="${action}" type="button">
      ${action === 'done' ? '완료' : '삭제'}
    </button>
  `;
  listEl.appendChild(li);
}