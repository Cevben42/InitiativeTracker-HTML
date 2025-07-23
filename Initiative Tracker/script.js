let combatants = [];
let selectedCharacterIndex = null;

const addForm = document.getElementById("addForm");
const nameInput = document.getElementById("nameInput");
const initiativeInput = document.getElementById("initiativeInput");
const hpInput = document.getElementById("hpInput");
const acInput = document.getElementById("acInput");
const combatList = document.getElementById("combatList");

const currentPanel = document.getElementById("currentCharacterPanel");
const charName = document.getElementById("charName");
const charHp = document.getElementById("charHp");
const charAc = document.getElementById("charAc");
const hpUp = document.getElementById("hpUp");
const hpDown = document.getElementById("hpDown");
const hpAdjustAmount = document.getElementById("hpAdjustAmount");

const terrainList = ["Muddy", "Beach", "Snow", "Grassy Plains", "Ship", "Ocean", "Forest", "Rocky"];
let currentTerrainIndex = 3; // Default to "Grassy Plains"

const menuToggle = document.getElementById("menuToggle");
const menuPanel = document.getElementById("menuPanel");
const terrainDisplay = document.getElementById("currentTerrain");
const changeTerrainBtn = document.getElementById("changeTerrainBtn");


addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const initiative = parseInt(initiativeInput.value);
  const hp = parseInt(hpInput.value);
  const ac = parseInt(acInput.value);

  if (!name || isNaN(initiative) || isNaN(hp) || isNaN(ac)) return;

  combatants.push({ name, initiative, hp, ac });
  sortCombatants();
  renderCombatants();

  addForm.reset();
});

function sortCombatants() {
  combatants.sort((a, b) => b.initiative - a.initiative);
}

function renderCombatants() {
  combatList.innerHTML = "";

  combatants.forEach((c, index) => {
    const li = document.createElement("li");
    li.textContent = `${c.name} (Init: ${c.initiative})`;

    // Highlight selected
    if (index === selectedCharacterIndex) {
      li.classList.add("current-turn");
    }

    // Click to select
    li.addEventListener("click", () => {
      selectedCharacterIndex = index;
      updateCurrentPanel();
      renderCombatants();
    });

    const btns = document.createElement("div");
    btns.className = "buttons";

    //Button to remove character
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      combatants.splice(index, 1);
      if (selectedCharacterIndex === index) {
        selectedCharacterIndex = null;
        currentPanel.classList.add("hidden");
      } else if (selectedCharacterIndex > index) {
        selectedCharacterIndex--;
      }
      renderCombatants();
    };

    //Button to turn done
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔";
    doneBtn.onclick = (e) => {
      e.stopPropagation();
      const [moved] = combatants.splice(index, 1);
      combatants.push(moved);
      selectedCharacterIndex = combatants.length - 1;
      renderCombatants();
      updateCurrentPanel();
    };

    btns.appendChild(doneBtn);
    btns.appendChild(removeBtn);
    li.appendChild(btns);
    combatList.appendChild(li);
  });
}

function updateCurrentPanel() {
  if (selectedCharacterIndex === null || !combatants[selectedCharacterIndex]) {
    currentPanel.classList.add("hidden");
    return;
  }

  const char = combatants[selectedCharacterIndex];
  charName.textContent = char.name;
  charHp.textContent = char.hp;
  charAc.textContent = char.ac;
  currentPanel.classList.remove("hidden");
}

hpUp.addEventListener("click", () => {
  if (selectedCharacterIndex === null) return;
  const amount = parseInt(hpAdjustAmount.value) || 1;
  combatants[selectedCharacterIndex].hp += amount;
  updateCurrentPanel();
});

hpDown.addEventListener("click", () => {
  if (selectedCharacterIndex === null) return;
  const amount = parseInt(hpAdjustAmount.value) || 1;
  combatants[selectedCharacterIndex].hp -= amount;
  updateCurrentPanel();
});

menuToggle.addEventListener("click", () => {
  menuPanel.classList.toggle("hidden");
});

changeTerrainBtn.addEventListener("click", () => {
  currentTerrainIndex = (currentTerrainIndex + 1) % terrainList.length;
  terrainDisplay.textContent = `Terrain: ${terrainList[currentTerrainIndex]}`;
});
