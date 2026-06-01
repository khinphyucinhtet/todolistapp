const TASKS_KEY = "reminderTasks";
const SELECTED_TASK_KEY = "selectedTaskIndex";
const PROFILE_KEY = "reminderProfile";
const LANGUAGE_KEY = "reminderLanguage";
const NOTIFICATION_ENABLED_KEY = "reminderNotificationEnabled";
const NOTIFICATION_LAST_SENT_KEY = "reminderLastNotificationDate";
const SNOOZED_NOTIFICATIONS_KEY = "reminderSnoozedNotifications";
const LEGACY_TASKS_KEY = "bestReminderTasks";
const LEGACY_SELECTED_KEY = "bestReminderSelectedTask";

const TASK_CATEGORIES = [
  { key: "Study", icon: "📖", color: "#ff2fa3" },
  { key: "Personal", icon: "👤", color: "#ff7a1a" },
  { key: "Shopping", icon: "🛒", color: "#fff200" },
  { key: "Work", icon: "💼", color: "#8057ff" },
];

const MOTIVATION_QUOTES = [
  "The secret of getting ahead is getting started.",
  "Small steps still move you forward.",
  "One task finished is momentum earned.",
  "Plan it. Do it. Feel accomplished.",
  "Tiny wins count too.",
  "You are doing better than you think.",
  "Start soft. Finish proud.",
  "One checkbox at a time.",
  "Your future self says thank you.",
  "Progress can be quiet and still be real.",
  "A gentle start is still a start.",
  "You do not need perfect energy to begin.",
  "Done is a beautiful word.",
  "Today deserves a little kindness.",
  "Small plans can create big relief.",
  "You are allowed to go slowly.",
  "A calm mind makes clear moves.",
  "Your effort matters today.",
  "Begin with the easiest step.",
  "Every task finished is a little sparkle.",
  "Keep going, little by little.",
  "You can do hard things gently.",
  "A tidy list makes a lighter mind.",
  "Breathe first. Then begin.",
  "You are building momentum.",
  "One minute of effort is still effort.",
  "Your pace is valid.",
  "Make today a little easier.",
  "The next step is enough.",
  "You are not behind. You are beginning.",
  "A small task done can change the mood.",
  "You deserve peace after progress.",
  "Let the list hold the worry.",
  "Your work is worth celebrating.",
  "A finished task is a tiny victory.",
  "Keep it simple. Keep it kind.",
  "You have handled tough days before.",
  "A clear plan is self-care.",
  "You are allowed to rest after effort.",
  "Do one thing with love.",
  "The day gets lighter when you start.",
  "A little progress is still progress.",
  "You are capable in small steps.",
  "Start where you are.",
  "Your best today is enough.",
  "Let today be manageable.",
  "You can reset at any moment.",
  "One task, one breath, one win.",
  "Gentle discipline is still discipline.",
  "Your list is a helper, not a judge.",
  "You are making room for calm.",
  "Choose one thing and begin.",
  "The smallest step breaks the spell.",
  "You are closer after every try.",
  "A quiet win is still a win.",
  "Be proud of showing up.",
  "You can make progress without rushing.",
  "Start tiny. Shine later.",
  "Today can still become better.",
  "You are doing meaningful work.",
  "Every check mark tells a story.",
  "Give yourself credit for trying.",
  "A gentle plan can carry a busy day.",
  "You are allowed to celebrate small things.",
  "Make the next task friendly.",
  "Your attention is a gift.",
  "Keep your goals kind and clear.",
  "One done task can calm the mind.",
  "You are moving forward.",
  "Little steps make strong habits.",
  "The list is here to support you.",
  "Your effort is not invisible.",
  "Take it one sweet step at a time.",
  "You can begin again anytime.",
  "Done feels better than perfect.",
  "Your mind deserves less clutter.",
  "A good day can start with one task.",
  "You are stronger than the messy list.",
  "Slow progress still arrives.",
  "A tiny start beats waiting.",
  "Choose calm, then action.",
  "You are creating space for yourself.",
  "Every task completed is care for tomorrow.",
  "You deserve a soft landing today.",
  "A checklist can be a kindness.",
  "Your courage can be quiet.",
  "Do the next kind thing for yourself.",
  "You are learning your rhythm.",
  "Start with what feels possible.",
  "You have permission to keep it simple.",
  "A small finish can lift the whole day.",
  "The first step is the bravest.",
  "You are doing enough to begin.",
  "Your progress belongs to you.",
  "Let the next task be light.",
  "A planned day feels softer.",
  "Your focus can be gentle.",
  "You are allowed to feel proud.",
  "One checked box, one happy brain.",
  "The little things are still real things.",
  "Keep showing up for yourself.",
  "You can finish more than you think.",
  "Your effort deserves a tiny celebration.",
  "Make space. Make progress.",
  "A calm list creates a calm start.",
  "You are not your unfinished tasks.",
  "Try one thing. That is enough.",
  "The next checkbox is waiting kindly.",
  "Be patient with your pace.",
  "You are building a better routine.",
  "Your day can be gentle and productive.",
  "A small plan is a powerful friend.",
  "You are worthy before the list is done.",
  "Celebrate the effort, not just the ending.",
  "Your tomorrow gets easier from today.",
  "One task down, more peace gained.",
  "Keep your heart soft and your list clear.",
  "You are making progress beautifully.",
];

const PRIORITY_LEVELS = [
  {
    key: "Emergency",
    order: 1,
    color: "#ff3a35",
    badgeBackground: "rgba(255, 58, 53, 0.12)",
  },
  {
    key: "Very Urgent",
    order: 2,
    color: "#ff8f00",
    badgeBackground: "rgba(255, 143, 0, 0.12)",
  },
  {
    key: "Moderate",
    order: 3,
    color: "#fff200",
    badgeBackground: "rgba(255, 242, 0, 0.2)",
  },
  {
    key: "Low",
    order: 4,
    color: "#39ac35",
    badgeBackground: "rgba(57, 172, 53, 0.14)",
  },
  {
    key: "Very Low",
    order: 5,
    color: "#1ea7a1",
    badgeBackground: "rgba(30, 167, 161, 0.14)",
  },
];

const calendarState = {
  currentYear: 0,
  currentMonth: 0,
  selectedDate: "",
};

const pendingCompletedIndexes = new Set();
const selectedCompletedIndexes = new Set();
let currentFilter = "All";
let currentTaskSearch = "";

document.addEventListener("DOMContentLoaded", () => {
  migrateLegacyStorage();
  initializeSplashScreen();
  initializeDescriptionCounter();
  initializePriorityOptions();
  initializeTaskForms();
  initializeTaskInteractions();
  setupFilterButtons();
  setupTaskSearch();
  setupHomeSearch();
  setupMotivationRefresh();
  initializeProfileActions();
  setupSidebar();
  setupCompletedTaskActions();
  setActiveBottomNav();
  updateHomeUserName();
  renderHomeProgress();
  renderHomeStats();
  renderRecentCompleted();
  renderHomeCategories();
  renderMotivationCard();
  updateNotificationBadge();
  renderTasks();
  renderOverview();
  renderCalendar();
  renderProfile();
  renderCompletedTasks();
  renderNotifications();
  renderSettings();
  notifyDueTasksIfAllowed();
});

function migrateLegacyStorage() {
  if (!localStorage.getItem(TASKS_KEY) && localStorage.getItem(LEGACY_TASKS_KEY)) {
    localStorage.setItem(TASKS_KEY, localStorage.getItem(LEGACY_TASKS_KEY));
  }

  if (!localStorage.getItem(SELECTED_TASK_KEY) && localStorage.getItem(LEGACY_SELECTED_KEY)) {
    localStorage.setItem(SELECTED_TASK_KEY, localStorage.getItem(LEGACY_SELECTED_KEY));
  }
}

function initializeSplashScreen() {
  const splashScreen = document.querySelector("[data-splash-screen]");
  if (!splashScreen) {
    return;
  }

  const target = splashScreen.dataset.splashTarget || "home.html";
  const delay = Number(splashScreen.dataset.splashDelay || "3000");
  let hasNavigated = false;

  const goToTarget = () => {
    if (hasNavigated) {
      return;
    }

    hasNavigated = true;
    window.location.href = target;
  };

  splashScreen.addEventListener("click", goToTarget);
  window.setTimeout(goToTarget, delay);
}

function initializeDescriptionCounter() {
  const textareas = document.querySelectorAll("[data-description-input]");
  textareas.forEach((textarea) => {
    const counter = document.querySelector(`#${textarea.dataset.counterId}`);
    if (!counter) {
      return;
    }

    const syncCounter = () => {
      counter.textContent = `${textarea.value.length}/100`;
    };

    textarea.addEventListener("input", syncCounter);
    syncCounter();
  });
}

