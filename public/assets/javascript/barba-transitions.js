console.log("barba-transitions.js has loaded.");

// Set up for the barba.js transitions
//-------------------------------------------------------------------------------------------
var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */
     // console.log("start");
    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
  	// console.log("fade out");
  	// console.log($(this.oldContainer));
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer).css("position", "relative").animate({ opacity: 0, left: "-100%" }).promise();
  },

  fadeIn: function() {
  	// console.log("fade in");
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.css({"position":"relative", "left":"50%"}).animate({ opacity: 1, left: "0%" }, 300, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
    });
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
	// console.log("get transition");
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return FadeTransition;
};
//===========================================================================================
// End of the Set Up for the barba.js transitions


// Set up for the barba.js Name Spaces
//-------------------------------------------------------------------------------------------

// Landing namespace
//---------------------------
var Landing = Barba.BaseView.extend({
  namespace: 'Landing',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      console.log("Landing loading worked");
  }
});

// Don't forget to init the view!
Landing.init();
//===========================


// Sign Up name space
//---------------------------
var SignUp = Barba.BaseView.extend({
  namespace: 'SignUp',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      console.log("SignUp loading worked");
  }
});

// Don't forget to init the view!
SignUp.init();
//===========================


// Sign In name space
//---------------------------
var SignIn = Barba.BaseView.extend({
  namespace: 'SignIn',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      console.log("SignIn loading worked");
  }
});

// Don't forget to init the view!
SignIn.init();
//===========================


// Make a listing Name space
//---------------------------
var MakeListing = Barba.BaseView.extend({
  namespace: 'MakeListing',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      $.get("https://code.jquery.com/ui/1.12.1/jquery-ui.js");
      $.get("assets/javascript/make-a-listing-page.js");
      $.get("assets/javascript/form-test.js");
      
      console.log("MakeListing loading worked");
  }
});

// Don't forget to init the view!
MakeListing.init();
//===========================


// Leaderboard Name space
//---------------------------
var Leaderboard = Barba.BaseView.extend({
  namespace: 'Leaderboard',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      $.get("assets/javascript/make-a-listing-page.js");
      console.log("Leaderboard loading worked");
  }
});

// Don't forget to init the view!
Leaderboard.init();
//===========================


// User homepage name space
//---------------------------
var UserHomepage = Barba.BaseView.extend({
  namespace: 'UserHomepage',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      $.get("assets/javascript/make-a-listing-page.js");
      console.log("UserHomepage loading worked");
  }
});

// Don't forget to init the view!
UserHomepage.init();
//===========================


// All listing name space
//---------------------------
var AllListings = Barba.BaseView.extend({
  namespace: 'AllListings',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      $.get("assets/javascript/make-a-listing-page.js");
      console.log("AllListings loading worked");
  }
});

// Don't forget to init the view!
AllListings.init();
//===========================


// Extra for easy additions later
// var Homepage = Barba.BaseView.extend({
//   namespace: 'homepage',
//   onEnter: function() {
//       // The new Container is ready and attached to the DOM.
//       $.get("assets/javascript/make-a-listing-page.js");
//       console.log("Homepage loading worked");
//   }
// });

// // Don't forget to init the view!
// Homepage.init();



//===========================================================================================
// End of barba.js Name Space Set up





Barba.Pjax.start();
