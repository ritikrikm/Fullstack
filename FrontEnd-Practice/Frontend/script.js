function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const menuIcon = document.querySelector(".menuIcon");
  sidebar.style.display === "flex"
    ? (sidebar.style.display = "none") &&
      (menuIcon.style.visibility = "visible")
    : (sidebar.style.display = "flex") &&
      (menuIcon.style.visibility = "hidden");
}