function initializePriorityOptions() {
  const groups = document.querySelectorAll("[data-priority-group]");
  groups.forEach((group) => {
    const options = group.querySelectorAll(".priority-option");
    const hiddenInput = group.querySelector("[data-priority-input]");
    const syncState = () => {
      let selectedValue = hiddenInput ? hiddenInput.value : "";

      options.forEach((option) => {
        const input = option.querySelector("input");
        if (input && input.checked) {
          selectedValue = input.value;
        }
      });

      options.forEach((option) => {
        const input = option.querySelector("input");
        const isSelected = Boolean(input && input.value === selectedValue);
        if (input) {
          input.checked = isSelected;
        }
        option.classList.toggle("selected", isSelected);
      });

      if (hiddenInput && selectedValue) {
        hiddenInput.value = selectedValue;
      }
    };

    if (group.dataset.priorityBound !== "true") {
      options.forEach((option) => {
        option.addEventListener("click", () => {
          const input = option.querySelector("input");
          if (!input) {
            return;
          }

          options.forEach((item) => {
            item.classList.remove("selected");
          });
          input.checked = true;
          option.classList.add("selected");
          if (hiddenInput) {
            hiddenInput.value = option.dataset.priority || input.value;
          }
          syncState();
        });
      });

      group.dataset.priorityBound = "true";
    }

    syncState();
  });
}

function initializeTaskForms() {
  const createForm = document.querySelector("#create-task-form");
  if (createForm) {
    createForm.addEventListener("submit", (event) => {
      event.preventDefault();
      createTask();
    });
  }

  const editForm = document.querySelector("#edit-task-form");
  if (editForm) {
    populateEditForm();

    editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      updateTask();
    });
  }

  const deleteButton = document.querySelector("[data-delete-task]");
  if (deleteButton) {
    deleteButton.addEventListener("click", deleteTask);
  }
}

function initializeTaskInteractions() {
  const taskList = document.querySelector("#task-list");
  if (!taskList || taskList.dataset.bound === "true") {
    return;
  }

  taskList.addEventListener("click", (event) => {
    const checkbox = event.target.closest("[data-complete-index]");
    if (checkbox) {
      return;
    }

    const editButton = event.target.closest("[data-edit-index]");
    if (!editButton) {
      return;
    }

    editTask(Number(editButton.dataset.editIndex));
  });

  taskList.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-complete-index]");
    if (!checkbox) {
      return;
    }

    togglePendingComplete(Number(checkbox.dataset.completeIndex));
  });

  taskList.dataset.bound = "true";

  const pendingSummary = document.querySelector("[data-pending-summary]");
  if (pendingSummary && pendingSummary.dataset.bound !== "true") {
    pendingSummary.addEventListener("click", (event) => {
      const moveButton = event.target.closest("[data-move-completed]");
      if (moveButton) {
        moveCompletedTasks();
      }
    });

    pendingSummary.dataset.bound = "true";
  }
}

function setupFilterButtons() {
  const filterRow = document.querySelector("[data-filter-row]");
  if (!filterRow || filterRow.dataset.bound === "true") {
    return;
  }

  filterRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) {
      return;
    }

    setActiveFilter(button.dataset.filter || "All");
  });

  filterRow.dataset.bound = "true";
  setActiveFilter(currentFilter);
}

function setupTaskSearch() {
  const searchInput = document.querySelector("[data-task-search]");
  if (!searchInput || searchInput.dataset.bound === "true") {
    return;
  }

  searchInput.addEventListener("input", () => {
    currentTaskSearch = searchInput.value.trim().toLowerCase();
    renderTasks();
  });
  searchInput.dataset.bound = "true";
}

function setupHomeSearch() {
  const toggle = document.querySelector("[data-home-search-toggle]");
  const panel = document.querySelector("[data-home-search-panel]");
  const input = document.querySelector("[data-home-search-input]");
  const results = document.querySelector("[data-home-search-results]");
  if (!toggle || !panel || !input || !results || panel.dataset.bound === "true") {
    return;
  }

  toggle.addEventListener("click", () => {
    panel.classList.toggle("hidden");
    if (!panel.classList.contains("hidden")) {
      input.focus();
      renderHomeSearchResults();
    }
  });

  input.addEventListener("input", renderHomeSearchResults);
  results.addEventListener("click", (event) => {
    const result = event.target.closest("[data-search-task-index]");
    if (result) {
      editTask(Number(result.dataset.searchTaskIndex));
    }
  });

  panel.dataset.bound = "true";
}

function setupMotivationRefresh() {
  const root = document.querySelector("[data-motivation-card]");
  if (!root || root.dataset.bound === "true") {
    return;
  }

  root.addEventListener("click", (event) => {
    const refreshButton = event.target.closest("[data-refresh-quote]");
    if (!refreshButton) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    renderMotivationCard(true);
  });

  root.dataset.bound = "true";
}

function initializeProfileActions() {
  const profileForm = document.querySelector("#profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveProfile();
    });
  }

  const profileRoot = document.querySelector("[data-profile-root]");
  if (!profileRoot || profileRoot.dataset.bound === "true") {
    return;
  }

  profileRoot.addEventListener("click", (event) => {
    const editTrigger = event.target.closest("[data-profile-edit]");
    if (editTrigger) {
      editProfile();
      return;
    }

    const clearTrigger = event.target.closest("[data-profile-clear]");
    if (clearTrigger) {
      clearProfile();
    }
  });

  profileRoot.dataset.bound = "true";
}

function setupSidebar() {
  const openButton = document.querySelector("[data-sidebar-open]");
  const closeButton = document.querySelector("[data-sidebar-close]");
  const overlay = document.querySelector("[data-sidebar-overlay]");
  const sidebar = document.querySelector("[data-sidebar]");

  if (!sidebar || sidebar.dataset.bound === "true") {
    return;
  }

  if (openButton) {
    openButton.addEventListener("click", openSidebar);
  }
  if (closeButton) {
    closeButton.addEventListener("click", closeSidebar);
  }
  if (overlay) {
    overlay.addEventListener("click", closeSidebar);
  }

  sidebar.dataset.bound = "true";
}

function openSidebar() {
  const sidebar = document.querySelector("[data-sidebar]");
  const overlay = document.querySelector("[data-sidebar-overlay]");
  if (!sidebar || !overlay) {
    return;
  }

  overlay.classList.remove("hidden");
  window.requestAnimationFrame(() => {
    sidebar.classList.add("is-open");
    overlay.classList.add("is-open");
    sidebar.setAttribute("aria-hidden", "false");
  });
}

function closeSidebar() {
  const sidebar = document.querySelector("[data-sidebar]");
  const overlay = document.querySelector("[data-sidebar-overlay]");
  if (!sidebar || !overlay) {
    return;
  }

  sidebar.classList.remove("is-open");
  overlay.classList.remove("is-open");
  sidebar.setAttribute("aria-hidden", "true");
  window.setTimeout(() => {
    if (!overlay.classList.contains("is-open")) {
      overlay.classList.add("hidden");
    }
  }, 220);
}

function setupCompletedTaskActions() {
  const completedList = document.querySelector("[data-completed-list]");
  if (!completedList || completedList.dataset.bound === "true") {
    return;
  }

  completedList.addEventListener("click", (event) => {
    const selectable = event.target.closest("[data-completed-index]");
    if (!selectable) {
      return;
    }

    selectCompletedTask(Number(selectable.dataset.completedIndex));
  });

  const selectAllButton = document.querySelector("[data-completed-select-all]");
  const clearSelectedButton = document.querySelector("[data-completed-clear-selected]");
  const deleteSelectedButton = document.querySelector("[data-completed-delete-selected]");
  const deleteAllButton = document.querySelector("[data-completed-delete-all]");

  if (selectAllButton) {
    selectAllButton.addEventListener("click", selectAllCompletedTasks);
  }
  if (clearSelectedButton) {
    clearSelectedButton.addEventListener("click", clearCompletedSelection);
  }
  if (deleteSelectedButton) {
    deleteSelectedButton.addEventListener("click", deleteSelectedCompletedTasks);
  }
  if (deleteAllButton) {
    deleteAllButton.addEventListener("click", deleteAllCompletedTasks);
  }

  completedList.dataset.bound = "true";
}

function clearCompletedSelection() {
  selectedCompletedIndexes.clear();
  renderCompletedTasks();
}

