document.addEventListener('DOMContentLoaded', () => {
    // giới hạn chỉ chọn menu mobile
    const mobileMenuContainer = document.querySelector(".header__container-mb");
    console.log(mobileMenuContainer);
    if(mobileMenuContainer) {
        const menuItems = mobileMenuContainer.querySelectorAll('.header__menu-item');

        menuItems.forEach((item) => {
            const submenu = item.querySelector('.header__menu-sub');
            const link = item.querySelector('.header__menu-link');

            if (submenu) {  
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    submenu.classList.toggle('active');

                    link.classList.toggle("open");
                })
            }
        });
    }
});