// Comprehensive food database with standard nutritional metrics per 100g
const FOOD_DATABASE = {
  Dairy: [
    { id: 'milk', name: 'Whole Milk', cal: 60, p: 3.2, c: 4.8, f: 3.3 },
    { id: 'paneer', name: 'Paneer (Cottage Cheese)', cal: 265, p: 18.3, c: 1.2, f: 20.8 },
    { id: 'curd', name: 'Greek Yogurt / Curd', cal: 98, p: 10.0, c: 3.6, f: 5.0 },
    { id: 'cheese', name: 'Cheddar Cheese', cal: 402, p: 25.0, c: 1.3, f: 33.0 }
  ],
  Veg: [
    { id: 'spinach', name: 'Spinach', cal: 23, p: 2.9, c: 3.6, f: 0.4 },
    { id: 'broccoli', name: 'Broccoli', cal: 34, p: 2.8, c: 6.6, f: 0.4 },
    { id: 'potato', name: 'Boiled Potato', cal: 87, p: 1.9, c: 20.1, f: 0.1 },
    { id: 'beans', name: 'Green Beans', cal: 31, p: 1.8, c: 7.0, f: 0.2 }
  ],
  'Non-Veg': [
    { id: 'chicken_breast', name: 'Chicken Breast', cal: 165, p: 31.0, c: 0.0, f: 3.6 },
    { id: 'eggs', name: 'Whole Egg (2 large ~100g)', cal: 143, p: 12.6, c: 0.7, f: 9.5 },
    { id: 'fish', name: 'Salmon / White Fish', cal: 206, p: 22.0, c: 0.0, f: 12.0 }
  ],
  Seeds: [
    { id: 'chia', name: 'Chia Seeds', cal: 486, p: 16.5, c: 42.1, f: 30.7 },
    { id: 'flax', name: 'Flax Seeds', cal: 534, p: 18.3, c: 28.9, f: 42.2 },
    { id: 'pumpkin_seeds', name: 'Pumpkin Seeds', cal: 559, p: 30.2, c: 10.7, f: 49.1 }
  ],
  Nuts: [
    { id: 'almonds', name: 'Almonds', cal: 579, p: 21.2, c: 21.6, f: 49.9 },
    { id: 'walnuts', name: 'Walnuts', cal: 654, p: 15.2, c: 13.7, f: 65.2 },
    { id: 'peanuts', name: 'Peanuts', cal: 567, p: 25.8, c: 16.1, f: 49.2 }
  ],
  Millets: [
    { id: 'ragi', name: 'Finger Millet (Ragi)', cal: 328, p: 7.3, c: 72.0, f: 1.3 },
    { id: 'oats', name: 'Rolled Oats', cal: 389, p: 16.9, c: 66.3, f: 6.9 },
    { id: 'quinoa', name: 'Cooked Quinoa', cal: 120, p: 4.4, c: 21.3, f: 1.9 }
  ]
};

// Track currently active selected items in session
let activeFoodLog = [];

function AddDropDownList() {
  const categorySelect = document.getElementById('select-source');
  const selectedCat = categorySelect ? categorySelect.value : 'Dairy';
  const availableItems = FOOD_DATABASE[selectedCat] || [];

  // Pick first item in category not yet present, or fallback to first item
  const itemToAdd = availableItems.find(item => !activeFoodLog.some(log => log.id === item.id)) || availableItems[0];
  if (!itemToAdd) return;

  activeFoodLog.push({
    ...itemToAdd,
    instanceId: Date.now() + Math.random(),
    grams: 100 // default portion
  });

  renderFoodLog();
}

function removeFoodItem(instanceId) {
  activeFoodLog = activeFoodLog.filter(item => item.instanceId !== instanceId);
  renderFoodLog();
}

function updateFoodGrams(instanceId, grams) {
  const target = activeFoodLog.find(item => item.instanceId === instanceId);
  if (target) {
    target.grams = Math.max(0, parseFloat(grams) || 0);
    renderTotalsOnly();
  }
}

function btnRemove() {
  activeFoodLog.pop();
  renderFoodLog();
}

function renderFoodLog() {
  const container = document.getElementById('dvContainer');
  if (!container) return;

  if (activeFoodLog.length === 0) {
    container.innerHTML = `
      <div style="width:100%; text-align:center; color:#94a3b8; padding:24px; font-size:14px; border:1.5px dashed #cbd5e1; border-radius:10px; background:#f8fafc;">
        No dietary sources added yet. Pick a food group from the dropdown and click <strong>+ Add Group</strong>.
      </div>
    `;
    renderTotalsOnly();
    return;
  }

  container.innerHTML = activeFoodLog.map(item => {
    const factor = item.grams / 100;
    const curCal = (item.cal * factor).toFixed(0);
    const curP = (item.p * factor).toFixed(1);
    const curC = (item.c * factor).toFixed(1);
    const curF = (item.f * factor).toFixed(1);

    return `
      <div class="resource-card" id="food-${item.instanceId}">
        <div class="resource-card-header">
          <span class="resource-name">${item.name}</span>
          <button class="resource-del-btn" onclick="removeFoodItem(${item.instanceId})" title="Remove item">✕</button>
        </div>
        <div class="resource-inputs-row">
          <label>Portion (g):</label>
          <input type="number" min="10" step="10" value="${item.grams}" class="resource-gram-input"
                 oninput="updateFoodGrams(${item.instanceId}, this.value)">
        </div>
        <div class="resource-stats-badges">
          <span class="badge-cal">${curCal} kcal</span>
          <span class="badge-p">P: ${curP}g</span>
          <span class="badge-c">C: ${curC}g</span>
          <span class="badge-f">F: ${curF}g</span>
        </div>
      </div>
    `;
  }).join('');

  renderTotalsOnly();
}

function renderTotalsOnly() {
  const totalDiv = document.getElementById('total-resources');
  if (!totalDiv) return;

  let totCal = 0, totP = 0, totC = 0, totF = 0;

  activeFoodLog.forEach(item => {
    const factor = item.grams / 100;
    totCal += item.cal * factor;
    totP += item.p * factor;
    totC += item.c * factor;
    totF += item.f * factor;
  });

  if (activeFoodLog.length === 0) {
    totalDiv.innerHTML = '';
    return;
  }

  totalDiv.innerHTML = `
    <div class="resource-total-summary">
      <span class="total-title">Total Added Sources:</span>
      <span class="total-chip" style="background:#e0f2fe; color:#0369a1;">🔥 ${totCal.toFixed(0)} kcal</span>
      <span class="total-chip" style="background:#dcfce7; color:#15803d;">🥩 Protein: ${totP.toFixed(1)}g</span>
      <span class="total-chip" style="background:#eff6ff; color:#2563eb;">🍞 Carbs: ${totC.toFixed(1)}g</span>
      <span class="total-chip" style="background:#fef3c7; color:#b45309;">🥑 Fats: ${totF.toFixed(1)}g</span>
    </div>
  `;
}

// Initial hydration on DOM readiness
window.addEventListener('DOMContentLoaded', () => {
  renderFoodLog();
});