function loadTasks() {
  const rawTasks = localStorage.getItem(TASKS_KEY);
  if (rawTasks === null) {
    const defaults = createDefaultTasks();
    saveTasks(defaults);
    return defaults;
  }

  try {
    const parsed = JSON.parse(rawTasks);
    if (!Array.isArray(parsed)) {
      throw new Error("Tasks were not stored as an array.");
    }

    return parsed.map(normalizeTask);
  } catch (error) {
    const defaults = createDefaultTasks();
    saveTasks(defaults);
    return defaults;
  }
}

function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function createTask() {
  const tasks = loadTasks();
  const formData = getTaskFormData("create");
  if (!formData) {
    return;
  }

  tasks.push({
    title: formData.title,
    description: formData.description,
    dueDate: formData.dueDate,
    priority: formData.priority,
    category: formData.category,
    completed: false,
    createdAt: new Date().toISOString(),
  });

  saveTasks(tasks);
  window.location.href = "view_list.html";
}

function renderTasks() {
  const taskList = document.querySelector("#task-list");
  if (!taskList) {
    return;
  }

  const tasks = loadTasks();
  [...pendingCompletedIndexes].forEach((index) => {
    if (!tasks[index] || tasks[index].completed) {
      pendingCompletedIndexes.delete(index);
    }
  });

  const activeTasks = sortTasksByPriorityAndDate(
    tasks
      .map((task, index) => ({ ...task, originalIndex: index }))
      .filter((task) => !task.completed)
  );
  const filteredTasks = filterTasks(activeTasks, currentFilter);
  const visibleTasks = currentTaskSearch
    ? filteredTasks.filter((task) => taskMatchesSearch(task, currentTaskSearch))
    : filteredTasks;

  updateProgressDisplay(calculateProgress(tasks));
  renderPendingCompletedSummary();

  if (!activeTasks.length) {
    renderEmptyState(
      taskList,
      "✨ Clean slate. Nice!",
      "Create a new task to start planning your day.",
      "Create Task",
      "create_list.html"
    );
    return;
  }

  if (!visibleTasks.length) {
    renderEmptyState(
      taskList,
      currentTaskSearch ? "No tasks match this search." : "No tasks match this filter.",
      currentTaskSearch ? "Try another keyword or clear the search." : "Try another filter or create a new task.",
      "Create Task",
      "create_list.html"
    );
    return;
  }

  taskList.innerHTML = visibleTasks
    .map((task) => {
      const priority = getPriorityConfig(task.priority);
      const dueLabel = getDueDateLabel(task.dueDate);
      const dueClass = dueLabel === "Overdue" ? "is-overdue" : "is-upcoming";
      const dueChipClass = getDueStatusClass(dueLabel);
      const isPending = pendingCompletedIndexes.has(task.originalIndex);
      const category = getCategoryConfig(task.category);

      return `
        <article class="task-row${isPending ? " is-pending-complete" : ""}" style="--task-priority-color:${priority.color};">
          <label class="checkbox-shell" aria-label="Mark ${escapeHtml(task.title)} as completed">
            <input type="checkbox" data-complete-index="${task.originalIndex}"${isPending ? " checked" : ""} />
            <span class="checkbox-mark"></span>
          </label>
          <span class="task-flag" style="background:${priority.color}; color:${priority.color};"></span>
          <button class="task-main" type="button" data-edit-index="${task.originalIndex}" aria-label="Edit ${escapeHtml(task.title)}">
            <span class="task-copy">
              <strong>${escapeHtml(task.title)}</strong>
              <span class="${dueClass}">${escapeHtml(dueLabel)}</span>
              <span class="due-chip ${dueChipClass}">${escapeHtml(getDueStatusText(dueLabel))}</span>
              <span class="task-category-chip" style="--category-color:${category.color};">${category.icon} ${escapeHtml(category.key)}</span>
            </span>
          </button>
          <span class="priority-badge" style="background:${priority.badgeBackground}; color:${priority.color};">${escapeHtml(task.priority)}</span>
          <button class="task-arrow-button" type="button" data-edit-index="${task.originalIndex}" aria-label="Open ${escapeHtml(task.title)}">›</button>
          <span class="pending-tick${isPending ? " is-visible" : ""}" aria-hidden="true">✓</span>
        </article>
      `;
    })
    .join("");
}

function filterTasks(tasks, filterType) {
  const today = getTodayDateString();

  if (filterType === "Emergency") {
    return tasks.filter((task) => task.priority === "Emergency" || task.priority === "Very Urgent");
  }
  if (filterType === "Today") {
    return tasks.filter((task) => task.dueDate === today);
  }
  if (filterType === "Upcoming") {
    return tasks.filter((task) => task.dueDate && task.dueDate > today);
  }
  if (TASK_CATEGORIES.some((category) => category.key === filterType)) {
    return tasks.filter((task) => task.category === filterType);
  }

  return tasks;
}

function setActiveFilter(filterType) {
  currentFilter = filterType || "All";

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === currentFilter);
  });

  renderTasks();
}

