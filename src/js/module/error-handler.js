exports.log = function (message) {
  if (window.console && window.console.error){
    window.console.error(message);
  }
};