document.addEventListener("DOMContentLoaded",()=>{
    'use strict'

    const btn = document.querySelector('.submit');
    const final = document.querySelector('.final');
    const arrow = document.querySelector('.quiz__form-submit');
    const forms = document.querySelectorAll('form');

    const selector = document.getElementById("tel");
    const im = new Inputmask("7(999)999-99-99");
    im.mask(selector);


    function link() {
        const nav = document.querySelectorAll('.main_content-btn a[href^="#"');

        nav.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                let href = this.getAttribute('href').substring(1);

                const scrollTarget = document.getElementById(href);

                // const topOffset = document.querySelector('.scrollto').offsetHeight;
                const topOffset = 0; // если не нужен отступ сверху 
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;
                
                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    link();


    btn.addEventListener('click', actionBar);

    function actionBar() {
        btn.style.background = "red";
        final.style.display = "block";
        arrow.classList.add('activeAfter');

        const circleBar = document.getElementById('circleBar');

        circleBar.style.cssText = `
            margin: 0 auto;
            width: 100px;
            height: 100px;
            position: relative;
        `;

        const bar = new ProgressBar.Circle(circleBar, {
            color: '#FFC804',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 10,
            trailWidth: 10,
            easing: 'easeInOut',
            duration: 5400,
            text: {
                autoStyleContainer: false
            },
            from: { color: '#FFC804', width: 10 },
            to: { color: '#FFC804', width: 10 },
            // Set default step function for all animate calls
            step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);
    
                let value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('0');
                } else if(value > 0){
                    circle.setText(value);
                    if(value === 100){
                        const progressbar = document.querySelector('.progressbar-text');
                        btn.style.background = "";
                        setTimeout(function(){
                            circle.setText('');
                            progressbar.innerHTML = '<img src="./assets/images/Vector.svg" alt="">';
                            document.querySelector('#circleBar').append(progressbar);
                        }, 1000);
                    }
                }
            }
            });
            bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
            bar.text.style.fontSize = '2rem';
    
            bar.animate(1.0);

            btn.removeEventListener('click', actionBar);
    }

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) =>{
            e.preventDefault();

            const formData = new FormData(form);

            fetch('./assets/send.php', {
                method: "POST",
                body: formData
            }).then(() => {
                    alert("Данные успешно отправлены");
                    // console.log("Данные успешно отправлены");
                    final.style.display = "";
                    arrow.classList.remove('activeAfter');


            }).catch(()=> {
                alert("Ошибка, данные не отправлены!!!");   
                console.log("Ошибка, данные не отправлены!!!");
            }).finally(()=>{
                form.reset();
            });

        });
    }


});