function taskMatchesSearch(task, query) {
  const haystack = [
    task.title,
    task.description,
    task.priority,
    task.category,
    getDueDateLabel(task.dueDate),
    task.completed ? "done completed finished" : "todo active in progress",
    task.completionStatus,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function renderHomeSearchResults() {
  const input = document.querySelector("[data-home-search-input]");
  const results = document.querySelector("[data-home-search-results]");
  if (!input || !results) {
    return;
  }

  const query = input.value.trim().toLowerCase();
  if (!query) {
    results.innerHTML = '<p class="search-empty">Search by title, priority, category, due date, done, or in progress.</p>';
    return;
  }

  const matches = loadTasks()
    .map((task, index) => ({ ...task, originalIndex: index }))
    .filter((task) => taskMatchesSearch(task, query))
    .slice(0, 8);

  if (!matches.length) {
    results.innerHTML = '<p class="search-empty">No matching tasks found.</p>';
    return;
  }

  results.innerHTML = matches
    .map((task) => {
      const priority = getPriorityConfig(task.priority);
      const statusText = task.completed ? "Done" : "In Progress";
      return `
        <button class="search-result-card" type="button" data-search-task-index="${task.originalIndex}">
          <span class="task-dot" style="background:${priority.color};"></span>
          <span>
            <strong>${escapeHtml(task.title)}</strong>
            <small>${escapeHtml(task.category)} • ${escapeHtml(task.priority)} • ${statusText}</small>
          </span>
        </button>
      `;
    })
    .join("");
}

function sortTasksByPriorityAndDate(tasks) {
  return [...tasks].sort((first, second) => {
    const priorityDifference =
      getPriorityConfig(first.priority).order - getPriorityConfig(second.priority).order;
    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return getSortableDateValue(first.dueDate) - getSortableDateValue(second.dueDate);
  });
}

function markTaskCompleted(index) {
  togglePendingComplete(index);
}

function togglePendingComplete(index) {
  const tasks = loadTasks();
  if (!Number.isInteger(index) || index < 0 || index >= tasks.length) {
    return;
  }

  if (pendingCompletedIndexes.has(index)) {
    pendingCompletedIndexes.delete(index);
  } else {
    pendingCompletedIndexes.add(index);
  }

  renderTasks();
}

function renderPendingCompletedSummary() {
  const summary = document.querySelector("[data-pending-summary]");
  if (!summary) {
    return;
  }

  const count = pendingCompletedIndexes.size;
  if (count === 0) {
    summary.classList.add("hidden");
    summary.innerHTML = "";
    return;
  }

  summary.classList.remove("hidden");
  summary.innerHTML = `
    <div class="completed-summary-text">${count} ${count === 1 ? "task" : "tasks"} completed</div>
    <button class="move-completed-button" type="button" data-move-completed>Move Completed Tasks</button>
  `;
}

function moveCompletedTasks() {
  const tasks = loadTasks();
  const completedAt = new Date().toISOString();
  const completedCount = pendingCompletedIndexes.size;

  [...pendingCompletedIndexes].forEach((index) => {
    if (!Number.isInteger(index) || index < 0 || index >= tasks.length) {
      return;
    }

    tasks[index] = {
      ...tasks[index],
      completed: true,
      completedAt,
      completionStatus: calculateCompletionStatus(tasks[index], completedAt),
    };
  });

  pendingCompletedIndexes.clear();
  saveTasks(tasks);
  renderTasks();
  renderOverview();
  renderCalendar();
  renderHomeProgress();
  renderHomeStats();
  renderRecentCompleted();
  renderHomeCategories();
  updateNotificationBadge();
  showSuccessToast(
    completedCount === 1 ? "✓ Task completed successfully!" : "✓ Tasks completed successfully!"
  );
  showConfettiCelebration(completedCount);
}

function calculateCompletionStatus(task, completedAt) {
  if (!task.dueDate) {
    return "On Time";
  }

  const completedDate = new Date(completedAt);
  const completedValue = formatDateValue(completedDate);
  if (completedValue < task.dueDate) {
    return "Early";
  }
  if (completedValue === task.dueDate) {
    return "On Time";
  }

  return "Late";
}

function editTask(index) {
  const tasks = loadTasks();
  if (!Number.isInteger(index) || index < 0 || index >= tasks.length) {
    return;
  }

  localStorage.setItem(SELECTED_TASK_KEY, String(index));
  window.location.href = "edit_list.html";
}

function updateTask() {
  const tasks = loadTasks();
  const selectedIndex = getSelectedTaskIndex(tasks);
  if (selectedIndex === -1) {
    window.location.href = "view_list.html";
    return;
  }

  const formData = getTaskFormData("edit");
  if (!formData) {
    return;
  }

  tasks[selectedIndex] = {
    ...tasks[selectedIndex],
    title: formData.title,
    description: formData.description,
    dueDate: formData.dueDate,
    priority: formData.priority,
    category: formData.category,
  };

  saveTasks(tasks);
  window.location.href = "view_list.html";
}

function deleteTask() {
  const tasks = loadTasks();
  const selectedIndex = getSelectedTaskIndex(tasks);
  if (selectedIndex === -1) {
    window.location.href = "view_list.html";
    return;
  }

  tasks.splice(selectedIndex, 1);
  saveTasks(tasks);
  localStorage.removeItem(SELECTED_TASK_KEY);
  window.location.href = "view_list.html";
}

function renderOverview() {
  const overviewRoot = document.querySelector("[data-overview-root]");
  if (!overviewRoot) {
    return;
  }

  const tasks = loadTasks();
  const stats = buildOverviewStats(tasks);
  const totalTasks = tasks.length;

  setText("[data-overview-completed]", stats.completed);
  setText("[data-overview-progress]", stats.inProgress);
  setText("[data-overview-not-done]", stats.notDone);
  setText("[data-overview-failed]", stats.failed);
  setText("[data-overview-total]", totalTasks);
  setText("[data-legend-completed]", `Completed (${stats.completed})`);
  setText("[data-legend-progress]", `In Progress (${stats.inProgress})`);
  setText("[data-legend-not-done]", `Not Done (${stats.notDone})`);
  setText("[data-legend-failed]", `Failed (${stats.failed})`);
  renderWeeklySummary(tasks);

  const donut = document.querySelector("[data-donut-chart]");
  if (!donut) {
    return;
  }

  if (totalTasks === 0) {
    donut.style.background = "conic-gradient(#dfe6f1 0deg 360deg)";
    return;
  }

  const completedAngle = (stats.completed / totalTasks) * 360;
  const progressAngle = (stats.inProgress / totalTasks) * 360;
  const notDoneAngle = (stats.notDone / totalTasks) * 360;
  const failedAngle = (stats.failed / totalTasks) * 360;

  const stopOne = completedAngle;
  const stopTwo = stopOne + progressAngle;
  const stopThree = stopTwo + notDoneAngle;
  const stopFour = stopThree + failedAngle;

  donut.style.background = `conic-gradient(
    #39ac35 0deg ${stopOne}deg,
    #ffc91c ${stopOne}deg ${stopTwo}deg,
    #1152d9 ${stopTwo}deg ${stopThree}deg,
    #ff5a5a ${stopThree}deg ${stopFour}deg,
    #dfe6f1 ${stopFour}deg 360deg
  )`;
}

function renderCompletedTasks() {
  const completedList = document.querySelector("[data-completed-list]");
  if (!completedList) {
    return;
  }
  const clearSelectedButton = document.querySelector("[data-completed-clear-selected]");

  const completedTasks = loadTasks()
    .map((task, index) => ({ ...task, originalIndex: index }))
    .filter((task) => task.completed)
    .sort((first, second) => getCompletedTimeValue(second) - getCompletedTimeValue(first));

  if (!completedTasks.length) {
    selectedCompletedIndexes.clear();
    if (clearSelectedButton) {
      clearSelectedButton.classList.add("hidden");
    }
    renderEmptyState(
      completedList,
      "🎉 No completed tasks yet.",
      "Finish a task and it will appear here."
    );
    return;
  }

  if (clearSelectedButton) {
    clearSelectedButton.classList.toggle("hidden", selectedCompletedIndexes.size === 0);
  }

  completedTasks.forEach((task) => {
    if (!task.completed) {
      selectedCompletedIndexes.delete(task.originalIndex);
    }
  });

  completedList.innerHTML = completedTasks
    .map((task, index) => {
      const priority = getPriorityConfig(task.priority);
      const status = task.completionStatus || calculateCompletionStatus(task, task.completedAt || new Date().toISOString());
      const statusClass = getCompletionStatusClass(status);
      const isSelected = selectedCompletedIndexes.has(task.originalIndex);
      const completedTime = formatCompletedTime(task.completedAt);
      const completedTimeMarkup = completedTime
        ? `<span>${escapeHtml(completedTime)}</span>`
        : "";

      return `
        <article class="completed-task-item${isSelected ? " is-selected" : ""}" data-completed-index="${task.originalIndex}">
          <span class="completed-select-circle" aria-hidden="true">${isSelected ? "✓" : ""}</span>
          <span class="completed-number">${index + 1}</span>
          <div class="completed-task-copy">
            <strong>${escapeHtml(task.title)}</strong>
            ${completedTimeMarkup}
          </div>
          <span class="priority-badge" style="background:${priority.badgeBackground}; color:${priority.color};">${escapeHtml(task.priority)}</span>
          <span class="completion-status ${statusClass}">${escapeHtml(status)}</span>
        </article>
      `;
    })
    .join("");
}

function selectCompletedTask(index) {
  if (!Number.isInteger(index)) {
    return;
  }

  if (selectedCompletedIndexes.has(index)) {
    selectedCompletedIndexes.delete(index);
  } else {
    selectedCompletedIndexes.add(index);
  }

  renderCompletedTasks();
}

function selectAllCompletedTasks() {
  const completedIndexes = loadTasks()
    .map((task, index) => ({ task, index }))
    .filter(({ task }) => task.completed)
    .map(({ index }) => index);

  const allSelected = completedIndexes.every((index) => selectedCompletedIndexes.has(index));
  selectedCompletedIndexes.clear();

  if (!allSelected) {
    completedIndexes.forEach((index) => selectedCompletedIndexes.add(index));
  }

  renderCompletedTasks();
}

function deleteSelectedCompletedTasks() {
  if (selectedCompletedIndexes.size === 0) {
    return;
  }

  const tasks = loadTasks().filter((task, index) => {
    return !(task.completed && selectedCompletedIndexes.has(index));
  });

  selectedCompletedIndexes.clear();
  saveTasks(tasks);
  renderCompletedTasks();
  renderOverview();
  renderCalendar();
  renderHomeProgress();
  renderHomeStats();
  renderRecentCompleted();
  updateNotificationBadge();
}

function deleteAllCompletedTasks() {
  const completedCount = loadTasks().filter((task) => task.completed).length;
  if (completedCount === 0) {
    return;
  }

  const confirmed = window.confirm("Delete all completed tasks?");
  if (!confirmed) {
    return;
  }

  const tasks = loadTasks().filter((task) => !task.completed);
  selectedCompletedIndexes.clear();
  saveTasks(tasks);
  renderCompletedTasks();
  renderOverview();
  renderCalendar();
  renderHomeProgress();
  renderHomeStats();
  renderRecentCompleted();
  updateNotificationBadge();
}

function renderCalendar() {
  const calendarRoot = document.querySelector("[data-calendar-root]");
  if (!calendarRoot) {
    return;
  }

  const today = getTodayValue();
  const selectedDate = calendarState.selectedDate || today;
  const selectedDateObject = new Date(`${selectedDate}T12:00:00`);

  if (!calendarState.selectedDate) {
    calendarState.selectedDate = selectedDate;
    calendarState.currentMonth = selectedDateObject.getMonth();
    calendarState.currentYear = selectedDateObject.getFullYear();
  }

  bindCalendarControls(calendarRoot);
  populateCalendarSelectors();

  const monthSelect = document.querySelector("[data-calendar-month]");
  const yearSelect = document.querySelector("[data-calendar-year]");
  if (monthSelect) {
    monthSelect.value = String(calendarState.currentMonth);
  }
  if (yearSelect) {
    yearSelect.value = String(calendarState.currentYear);
  }

  const tasks = loadTasks();
  const grid = document.querySelector("[data-calendar-grid]");
  if (!grid) {
    return;
  }

  const firstDay = new Date(calendarState.currentYear, calendarState.currentMonth, 1);
  const lastDay = new Date(calendarState.currentYear, calendarState.currentMonth + 1, 0);
  const startOffset = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const cells = [];

  for (let index = 0; index < startOffset; index += 1) {
    cells.push('<div class="calendar-cell is-empty"></div>');
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateValue = formatDateValue(new Date(calendarState.currentYear, calendarState.currentMonth, day));
    const dayTasks = tasks.filter((task) => task.dueDate === dateValue);
    const dotMarkup = renderTaskDots(dayTasks);
    const isSelected = calendarState.selectedDate === dateValue;
    const isToday = today === dateValue;

    cells.push(`
      <button
        class="calendar-cell calendar-day${isSelected ? " is-selected" : ""}${isToday ? " is-today" : ""}"
        type="button"
        data-calendar-day="${dateValue}"
      >
        <span class="calendar-day-number">${day}</span>
        <span class="calendar-dots">${dotMarkup}</span>
      </button>
    `);
  }

  grid.innerHTML = cells.join("");

  grid.querySelectorAll("[data-calendar-day]").forEach((button) => {
    button.addEventListener("click", () => {
      calendarState.selectedDate = button.dataset.calendarDay;
      renderCalendar();
    });
  });

  const selectedDateLabel = document.querySelector("[data-selected-date-label]");
  if (selectedDateLabel) {
    selectedDateLabel.textContent = formatReadableDate(calendarState.selectedDate);
  }

  renderSelectedDateTasks(calendarState.selectedDate);
}

function renderSelectedDateTasks(date) {
  const taskContainer = document.querySelector("[data-selected-date-tasks]");
  if (!taskContainer) {
    return;
  }

  const tasks = sortTasksByPriorityAndDate(
    loadTasks().filter((task) => task.dueDate === date)
  );

  if (!tasks.length) {
    taskContainer.innerHTML = '<div class="calendar-empty">No tasks for this date.</div>';
    return;
  }

  taskContainer.innerHTML = tasks
    .map((task) => {
      const priority = getPriorityConfig(task.priority);
      const statusText = task.completed ? "Completed" : getDueDateLabel(task.dueDate);
      return `
        <article class="calendar-task-item">
          <span class="calendar-task-color" style="background:${priority.color};"></span>
          <div class="calendar-task-copy">
            <strong>${escapeHtml(task.title)}</strong>
            <span>${escapeHtml(statusText)}</span>
          </div>
          <span class="calendar-task-badge" style="background:${priority.badgeBackground}; color:${priority.color};">${escapeHtml(task.priority)}</span>
        </article>
      `;
    })
    .join("");
}

function generateNotifications() {
  const enabled = localStorage.getItem(NOTIFICATION_ENABLED_KEY);
  if (enabled === "false") {
    return [];
  }

  const notifications = [];
  const snoozed = loadSnoozedNotifications();
  const now = Date.now();
  const activeTasks = loadTasks()
    .map((task, index) => ({ ...task, originalIndex: index }))
    .filter((task) => !task.completed && (!snoozed[task.originalIndex] || snoozed[task.originalIndex] <= now));

  activeTasks.forEach((task) => {
    const dueLabel = getDueDateLabel(task.dueDate);
    const priority = getPriorityConfig(task.priority);

    if (dueLabel === "Overdue") {
      notifications.push({
        title: "Overdue Task",
        message: `${task.title} is overdue.`,
        priority,
        taskIndex: task.originalIndex,
      });
    } else if (dueLabel === "Due Today") {
      notifications.push({
        title: "Due Today",
        message: `${task.title} is due today.`,
        priority,
        taskIndex: task.originalIndex,
      });
    } else if (dueLabel === "Due Tomorrow") {
      notifications.push({
        title: "Due Tomorrow",
        message: `${task.title} is due tomorrow.`,
        priority,
        taskIndex: task.originalIndex,
      });
    }

    if (task.priority === "Emergency") {
      notifications.push({
        title: "Emergency Priority",
        message: `${task.title} is emergency priority. Complete it now.`,
        priority,
        taskIndex: task.originalIndex,
      });
    } else if (task.priority === "Very Urgent") {
      notifications.push({
        title: "Very Urgent",
        message: `${task.title} is very urgent. Complete it soon.`,
        priority,
        taskIndex: task.originalIndex,
      });
    }
  });

  return notifications.slice(0, 10);
}

function updateNotificationBadge() {
  const badge = document.querySelector("[data-notification-badge]");
  if (!badge) {
    return;
  }

  const count = Math.min(generateNotifications().length, 3);
  if (count === 0) {
    badge.classList.add("hidden");
    badge.textContent = "0";
    return;
  }

  badge.classList.remove("hidden");
  badge.textContent = String(count);
}

function renderNotifications() {
  const list = document.querySelector("[data-notification-list]");
  if (!list) {
    return;
  }

  const notifications = generateNotifications();
  if (!notifications.length) {
    renderEmptyState(list, "🔔 No reminders right now.", "You’re all caught up.");
    return;
  }

  list.innerHTML = notifications
    .map((notification) => {
      return `
        <article class="notification-card">
          <span class="notification-dot" style="background:${notification.priority.color};"></span>
          <div>
            <h2>${escapeHtml(notification.title)}</h2>
            <p>${escapeHtml(notification.message)}</p>
            <div class="notification-actions">
              <button type="button" data-snooze-index="${notification.taskIndex}" data-snooze-hours="1">Snooze 1 hour</button>
              <button type="button" data-snooze-index="${notification.taskIndex}" data-snooze-hours="24">Tomorrow</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  list.querySelectorAll("[data-snooze-index]").forEach((button) => {
    button.addEventListener("click", () => {
      snoozeReminder(Number(button.dataset.snoozeIndex), Number(button.dataset.snoozeHours));
    });
  });
}

function snoozeReminder(taskIndex, hours) {
  const snoozed = loadSnoozedNotifications();
  snoozed[taskIndex] = Date.now() + hours * 60 * 60 * 1000;
  localStorage.setItem(SNOOZED_NOTIFICATIONS_KEY, JSON.stringify(snoozed));
  renderNotifications();
  updateNotificationBadge();
  showSuccessToast(hours >= 24 ? "✓ Reminder snoozed until tomorrow." : "✓ Reminder snoozed for 1 hour.");
}

function loadSnoozedNotifications() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SNOOZED_NOTIFICATIONS_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function renderSettings() {
  const languageSelect = document.querySelector("[data-language-select]");
  const notificationToggle = document.querySelector("[data-notification-toggle]");
  const saveLanguageButton = document.querySelector("[data-save-language]");

  if (!languageSelect && !notificationToggle) {
    return;
  }

  if (languageSelect) {
    languageSelect.value = localStorage.getItem(LANGUAGE_KEY) || "English";
  }

  if (notificationToggle) {
    const savedSetting = localStorage.getItem(NOTIFICATION_ENABLED_KEY);
    notificationToggle.checked = savedSetting === "true" && getNotificationPermissionState() === "granted";
    refreshNotificationStatus();
  }

  if (saveLanguageButton && saveLanguageButton.dataset.bound !== "true") {
    saveLanguageButton.addEventListener("click", saveLanguage);
    saveLanguageButton.dataset.bound = "true";
  }

  if (notificationToggle && notificationToggle.dataset.bound !== "true") {
    notificationToggle.addEventListener("change", toggleNotificationSetting);
    notificationToggle.dataset.bound = "true";
  }
}

function saveLanguage() {
  const languageSelect = document.querySelector("[data-language-select]");
  if (!languageSelect) {
    return;
  }

  localStorage.setItem(LANGUAGE_KEY, languageSelect.value);
}

async function toggleNotificationSetting() {
  const notificationToggle = document.querySelector("[data-notification-toggle]");
  if (!notificationToggle) {
    return;
  }

  if (!notificationToggle.checked) {
    localStorage.setItem(NOTIFICATION_ENABLED_KEY, "false");
    refreshNotificationStatus();
    updateNotificationBadge();
    renderNotifications();
    return;
  }

  if (!("Notification" in window)) {
    notificationToggle.checked = false;
    localStorage.setItem(NOTIFICATION_ENABLED_KEY, "false");
    refreshNotificationStatus("This browser does not support desktop notifications.");
    return;
  }

  const permission = Notification.permission === "granted"
    ? "granted"
    : await Notification.requestPermission();

  if (permission !== "granted") {
    notificationToggle.checked = false;
    localStorage.setItem(NOTIFICATION_ENABLED_KEY, "false");
    refreshNotificationStatus("Notifications are blocked. Allow them in your browser settings to receive reminders.");
    return;
  }

  localStorage.setItem(NOTIFICATION_ENABLED_KEY, "true");
  refreshNotificationStatus();
  updateNotificationBadge();
  renderNotifications();
  notifyDueTasksIfAllowed(true);
}

function getNotificationPermissionState() {
  if (!("Notification" in window)) {
    return "unsupported";
  }

  return Notification.permission;
}

function refreshNotificationStatus(customMessage = "") {
  const statusNode = document.querySelector("[data-notification-status]");
  if (!statusNode) {
    return;
  }

  if (customMessage) {
    statusNode.textContent = customMessage;
    return;
  }

  const savedSetting = localStorage.getItem(NOTIFICATION_ENABLED_KEY);
  const permission = getNotificationPermissionState();

  if (permission === "unsupported") {
    statusNode.textContent = "This browser does not support desktop notifications.";
    return;
  }
  if (savedSetting === "true" && permission === "granted") {
    statusNode.textContent = "On: reminders can appear for overdue, today, tomorrow, and urgent tasks.";
    return;
  }
  if (permission === "denied") {
    statusNode.textContent = "Blocked by browser. Enable notification permission to use reminders.";
    return;
  }

  statusNode.textContent = "Off: turn this on to allow deadline reminder pop-ups.";
}

function notifyDueTasksIfAllowed(force = false) {
  if (localStorage.getItem(NOTIFICATION_ENABLED_KEY) !== "true") {
    return;
  }
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  const notifications = generateNotifications().slice(0, 3);
  if (!notifications.length) {
    if (force) {
      sendBrowserNotification("Your Best Reminder App", {
        body: "Notifications are on. I’ll remind you when a deadline is close.",
      });
    }
    return;
  }

  const todayKey = getTodayDateString();
  const signature = `${todayKey}|${notifications.map((item) => item.message).join("|")}`;
  if (!force && localStorage.getItem(NOTIFICATION_LAST_SENT_KEY) === signature) {
    return;
  }

  notifications.forEach((item) => {
    sendBrowserNotification(item.title, {
      body: item.message,
    });
  });
  localStorage.setItem(NOTIFICATION_LAST_SENT_KEY, signature);
}

function sendBrowserNotification(title, options) {
  try {
    new Notification(title, options);
  } catch (error) {
    refreshNotificationStatus("Notifications need Live Server or HTTPS to appear.");
  }
}

function saveProfile() {
  const fullNameInput = document.querySelector("#profile-name");
  const emailInput = document.querySelector("#profile-email");
  const typeInput = document.querySelector("#profile-type");
  const bioInput = document.querySelector("#profile-bio");
  if (!fullNameInput || !emailInput || !typeInput || !bioInput) {
    return;
  }

  const profile = {
    fullName: fullNameInput.value.trim(),
    email: emailInput.value.trim(),
    userType: typeInput.value.trim(),
    bio: bioInput.value.trim(),
  };

  if (!profile.fullName) {
    fullNameInput.focus();
    return;
  }

  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  const profileRoot = document.querySelector("[data-profile-root]");
  if (profileRoot) {
    profileRoot.dataset.profileMode = "view";
  }
  renderProfile();
}

function renderProfile() {
  const profileRoot = document.querySelector("[data-profile-root]");
  if (!profileRoot) {
    return;
  }

  const profile = loadProfile();
  const mode = profileRoot.dataset.profileMode || (profile ? "view" : "edit");
  const formPanel = document.querySelector("[data-profile-form-panel]");
  const cardPanel = document.querySelector("[data-profile-card-panel]");
  const formTitle = document.querySelector("[data-profile-form-title]");
  if (!formPanel || !cardPanel || !formTitle) {
    return;
  }

  if (profile && mode === "view") {
    formPanel.classList.add("hidden");
    cardPanel.classList.remove("hidden");
    cardPanel.innerHTML = createProfileCardMarkup(profile);
    return;
  }

  formPanel.classList.remove("hidden");
  cardPanel.classList.add("hidden");
  cardPanel.innerHTML = "";
  formTitle.textContent = profile ? "Edit Profile" : "Create Profile";
  fillProfileForm(profile);
}

function editProfile() {
  const profileRoot = document.querySelector("[data-profile-root]");
  if (!profileRoot) {
    return;
  }

  profileRoot.dataset.profileMode = "edit";
  renderProfile();
}

function clearProfile() {
  localStorage.removeItem(PROFILE_KEY);
  const profileRoot = document.querySelector("[data-profile-root]");
  if (profileRoot) {
    profileRoot.dataset.profileMode = "edit";
  }
  renderProfile();
}

function setActiveBottomNav() {
  const page = document.body.dataset.page;
  if (!page) {
    return;
  }

  const activeMap = {
    home: "home",
    lists: "lists",
    calendar: "calendar",
    profile: "profile",
    overview: "home",
    completed: "lists",
    notifications: "home",
    settings: "home",
  };

  const activeKey = activeMap[page];
  document.querySelectorAll(".bottom-nav .nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.nav === activeKey);
  });
}

function getProfileName() {
  const profile = loadProfile();
  if (!profile || !profile.fullName) {
    return "Guest";
  }

  return profile.fullName;
}

function updateHomeUserName() {
  const greeting = document.querySelector("[data-home-greeting]");
  if (!greeting) {
    return;
  }

  const profile = loadProfile();
  const registerLink = document.querySelector(".profile-register-link");
  const timeGreeting = document.querySelector("[data-time-greeting]");
  greeting.textContent = `Hello, ${profile && profile.fullName ? profile.fullName : "Guest"}! 👋`;

  if (registerLink) {
    registerLink.classList.toggle("hidden", Boolean(profile && profile.fullName));
  }
  if (timeGreeting) {
    timeGreeting.textContent = getTimeGreeting();
  }
  const avatar = document.querySelector("[data-home-avatar]");
  if (avatar) {
    const name = profile && profile.fullName ? profile.fullName : "Guest";
    avatar.textContent = name === "Guest" ? "🙂" : name.trim().charAt(0).toUpperCase();
  }
}

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning";
  }
  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

function renderHomeProgress() {
  const progressRoot = document.querySelector("[data-home-progress]");
  if (!progressRoot) {
    return;
  }

  const today = getTodayDateString();
  const todayTasks = loadTasks().filter((task) => task.dueDate === today);

  if (!todayTasks.length) {
    progressRoot.innerHTML = `
      <div class="home-progress-head">
        <h2>Today’s Progress</h2>
      </div>
      <p class="home-progress-note">No tasks scheduled for today.</p>
    `;
    return;
  }

  const completedCount = todayTasks.filter((task) => task.completed).length;
  const percent = Math.round((completedCount / todayTasks.length) * 100);

  progressRoot.innerHTML = `
    <div class="home-progress-head">
      <h2>Today’s Progress</h2>
      <span>${percent}%</span>
    </div>
    <div class="home-progress-bar" aria-label="Today's progress">
      <span style="width:${percent}%"></span>
    </div>
    <p class="home-progress-note">${completedCount} of ${todayTasks.length} tasks completed today</p>
  `;
}

function renderHomeStats() {
  const tasks = loadTasks();
  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const stats = getAchievementStats(tasks);

  setText("[data-home-card-active]", `${activeCount} active`);
  setText("[data-home-card-total]", `${tasks.length} total`);
  setText("[data-home-card-completed]", `${completedCount} done`);
  setText("[data-home-streak]", stats.streak);
  setText("[data-home-badges]", stats.badges);
}

function renderHomeCategories() {
  const root = document.querySelector("[data-home-categories]");
  if (!root) {
    return;
  }

  const activeTasks = loadTasks().filter((task) => !task.completed);
  root.innerHTML = TASK_CATEGORIES.map((category) => {
    const count = activeTasks.filter((task) => task.category === category.key).length;
    return `
      <a class="category-card" href="view_list.html" style="--category-color:${category.color};">
        <span>${category.icon}</span>
        <strong>${escapeHtml(category.key)}</strong>
        <b>${count}</b>
      </a>
    `;
  }).join("");
}

function renderMotivationCard(forceNew = false) {
  const root = document.querySelector("[data-motivation-card]");
  if (!root) {
    return;
  }

  const previousQuote = forceNew ? root.dataset.currentQuote || "" : "";
  const quote = getRandomMotivationQuote(previousQuote);
  root.dataset.currentQuote = quote;
  root.innerHTML = `
    <span class="quote-mark">“</span>
    <div>
      <strong>Motivation</strong>
      <p>${escapeHtml(quote)}</p>
    </div>
    <button class="quote-refresh" type="button" data-refresh-quote aria-label="Show another quote">↻</button>
    <span class="quote-mark">”</span>
  `;

}

function getRandomMotivationQuote(previousQuote = "") {
  if (MOTIVATION_QUOTES.length === 1) {
    return MOTIVATION_QUOTES[0];
  }

  let nextQuote = previousQuote;
  while (nextQuote === previousQuote) {
    nextQuote = MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)];
  }
  return nextQuote;
}

function renderRecentCompleted() {
  const recentRoot = document.querySelector("[data-recent-completed]");
  if (!recentRoot) {
    return;
  }

  const recentTask = loadTasks()
    .filter((task) => task.completed && task.completedAt)
    .sort((first, second) => getCompletedTimeValue(second) - getCompletedTimeValue(first))[0];

  if (!recentTask) {
    recentRoot.classList.add("hidden");
    recentRoot.innerHTML = "";
    return;
  }

  recentRoot.classList.remove("hidden");
  recentRoot.innerHTML = `
    <span class="recent-check">✓</span>
    <div>
      <strong>${escapeHtml(recentTask.title)}</strong>
      <p>${escapeHtml(formatCompletedTime(recentTask.completedAt).replace("Completed: ", "") || "Recently completed")}</p>
    </div>
    <span class="completion-status ${getCompletionStatusClass(recentTask.completionStatus)}">${escapeHtml(recentTask.completionStatus || "On Time")}</span>
  `;
}

function renderEmptyState(container, title, subtitle, buttonText, buttonLink) {
  if (!container) {
    return;
  }

  const buttonMarkup = buttonText && buttonLink
    ? `<a class="empty-state-button" href="${escapeHtml(buttonLink)}">${escapeHtml(buttonText)}</a>`
    : "";

  container.innerHTML = `
    <div class="empty-state-card">
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(subtitle)}</p>
      ${buttonMarkup}
    </div>
  `;
}

function showSuccessToast(message) {
  const existingToast = document.querySelector("[data-success-toast]");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "success-toast";
  toast.dataset.successToast = "true";
  toast.textContent = message;
  document.body.appendChild(toast);

  window.requestAnimationFrame(() => {
    toast.classList.add("is-visible");
  });

  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 220);
  }, 1500);
}

function showConfettiCelebration(completedCount) {
  const existing = document.querySelector("[data-confetti-celebration]");
  if (existing) {
    existing.remove();
  }

  const celebration = document.createElement("div");
  celebration.className = "confetti-celebration";
  celebration.dataset.confettiCelebration = "true";
  celebration.innerHTML = `
    <div class="confetti-card">
      <strong>${completedCount === 1 ? "Great job!" : "Amazing work!"}</strong>
      <p>${completedCount === 1 ? "You completed a task. Your effort counts." : `You completed ${completedCount} tasks. That deserves a celebration.`}</p>
    </div>
    ${Array.from({ length: 18 }, (_, index) => `<span style="--i:${index};"></span>`).join("")}
  `;
  document.body.appendChild(celebration);
  window.setTimeout(() => celebration.remove(), 1800);
}

function populateEditForm() {
  const tasks = loadTasks();
  const selectedIndex = getSelectedTaskIndex(tasks);
  if (selectedIndex === -1) {
    window.location.href = "view_list.html";
    return;
  }

  const task = tasks[selectedIndex];
  const titleInput = document.querySelector("#edit-title");
  const descriptionInput = document.querySelector("#edit-description");
  const dueDateInput = document.querySelector("#edit-due-date");
  const categoryInput = document.querySelector("#edit-category");
  const priorityInput = document.querySelector(`input[name="edit-priority"][value="${task.priority}"]`);

  if (titleInput) {
    titleInput.value = task.title;
  }
  if (descriptionInput) {
    descriptionInput.value = task.description;
    descriptionInput.dispatchEvent(new Event("input"));
  }
  if (dueDateInput) {
    dueDateInput.value = task.dueDate;
  }
  if (categoryInput) {
    categoryInput.value = getCategoryConfig(task.category).key;
  }
  if (priorityInput) {
    priorityInput.checked = true;
  }

  initializePriorityOptions();
}

function getTaskFormData(prefix) {
  const titleInput = document.querySelector(`#${prefix}-title`);
  const descriptionInput = document.querySelector(`#${prefix}-description`);
  const dueDateInput = document.querySelector(`#${prefix}-due-date`);
  const categoryInput = document.querySelector(`#${prefix}-category`);
  const priorityInput = document.querySelector(`input[name="${prefix}-priority"]:checked`);
  const hiddenPriorityInput = document.querySelector(`#${prefix}-priority-input`);
  if (!titleInput || !priorityInput) {
    return null;
  }

  const title = titleInput.value.trim();
  if (!title) {
    titleInput.focus();
    return null;
  }

  return {
    title,
    description: descriptionInput ? descriptionInput.value.trim() : "",
    dueDate: dueDateInput ? dueDateInput.value : "",
    priority: hiddenPriorityInput && hiddenPriorityInput.value ? hiddenPriorityInput.value : priorityInput.value,
    category: categoryInput ? getCategoryConfig(categoryInput.value).key : "Study",
  };
}

function getSelectedTaskIndex(tasks) {
  const rawIndex = localStorage.getItem(SELECTED_TASK_KEY);
  const parsedIndex = Number(rawIndex);
  if (!Number.isInteger(parsedIndex) || parsedIndex < 0 || parsedIndex >= tasks.length) {
    return -1;
  }

  return parsedIndex;
}

function calculateProgress(tasks) {
  if (!tasks.length) {
    return 0;
  }

  const completedCount = tasks.filter((task) => task.completed).length;
  return Math.round((completedCount / tasks.length) * 100);
}

function updateProgressDisplay(progressValue) {
  const percentNode = document.querySelector("[data-progress-percent]");
  const progressFill = document.querySelector("[data-progress-fill]");
  if (percentNode) {
    percentNode.textContent = `${progressValue}%`;
  }
  if (progressFill) {
    progressFill.style.width = `${progressValue}%`;
  }
}

function buildOverviewStats(tasks) {
  let completed = 0;
  let inProgress = 0;
  let notDone = 0;
  let failed = 0;

  const today = new Date(`${getTodayValue()}T12:00:00`);

  tasks.forEach((task) => {
    if (task.completed) {
      completed += 1;
      return;
    }

    if (!task.dueDate) {
      notDone += 1;
      return;
    }

    const dueDate = new Date(`${task.dueDate}T12:00:00`);
    if (dueDate < today) {
      failed += 1;
      return;
    }

    inProgress += 1;
  });

  return { completed, inProgress, notDone, failed };
}

function renderWeeklySummary(tasks) {
  const summary = document.querySelector("[data-weekly-summary]");
  if (!summary) {
    return;
  }

  const weeklyCompleted = getWeeklyCompletedCount(tasks);
  summary.innerHTML = `
    <span class="weekly-icon">🌷</span>
    <div>
      <strong>This week you completed ${weeklyCompleted} ${weeklyCompleted === 1 ? "task" : "tasks"}.</strong>
      <p>${weeklyCompleted > 0 ? "That is real effort. Take a tiny moment to feel proud." : "No completed tasks yet this week. A gentle start still counts."}</p>
    </div>
  `;
}

function getWeeklyCompletedCount(tasks) {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(now.getDate() - now.getDay());

  return tasks.filter((task) => {
    if (!task.completed || !task.completedAt) {
      return false;
    }
    return new Date(task.completedAt) >= startOfWeek;
  }).length;
}

function createDefaultTasks() {
  return [
    createTaskTemplate("Submit Project Report", "Emergency", 0, "Work"),
    createTaskTemplate("Prepare for Presentation", "Very Urgent", 1, "Study"),
    createTaskTemplate("Homework", "Very Urgent", 1, "Study"),
    createTaskTemplate("Study JavaScript", "Moderate", 2, "Study"),
    createTaskTemplate("Grocery Shopping", "Low", 5, "Shopping"),
    createTaskTemplate("Workout", "Low", null, "Personal"),
  ];
}

function createTaskTemplate(title, priority, dayOffset, category) {
  return {
    title,
    description: "",
    dueDate: dayOffset === null ? "" : createOffsetDate(dayOffset),
    priority,
    category,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

function createOffsetDate(offset) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return formatDateValue(date);
}

function bindCalendarControls(calendarRoot) {
  if (calendarRoot.dataset.bound === "true") {
    return;
  }

  const prevButton = calendarRoot.querySelector("[data-calendar-prev]");
  const nextButton = calendarRoot.querySelector("[data-calendar-next]");
  const monthSelect = calendarRoot.querySelector("[data-calendar-month]");
  const yearSelect = calendarRoot.querySelector("[data-calendar-year]");

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      shiftCalendarMonth(-1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      shiftCalendarMonth(1);
    });
  }

  if (monthSelect) {
    monthSelect.addEventListener("change", () => {
      calendarState.currentMonth = Number(monthSelect.value);
      renderCalendar();
    });
  }

  if (yearSelect) {
    yearSelect.addEventListener("change", () => {
      calendarState.currentYear = Number(yearSelect.value);
      renderCalendar();
    });
  }

  calendarRoot.dataset.bound = "true";
}

function shiftCalendarMonth(offset) {
  const nextDate = new Date(calendarState.currentYear, calendarState.currentMonth + offset, 1);
  calendarState.currentYear = nextDate.getFullYear();
  calendarState.currentMonth = nextDate.getMonth();
  renderCalendar();
}

function populateCalendarSelectors() {
  const monthSelect = document.querySelector("[data-calendar-month]");
  const yearSelect = document.querySelector("[data-calendar-year]");
  if (!monthSelect || !yearSelect) {
    return;
  }

  if (!monthSelect.options.length) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    monthSelect.innerHTML = monthNames
      .map((month, index) => `<option value="${index}">${month}</option>`)
      .join("");
  }

  if (!yearSelect.options.length) {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 5; year <= currentYear + 5; year += 1) {
      years.push(`<option value="${year}">${year}</option>`);
    }
    yearSelect.innerHTML = years.join("");
  }
}

