function Slide(index, title, background, link ) {
   this.title = title;
   this.background = background;
   this.link = link;
   this.id = "slide-" + index;
}

const Slider = {
   current: 0,
   slides: [],
   initSlider: function(slides){
       let index = 0;
       for (let slide of slides){
           this.slides.push(new Slide(index, slide.title, slide.background, slide.link));
           index++;
       }
       this.buildSlider();
   },
   setSlide: function(id){
    let next;
    next = Number(id.split("-")[1])
        document.getElementById("slide-" + next).style.left = "-100%";
        document.getElementById("slide-" + this.current).style.left = 0;

        document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInLeft");
        document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutRight");
        this.current = next;
   },
   buildSlider: function() {
       let sliderHTML = "";
       let last_btn = null;
       for(let slide of this.slides) {
//зверніть увагу на можливість використання ``,яка дозволяє додавати в string змінні ${}
           sliderHTML +=
               `<div id='${slide.id}' class='singleSlide'
           style='background-image:url(${slide.background});'>
           <div class='slideOverlay'>
           <h2>${slide.title}</h2>
           <a class='link' href='${slide.link}' target='_blank'>Open</a></div></div>`;
           let btn = document.createElement('button');
            btn.className = 'btn';
            btn.id = 'button-'+slide.id;
            btn.innerHTML = slide.id;
            btn.addEventListener("click", function(){ Slider.setSlide(slide.id);});
            document.getElementById("Btns").insertBefore(btn, last_btn);
            last_btn = btn;
       }

       document.getElementById("slider").innerHTML = sliderHTML;
       document.getElementById("slide-" + this.current).style.left = 0;
   },
   prevSlide: function() {
       let next;
       if (this.current === 0 ) {
           next = this.slides.length - 1;
       } else {
           next = this.current - 1;
       }

       document.getElementById("slide-" + next).style.left = "-100%";
       document.getElementById("slide-" + this.current).style.left = 0;

       document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInLeft");
       document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutRight");

       this.current = next;
   },
   nextSlide: function(){
       let next;
       if (this.current === (this.slides.length - 1) ) {
           next = 0;
       } else {
           next = this.current + 1;
       }

       document.getElementById("slide-" + next).style.left = "100%";
       document.getElementById("slide-" + this.current).style.left = 0;

       document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInRight");
       document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutLeft");

       this.current = next;
   }
}