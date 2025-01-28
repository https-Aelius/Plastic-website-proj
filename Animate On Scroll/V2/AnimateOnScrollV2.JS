/* const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            const animationType = entry.target.dataset.animation; // Get the animation type from the data attribute
            entry.target.classList.add("show");

        }
        // if want to to show the animation even after seeing it once, use this else statement 
        //else{
            //entry.target.classList.remove("show");
        //}
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el)); */

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const animationType = entry.target.dataset.animation; // Get the animation type from the data attribute
            entry.target.classList.add("show", animationType); // Add "show" and specific animation class
        } else {
            entry.target.classList.remove("show"); // Optional: Remove "show" when out of view
        }
    });
});

// Observe all elements with the "hidden" class
document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