function renderTaskDots(tasks) {
  if (!tasks.length) {
    return "";
  }

  const visibleDots = tasks
    .slice(0, 3)
    .map((task) => {
      const priority = getPriorityConfig(task.priority);
      return `<i class="task-dot" style="background:${priority.color};"></i>`;
    })
    .join("");

  if (tasks.length > 3) {
    return `${visibleDots}<span class="task-dot-count">+${tasks.length - 3}</span>`;
  }

  return visibleDots;
}

function loadProfile() {
  const rawProfile = localStorage.getItem(PROFILE_KEY);
  if (!rawProfile) {
    return null;
  }

  try {
    return JSON.parse(rawProfile);
  } catch (error) {
    return null;
  }
}

function fillProfileForm(profile) {
  const fullNameInput = document.querySelector("#profile-name");
  const emailInput = document.querySelector("#profile-email");
  const typeInput = document.querySelector("#profile-type");
  const bioInput = document.querySelector("#profile-bio");
  if (!fullNameInput || !emailInput || !typeInput || !bioInput) {
    return;
  }

  fullNameInput.value = profile ? profile.fullName || "" : "";
  emailInput.value = profile ? profile.email || "" : "";
  typeInput.value = profile ? profile.userType || "" : "";
  bioInput.value = profile ? profile.bio || "" : "";
}

