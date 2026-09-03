/* Generic CRUD module — v3 (matches new admin.css) */
import { supabase } from '../lib/supabase.js';
import { icon } from '../icons.js';

export class AdminModule {
  constructor(config, container, toast) {
    this.config = config;
    this.container = container;
    this.toast = toast;
    this.rows = [];
    this.search = '';
  }

  async load() {
    this.container.innerHTML = `<div class="ad-loading">${icon.loaderSpin}<span>लोड हुँदै...</span></div>`;
    const { data, error } = await supabase.from(this.config.table).select('*').order('created_at', { ascending: false });
    if (error) { this.container.innerHTML = this.emptyBox('लोड असफल', error.message); return; }
    this.rows = data || [];
    this.render();
  }

  render() {
    const filtered = this.search
      ? this.rows.filter(r => JSON.stringify(r).toLowerCase().includes(this.search.toLowerCase()))
      : this.rows;

    this.container.innerHTML = `
      <div class="ad-panel ad-panel--flush">
        <div class="ad-panel__head">
          <div><h2>${this.config.label}</h2><div class="ad-panel__sub">${this.rows.length} रेकर्ड${this.search ? ` · ${filtered.length} नतिजा` : ''}</div></div>
          <div style="display:flex;gap:.6rem;flex-wrap:wrap;align-items:center">
            <div class="ad-search">${icon.search}<input type="search" placeholder="खोज्नुहोस्..." value="${esc(this.search)}" id="modSearch"></div>
            <button class="btn btn-primary" id="modAdd">${icon.plus} नयाँ थप्नुहोस्</button>
          </div>
        </div>
        ${filtered.length ? this.buildTable(filtered) : this.emptyBox('कुनै डाटा छैन', 'नयाँ थप्नका लागि माथिको बटन थिच्नुहोस्।')}
      </div>`;

    const si = document.getElementById('modSearch');
    if (si) si.addEventListener('input', () => {
      this.search = si.value;
      this.render();
      const ns = document.getElementById('modSearch');
      if (ns) { ns.focus(); ns.setSelectionRange(ns.value.length, ns.value.length); }
    });

    document.getElementById('modAdd')?.addEventListener('click', () => this.openForm(null));
    this.container.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => {
      const r = this.rows.find(x => x.id === b.dataset.edit);
      this.openForm(r);
    }));
    this.container.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', async () => {
      if (!confirm('हटाउने हो? फर्काउन सकिँदैन।')) return;
      const { error } = await supabase.from(this.config.table).delete().eq('id', b.dataset.del);
      error ? this.toast('हटाउन असफल: ' + error.message, 'err')
            : (this.toast('डाटा हटाइयो।', 'ok'), this.rows = this.rows.filter(r => r.id !== b.dataset.del), this.render());
    }));
  }

  buildTable(rows) {
    const cols = this.config.listColumns;
    return `<div class="ad-table-wrap"><table class="ad-table">
      <thead><tr>${cols.map(c => `<th>${c.label}</th>`).join('')}<th>कार्य</th></tr></thead>
      <tbody>
        ${rows.map(r => `<tr>
          ${cols.map(c => `<td>${this.cell(c, r)}</td>`).join('')}
          <td><div class="row-acts">
            <button class="btn-edit" data-edit="${r.id}" title="सम्पादन">${icon.edit}</button>
            <button class="btn-del" data-del="${r.id}" title="हटाउने">${icon.trash}</button>
          </div></td>
        </tr>`).join('')}
      </tbody>
    </table></div>`;
  }

  cell(col, row) {
    const v = row[col.key];
    if (col.type === 'image' && v) return `<img class="thumb" src="${esc(v)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">`;
    if (col.type === 'boolean') return `<span class="tag ${v ? 'tag-on' : 'tag-off'}">${v ? 'हो' : 'होइन'}</span>`;
    if (col.type === 'date') return fmtDate(v);
    if (col.type === 'array') return Array.isArray(v) && v.length ? v.length + ' वटा' : '—';
    if (col.type === 'truncate') return v ? esc(String(v).slice(0, 50)) + (v.length > 50 ? '…' : '') : '—';
    if (col.type === 'title') return `<div class="td-main">${esc(v || '—')}</div>`;
    if (col.type === 'label') return v ? `<span class="tag-label">${esc(v)}</span>` : '—';
    return esc(v || '—');
  }

  /* ── FORM MODAL ── */
  openForm(row) {
    const isNew = !row;
    const data = row || {};
    const fields = this.config.fields;
    const modal = document.createElement('div');
    modal.className = 'ad-modal open';
    modal.innerHTML = `<div class="ad-modal__card">
      <div class="ad-modal__head">
        <h3>${isNew ? 'नयाँ ' + this.config.label : this.config.label + ' सम्पादन'}</h3>
        <button class="ad-modal__close" data-close>${icon.close}</button>
      </div>
      <div class="ad-modal__body">
        <form id="modForm">${fields.map(f => this.fieldHTML(f, data)).join('')}</form>
      </div>
      <div class="ad-modal__foot">
        <button class="btn btn-ghost" data-close>रद्द</button>
        <button class="btn btn-primary" id="modSave">${icon.save} सेभ गर्नुहोस्</button>
      </div>
    </div>`;
    document.body.appendChild(modal);
    const close = () => modal.remove();
    modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
    modal.addEventListener('click', e => { if (e.target === modal) close(); });

    // image preview
    modal.querySelectorAll('[data-imgprev]').forEach(wrap => {
      const input = wrap.querySelector('input');
      const box = wrap.querySelector('.img-prev-box');
      const upd = () => { const v = input.value.trim(); if (v) { box.innerHTML = `<img src="${esc(v)}" onerror="this.parentElement.innerHTML=''" alt="">`; box.style.display = 'block'; } else box.style.display = 'none'; };
      input.addEventListener('input', upd); upd();
      const pickBtn = wrap.querySelector('[data-pickimg]');
      if (pickBtn) pickBtn.addEventListener('click', () => {
        if (window.openImagePicker) window.openImagePicker(url => { input.value = url; upd(); });
      });
    });

    // array chips
    modal.querySelectorAll('[data-array]').forEach(wrap => {
      const key = wrap.dataset.array;
      const input = wrap.querySelector('.chip-input-row input');
      const chips = wrap.querySelector('.chip-row');
      const renderChips = () => {
        chips.innerHTML = (data[key] || []).map((item, i) => `<span class="chip">${esc(item)} <button type="button" class="chip__rm" data-rm="${i}">✕</button></span>`).join('');
        chips.querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => { data[key].splice(+b.dataset.rm, 1); renderChips(); }));
      };
      const add = () => { if (!input.value.trim()) return; if (!data[key]) data[key] = []; data[key].push(input.value.trim()); input.value = ''; renderChips(); };
      input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); add(); } });
      wrap.querySelector('[data-addchip]').addEventListener('click', add);
      renderChips();
    });

    // save
    const save = async () => {
      const fd = new FormData(document.getElementById('modForm'));
      const payload = {};
      for (const f of fields) {
        if (f.type === 'array') { payload[f.key] = data[f.key] || []; continue; }
        if (f.type === 'boolean') { payload[f.key] = fd.get(f.key) === 'on'; continue; }
        if (f.type === 'number') { const nv = fd.get(f.key); payload[f.key] = nv === '' || nv === null ? null : Number(nv); continue; }
        if (f.type === 'row') { for (const sf of f.fields) payload[sf.key] = fd.get(sf.key) ?? ''; continue; }
        const v = fd.get(f.key);
        payload[f.key] = (v !== null && v !== undefined) ? v : '';
      }
      const btn = document.getElementById('modSave');
      btn.disabled = true;
      btn.innerHTML = `<span style="width:14px;height:14px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;display:inline-block;animation:spin .7s linear infinite"></span> सेभ हुँदै...`;
      const res = isNew
        ? await supabase.from(this.config.table).insert(payload).select().maybeSingle()
        : await supabase.from(this.config.table).update(payload).eq('id', data.id).select().maybeSingle();
      btn.disabled = false; btn.innerHTML = `${icon.save} सेभ गर्नुहोस्`;
      if (res.error) { this.toast('सेभ असफल: ' + res.error.message, 'err'); return; }
      if (isNew) this.rows.unshift(res.data);
      else { const i = this.rows.findIndex(r => r.id === data.id); if (i > -1) this.rows[i] = res.data; }
      this.toast(isNew ? 'डाटा थपियो।' : 'अपडेट भयो।', 'ok');
      close(); this.render();
    };
    document.getElementById('modSave').addEventListener('click', save);
    document.getElementById('modForm').addEventListener('submit', e => { e.preventDefault(); save(); });
  }

  fieldHTML(f, data) {
    const v = data[f.key] ?? '';
    if (f.type === 'text') return `<div class="af-group"><label>${f.label}</label><input name="${f.key}" value="${esc(v)}" placeholder="${esc(f.placeholder || '')}"></div>`;
    if (f.type === 'number') return `<div class="af-group"><label>${f.label}</label><input type="number" name="${f.key}" value="${esc(v)}" placeholder="${esc(f.placeholder || '')}"></div>`;
    if (f.type === 'textarea') return `<div class="af-group"><label>${f.label}</label><textarea name="${f.key}" placeholder="${esc(f.placeholder || '')}">${esc(v)}</textarea></div>`;
    if (f.type === 'image') return `<div class="af-group" data-imgprev><label>${f.label} (URL)</label><div class="img-input-row"><input name="${f.key}" value="${esc(v)}" placeholder="https://..."><button type="button" class="btn btn-ghost btn-sm" data-pickimg="${f.key}">${icon.library} पुस्तकालयबाट</button></div><div class="img-prev-box"></div><div class="img-hint">${icon.info} URL राख्नुस् वा पुस्तकालयबाट छान्नुस्।</div></div>`;
    if (f.type === 'boolean') return `<div class="af-group"><label class="af-check"><input type="checkbox" name="${f.key}" ${v ? 'checked' : ''}> ${f.label}</label></div>`;
    if (f.type === 'select') return `<div class="af-group"><label>${f.label}</label><select name="${f.key}"><option value="" ${!v ? 'selected' : ''}>— रोज्नुहोस् —</option>${f.options.map(o => `<option value="${o}" ${v === o ? 'selected' : ''}>${o}</option>`).join('')}</select></div>`;
    if (f.type === 'array') return `<div class="af-group" data-array="${f.key}"><label>${f.label}</label><div class="chip-input-row"><input placeholder="${esc(f.placeholder || 'थपेर Enter थिच्नुहोस्')}"><button type="button" class="btn btn-primary" data-addchip>${icon.plus}</button></div><div class="chip-row"></div></div>`;
    if (f.type === 'row') return `<div class="af-row">${f.fields.map(sf => this.fieldHTML(sf, data)).join('')}</div>`;
    return '';
  }

  emptyBox(title, sub = '') {
    return `<div class="ad-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><div class="ad-empty__title">${title}</div><p>${sub}</p></div>`;
  }
}

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const fmtDate = d => { if (!d) return '—'; try { return new Date(d).toLocaleDateString('ne-NP', { month:'short', day:'numeric' }); } catch { return String(d).slice(0,10); } };
