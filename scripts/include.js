async function loadComponent(id, path) {
    const response = await fetch(path);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
}

loadComponent("header", "components/header.html");
loadComponent("servicesPanel", "components/servicesPanel.html");
loadComponent("promo", "components/promo.html");
loadComponent("data-growth", "components/data-growth.html");
loadComponent("advantages", "components/advantages.html");
loadComponent("service", "components/service.html");