function createProfileCardMarkup(profile) {
  const initial = profile.fullName ? profile.fullName.trim().charAt(0).toUpperCase() : "U";
  const tasks = loadTasks();
  const stats = getAchievementStats(tasks);
  const weeklyCompleted = getWeeklyCompletedCount(tasks);
  const profileQuote = getRandomMotivationQuote();
  return `
    <article class="profile-card">
      <div class="profile-avatar">${escapeHtml(initial)}</div>
      <h2>${escapeHtml(profile.fullName || "User")}</h2>
      <p class="profile-email">${escapeHtml(profile.email || "")}</p>
      <div class="profile-meta">
        <span class="profile-pill">${escapeHtml(profile.userType || "User")}</span>
      </div>
      <p class="profile-bio">${escapeHtml(profile.bio || "No bio added yet.")}</p>
      <div class="profile-actions">
        <button class="secondary-button" type="button" data-profile-edit>Edit Profile</button>
        <button class="ghost-button" type="button" data-profile-clear>Clear Profile</button>
      </div>
    </article>
    <section class="profile-achievement-card">
      <div class="profile-celebration">
        <span>🌷</span>
        <div>
          <h2>Weekly Summary</h2>
          <strong>This week you completed ${weeklyCompleted} ${weeklyCompleted === 1 ? "task" : "tasks"}.</strong>
          <p>Your hard work matters. Every small task you finish is one less thing your mind has to carry.</p>
          <blockquote>${escapeHtml(profileQuote)}</blockquote>
        </div>
      </div>
    </section>
  `;
}

