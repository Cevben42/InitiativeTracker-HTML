let combatants = [];
let currentTurnIndex = 0;

const addForm = document.getElementById("addForm");
const nameInput = document.getElementById("nameInput");
const initiativeInput = document.getElementById("initiativeInput");
const combatList = document.getElementById("combatList");
const nextTurnBtn = document.getElementById("nextTurnBtn");
const resetBtn = document.getElementById("resetBtn");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const initiative = parseInt(initiativeInput.value.trim());

  if (!name || isNaN(initiative)) return;

  combatants.push({ name, initiative });
  sortCombatants();
  renderCombatants();
  nameInput.value = "";
  initiativeInput.value = "";
});

nextTurnBtn.addEventListener("click", () => {
  if (combatants.length === 0) return;
  currentTurnIndex = (currentTurnIndex + 1) % combatants.length;
  renderCombatants();
});

resetBtn.addEventListener("click", () => {
  combatants = [];
  currentTurnIndex = 0;
  renderCombatants();
});

function sortCombatants() {
  combatants.sort((a, b) => b.initiative - a.initiative);
}

function renderCombatants() {
  combatList.innerHTML = "";

  combatants.forEach((c, index) => {
    const li = document.createElement("li");
    li.textContent = `${c.name} (Init: ${c.initiative})`;
    if (index === currentTurnIndex) {
      li.classList.add("current-turn");
    }

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖";
    removeBtn.onclick = () => {
      combatants.splice(index, 1);
      if (currentTurnIndex >= combatants.length) currentTurnIndex = 0;
      renderCombatants();
    };

    li.appendChild(removeBtn);
    combatList.appendChild(li);
  });
}