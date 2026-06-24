// Comportamiento compartido de la UI (Bulma no trae JS).
document.addEventListener("DOMContentLoaded", () => {
    // Toggle del menú hamburguesa en mobile
    document.querySelectorAll(".navbar-burger").forEach((burger) => {
        burger.addEventListener("click", () => {
            const target = document.getElementById(burger.dataset.target);
            burger.classList.toggle("is-active");
            if (target) target.classList.toggle("is-active");
        });
    });
});