function createBadgeMarkup(icon, label, unlocked) {
  return `
    <div class="badge-card${unlocked ? " is-unlocked" : ""}">
      <span>${icon}</span>
      <strong>${escapeHtml(label)}</strong>
    </div>
  `;
}

function getAchievementStats(tasks) {
  const completedTasks = tasks.filter((task) => task.completed);
  const datedTasks = tasks.filter((task) => task.dueDate);
  const uniqueCompletedDays = [...new Set(completedTasks
    .map((task) => (task.completedAt || task.createdAt || "").slice(0, 10))
    .filter(Boolean))]
    .sort((first, second) => second.localeCompare(first));
  const streak = calculateSimpleStreak(uniqueCompletedDays);
  const stats = {
    completed: completedTasks.length,
    streak,
    priorityReady: tasks.some((task) => !task.completed && (task.priority === "Emergency" || task.priority === "Very Urgent")),
    planner: datedTasks.length >= 3,
  };
  stats.badges = [
    stats.completed > 0,
    stats.priorityReady,
    stats.completed >= 5,
    stats.streak >= 7,
    stats.planner,
  ].filter(Boolean).length;
  return stats;
}

function calculateSimpleStreak(days) {
  if (!days.length) {
    return 0;
  }

  let streak = 0;
  const cursor = new Date(`${getTodayDateString()}T12:00:00`);
  for (let index = 0; index < 30; index += 1) {
    const value = formatDateValue(cursor);
    if (!days.includes(value)) {
      if (index === 0) {
        cursor.setDate(cursor.getDate() - 1);
        continue;
      }
      break;
    }
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function normalizeTask(task) {
  return {
    title: task.title || "Untitled Task",
    description: task.description || "",
    dueDate: task.dueDate || "",
    priority: getPriorityConfig(task.priority).key,
    category: getCategoryConfig(task.category).key,
    completed: Boolean(task.completed),
    completedAt: task.completedAt || "",
    completionStatus: task.completionStatus || "",
    createdAt: task.createdAt || new Date().toISOString(),
  };
}

function getPriorityConfig(priority) {
  return (
    PRIORITY_LEVELS.find((level) => level.key === priority) ||
    PRIORITY_LEVELS[PRIORITY_LEVELS.length - 1]
  );
}

function getCategoryConfig(category) {
  return TASK_CATEGORIES.find((item) => item.key === category) || TASK_CATEGORIES[0];
}

function getDueDateLabel(dateValue) {
  if (!dateValue) {
    return "No Deadline";
  }

  const dueDate = new Date(`${dateValue}T12:00:00`);
  const today = new Date(`${getTodayValue()}T12:00:00`);
  const differenceInDays = Math.round((dueDate.getTime() - today.getTime()) / 86400000);

  if (differenceInDays < 0) {
    return "Overdue";
  }
  if (differenceInDays === 0) {
    return "Due Today";
  }
  if (differenceInDays === 1) {
    return "Due Tomorrow";
  }

  return `Due in ${differenceInDays} days`;
}

function getDueStatusText(dueLabel) {
  if (dueLabel === "Due Today") {
    return "Today";
  }
  if (dueLabel === "Due Tomorrow") {
    return "Tomorrow";
  }
  if (dueLabel === "Overdue") {
    return "Overdue";
  }
  if (dueLabel === "No Deadline") {
    return "No Deadline";
  }

  return "Upcoming";
}

function getDueStatusClass(dueLabel) {
  if (dueLabel === "Overdue") {
    return "due-overdue";
  }
  if (dueLabel === "Due Today") {
    return "due-today";
  }
  if (dueLabel === "Due Tomorrow") {
    return "due-tomorrow";
  }
  if (dueLabel === "No Deadline") {
    return "due-none";
  }

  return "due-upcoming";
}

function getSortableDateValue(dateValue) {
  if (!dateValue) {
    return Number.MAX_SAFE_INTEGER;
  }

  return new Date(`${dateValue}T12:00:00`).getTime();
}

function getTodayValue() {
  return formatDateValue(new Date());
}

function getTodayDateString() {
  return getTodayValue();
}

function formatDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatReadableDate(dateValue) {
  if (!dateValue) {
    return "No date selected";
  }

  return new Date(`${dateValue}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getCompletedTimeValue(task) {
  if (!task.completedAt) {
    return 0;
  }

  return new Date(task.completedAt).getTime();
}

function formatCompletedTime(completedAt) {
  if (!completedAt) {
    return "";
  }

  const formatted = new Date(completedAt).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).replace("am", "AM").replace("pm", "PM");

  return `Completed: ${formatted}`;
}

function getCompletionStatusClass(status) {
  if (status === "Early") {
    return "status-early";
  }
  if (status === "Late") {
    return "status-late";
  }

  return "status-ontime";
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = String(value);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
