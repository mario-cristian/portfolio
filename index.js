var selectedTab, projectsTab, educationTab, hackathonsTab, CVTab;

function initToasts() {
  phoneToast = new bootstrap.Toast($("#phoneToast")[0]);
  emailToast = new bootstrap.Toast($("#emailToast")[0]);

  let emailToastElement = $("#emailToast");
  let phoneToastElement = $("#phoneToast");

  emailToastElement.on("hidden.bs.toast", function () {
    if (phoneToastElement.hasClass("show")) {
      phoneToastElement.css({
        left: phoneToastElement.css("left"),
        top: $(window).height() - phoneToastElement.height() - 50,
      });
    }
  });

  emailToastElement.on("shown.bs.toast", function () {
    if (phoneToastElement.hasClass("show")) {
      phoneToastElement.css({
        left: phoneToastElement.css("left"),
        top: $(window).height() - phoneToastElement.height() - 50,
      });
    }
  });

  phoneToastElement.on("hidden.bs.toast", function () {
    if (emailToastElement.hasClass("show")) {
      emailToastElement.css({
        left: emailToastElement.css("left"),
        top: $(window).height() - emailToastElement.height() - 50,
      });
    }
  });

  phoneToastElement.on("shown.bs.toast", function () {
    if (emailToastElement.hasClass("show")) {
      emailToastElement.css({
        left: emailToastElement.css("left"),
        top: $(window).height() - emailToastElement.height() - 50,
      });
    }
  });
}

function showPhoneNumber() {
  let documentWidth = $(document).width(),
    documentHeight = $(window).height();
  let toastElement = $("#phoneToast");

  phoneToast.show();

  toastElement.css("position", "absolute");

  let topPosition = documentHeight - toastElement.height() - 50;
  let emailToastElement = $("#emailToast");

  if (emailToastElement.hasClass("show"))
    topPosition = topPosition - emailToastElement.height() - 24;

  toastElement.css({
    left: (documentWidth - toastElement.width()) / 2,
    top: topPosition,
  });
}

function showEmail() {
  let documentWidth = $(document).width(),
    documentHeight = $(window).height();
  let toastElement = $("#emailToast");

  emailToast.show();

  toastElement.css("position", "absolute");

  let topPosition = documentHeight - toastElement.height() - 50;
  let phoneToastElement = $("#phoneToast");

  if (phoneToastElement.hasClass("show"))
    topPosition = topPosition - phoneToastElement.height() - 24;

  toastElement.css({
    left: (documentWidth - toastElement.width()) / 2,
    top: topPosition,
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

function initMainPage() {
  projectsTab = $("#projectsTab");
  educationTab = $("#educationTab");
  hackathonsTab = $("#hackathonsTab");
  CVTab = $("#CVTab");

  selectedTab = projectsTab;
}

function changePage(event) {
  let target = $(event.target);
  if (!target.hasClass("c-pointer")) return;

  selectedTab.removeClass("fw-bold");
  selectedTab.addClass("c-pointer");
  target.removeClass("c-pointer");
  target.addClass("fw-bold");

  $("#" + selectedTab.text().trim().toLowerCase() + "Page").attr("hidden", true);
  $("#" + target.text().trim().toLowerCase() + "Page").attr("hidden", false);

  selectedTab = target;
}

$(document).ready(function () {
  initMainPage();
  displayProjects();
  initToasts();
});
