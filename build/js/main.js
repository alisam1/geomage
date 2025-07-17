/* Sticky header */

window.addEventListener('scroll', () => stickyHeader());

const header = document.getElementById('header');

if (!header) {
  console.warn('Header element not found');
}

const stickyThreshold = header?.offsetTop > 150 ? header.offsetTop : 150;

const stickyHeader = () => {
  if (window.pageYOffset >= stickyThreshold) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
};

/* Form */ 

document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', e => {
    const target = e.currentTarget.dataset.tab;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(c => {
      c.classList.toggle('active', c.id === target);
    });
  });
});



/* Tabs */

const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", () => {
    tabs.forEach(tab => tab.classList.remove("tab--active"));
    tabs[i].classList.add("tab--active");

    contents.forEach(content => content.classList.remove("content--active"));
    contents[i].classList.add("content--active");
  });
}

/* Modal */

    var modalButtons = document.querySelectorAll('.js-open-modal'),
        overlay      = document.querySelector('.js-overlay-modal'),
        closeButtons = document.querySelectorAll('.js-modal-close');
 
    modalButtons.forEach(function(item){

       item.addEventListener('click', function(e) {

          e.preventDefault();
 
          var modalId = this.getAttribute('data-modal'),
              modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
 
          modalElem.classList.add('active');
          overlay.classList.add('active');
       });
 
    });
 
 
    closeButtons.forEach(function(item){
 
       item.addEventListener('click', function(e) {
          var parentModal = this.closest('.modal');
 
          parentModal.classList.remove('active');
          overlay.classList.remove('active');
       });
 
    });
 
 
     document.body.addEventListener('keyup', function (e) {
         var key = e.keyCode;
 
         if (key == 27) {
 
             document.querySelector('.modal.active').classList.remove('active');
             document.querySelector('.overlay').classList.remove('active');
         };
     }, false);
 
 
     overlay.addEventListener('click', function() {
         document.querySelector('.modal.active').classList.remove('active');
         this.classList.remove('active');
     });


/* Слайдер-ползунок */

document.querySelectorAll('.slider-container').forEach(slider => {
    const handle = slider.querySelector('.slider-handle');
    const afterWrapper = slider.querySelector('.after-wrapper');
    let isDragging = false;

    const moveHandle = (e) => {
      const rect = slider.getBoundingClientRect();
      let offsetX = e.clientX - rect.left;
      offsetX = Math.max(0, Math.min(offsetX, rect.width));
      const percent = (offsetX / rect.width) * 100;

      handle.style.left = `${percent}%`;
      afterWrapper.style.width = `${percent}%`;
    };

    const stopDragging = () => {
      isDragging = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDragging);
    };

    const onMouseMove = (e) => {
      if (isDragging) moveHandle(e);
    };

    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      moveHandle(e);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', stopDragging);
    });
  });


