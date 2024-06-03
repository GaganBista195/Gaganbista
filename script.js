let loco = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("main"),
        smooth: true,
        getDirection: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });


    let about = document.querySelector(".about-but")
    about.addEventListener("click", () => {
        locoScroll.scrollTo("#section-2")
    })
    let exp = document.querySelector(".exp-but")

    exp.addEventListener("click", () => {
        locoScroll.scrollTo(".section-3")
    })
    let cont = document.querySelector(".cont-but")

    cont.addEventListener("click", () => {
        locoScroll.scrollTo("#section-4")
    })

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

loco()
document.querySelectorAll(".side ul li").forEach((li) => {
    li.addEventListener("click", () => {
        gsap.to(".side", {
            left: `100%`
        })
    })
})

let bar = document.querySelector(".fa-bars")
let close = document.querySelector(".fa-xmark")

bar.addEventListener("click", () => {
    gsap.to(".side", {
        left: 0
    })
})
close.addEventListener("click", () => {
    gsap.to(".side", {
        left: `100%`
    })
})


