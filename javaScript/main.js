$(document).ready(function() {
    let isMenuVisible = false;

    $("#menuHeader").click(function() {
        console.log('Menu header clicked');
        if (isMenuVisible) {
            console.log('Hiding menu');
            $("#menu").animate({ left: '-400px' }, "slow", function() {
                $(this).hide();
            });
        } else {
            console.log('Showing menu');
            $("#menu").show().animate({ left: '0' }, "slow");
        }
        isMenuVisible = !isMenuVisible;
    });
});
