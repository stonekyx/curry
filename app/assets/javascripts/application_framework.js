// This is a manifest file that'll be compiled into application_framework.js, which will include all the files
// listed below.
// It should include the 1st-party framework/library javascript files which are not supposed to change frequently

//= require curry_app
//= require_tree ./defines
//= require utils/utils
//= require_tree ./utils
//= require_tree ./lib
//= require models/base
//= require_tree ./models

if (window.jsloaded) {
  window.jsloaded.applicationFrameWork = true;
  window.jsloaded.applicationFrameWorkLoadedTime = new Date();
}
